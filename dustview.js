var dust = require("dustjs-linkedin");

function render(_templateKey, _source, _model, _res) {
	var compiledSource = dust.compile(_source, _templateKey);

	dust.loadSource(compiledSource);
	
	dust.render(_templateKey, _model, 
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