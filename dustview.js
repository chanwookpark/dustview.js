var dust = require("dustjs-linkedin");
var fs = require('fs');

function render(_templateKey, _source, _model, _res) {
	// 우선 한 번 로딩된 템플릿은 다시 로딩하지 않도록 함
	// TODO 향후 동적 로딩이 가능하도록 기능 개선~
	if(isLoaded(_templateKey)){
		console.log(_templateKey + " 템플릿은 이미 로딩되어 다시 로딩하지 않고 바로 렌더링을 수행합니다.");
	} else {
		var compiledSource = dcompile(_templateKey, _source);
		dloadSource(_templateKey, compiledSource);
		checkLoadedTemplate(_templateKey);
	}

	drender(_templateKey, _model, _res);
}

function dcompile(_templateKey, _source) {
	var template = new String(_source);
	//TODO 상대경로는 어떻게 찾아낼 것인가? 
	if(_source.indexOf('.') === 0 || _source.indexOf('/') === 0) {
		template = fs.readFileSync(_source).toString();		
	}
	var compiledSource = dust.compile(template, _templateKey);

	console.log("Compile to template.\n" + ">> source: " + _source +"\n>> compield source(.js): " + template);
	return compiledSource;
}

function dloadSource(_templateKey, _compiledSource) {
	console.log("Load compield html source\n>>template key: " + _templateKey + "\n>>loaded source: " + _compiledSource);
	dust.loadSource(_compiledSource);
}

function drender(_templateKey, _model, _res) {
	var json = "";
	if(_model instanceof String) {
		json = JSON.parse(_model);
		console.log("JSON model parse from " + _model + " to " + json);
	} else {
		json = _model;
	}
	dust.render(_templateKey, json, 
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

var _tmeplateCache = {};
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
exports.dcompile = dcompile;
exports.dloadSource = dloadSource;
exports.drender = drender;