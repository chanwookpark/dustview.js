var dust = require("dustjs-linkedin");
var fs = require('fs');

function render(_templateKey, _source, _model, _res) {
	
	var compiledSource = dcompile(_templateKey, _source);

	dloadSource(compiledSource);

	drender(_templateKey, _model, _res);
}

function dcompile(_templateKey, _source) {
	var tmeplate = new String(_source);
	//TODO 상대경로는 어떻게 찾아낼 것인가? 
	if(_source.indexOf('.') === 0 || _source.indexOf('/') === 0) {
		tmeplate = fs.readFileSync(_source).toString();		
	}
	return dust.compile(tmeplate, _templateKey);
}

function dloadSource(_compiledSource) {
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

exports.render = render;
exports.dcompile = dcompile;
exports.dloadSource = dloadSource;
exports.drender = drender;