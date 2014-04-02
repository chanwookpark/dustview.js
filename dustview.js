var dust = require("dustjs-linkedin");
var fs = require('fs');

// Cache for loaded template source 
var _tmeplateCache = {};

function dRender(_templateKey, _source, _model, _res) {
	// 우선 한 번 로딩된 템플릿은 다시 로딩하지 않도록 함
	// TODO 향후 동적 로딩이 가능하도록 기능 개선~
	if(isLoaded(_templateKey)){
		console.log(_templateKey + " 템플릿은 이미 로딩되어 다시 로딩하지 않고 바로 렌더링을 수행합니다.");
	} else {
		var compiledSource = compile(_templateKey, _source);
		loadSource(_templateKey, compiledSource);
		checkLoadedTemplate(_templateKey);
	}

	render(_templateKey, _source, _model, 
		function(_err, _out){
			if(_out) {
				_res.write(_out); 
				console.log("3. Rendering success: " + _out);
			}
			if(_err) {
				console.log("3. Rendering error: " + _err); 
			}
		}
	);
}

// 참조: https://github.com/visionmedia/consolidate.js/blob/master/lib/consolidate.js 
function eRender(_path, _options, _callback) {
	// _path는 경로명이 붙지 않는 파일명만 올 것으로.. 앞에 './'을 붙이고 시작하자. 뒤에는 경로가 붙는 걸로 가정 
	// TemplateKey는 _path를 바로 사용한다. 
	console.log(">> dustview + express param\n1._path: " + _path + "\n2._options: " + _options + 
		"\n3._callback: " + _callback);

	var templateKey = "test";
	render(templateKey, _path, "{}", _callback);
}

function compile(_templateKey, _source) {
	var template = new String(_source);
	//TODO 상대경로는 어떻게 찾아낼 것인가? 
	if(_source.indexOf('.') === 0 || _source.indexOf('/') === 0) {
		template = fs.readFileSync(_source).toString();		
	}
	var compiledSource = dust.compile(template, _templateKey);

	console.log("Compile to template.\n" + ">> source: " + _source +"\n>> compield source(.js): " + template);
	return compiledSource;
}

function loadSource(_templateKey, _compiledSource) {
	console.log("Load compield html source\n>>template key: " + _templateKey + "\n>>loaded source: " + _compiledSource);
	dust.loadSource(_compiledSource);
}

function render(_templateKey, _model, _callback) {
	var json = "";
	if(_model instanceof String) {
		json = JSON.parse(_model);
		console.log("JSON model parse from " + _model + " to " + json);
	} else {
		json = _model;
	}
	
	console.log("Rendering view to " + _templateKey + " template!");

	dust.render(_templateKey, json, _callback);
}

function isLoaded(_templateKey) {
	var cached = _tmeplateCache[_templateKey];
	if(typeof cached !== 'undefined' && cached) {
		return true;
	}
	return false;
}

function checkLoadedTemplate(_templateKey) {
	_tmeplateCache[_templateKey] = true;
}

exports.render = render;
exports.compile = compile;
exports.loadSource = loadSource;
exports.dRender = dRender;
exports.eRender = eRender;