var dust = require("dustjs-linkedin");
var http = require("http");
var url = require("url");
var dustview = require("./dustview")

// node webserver 세팅
http.createServer(function(request, response) {

	response.writeHeader(200, {"Content-Type":"text/html"});

	var pathName = url.parse(request.url).pathname;
	console.log("1. request for" + pathName + ".");

	// controller 구현
	var handler = "";
	var templateKey = "";
	var source = "";
	var model = "";
	if("/hello" === pathName) {
		handler = "/hello";
		response.write("Hello!");
	} else if("/dust1" === pathName) {
		handler = "/dust1";
		templateKey = "dust1";
		source = "Hello! Dust First~!";

	} else if("/dust2" === pathName) {
		handler = "/dust2";
		templateKey = "dust2";
		source = "Hello! Dust Second with {name}!"
		model = new String("{\"name\":\"chanwook\"}");

	}
	console.log("2. route to " + handler);

	dustview.render(templateKey, source, model, response);

	response.end();

}).listen(9030);
