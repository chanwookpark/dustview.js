var dust = require("dustjs-linkedin");

function render(_templateKey, _source, _jsonObject) {
	var compiledSource = dust.compile(source, templateKey);
	dust.loadSource(compiledSource);
	dust.render(templateKey, "", 
	function(_err, _out){
		if(_out) {
			response.write(_out); 
			console.log("3. Rendering success: " + _out);
		}
		if(_err) {
			console.log("3. Rendering error: " + _err); 
		}
	}
);
}