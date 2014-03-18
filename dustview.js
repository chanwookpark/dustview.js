var dust = require("dustjs-linkedin");

function render(_templateKey, _source, _model, _res) {
	var compiledSource = dust.compile(_source, _templateKey);

	dust.loadSource(compiledSource);

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