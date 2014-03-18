var dust = require("dustjs-linkedin");
var http = require("http");
var url = require("url");
var dustview = require("./dustview")

// node webserver 세팅
http.createServer(function(request, response) {

	response.writeHeader(200, {"Content-Type":"text/html"});

	var pathName = url.parse(request.url).pathname;
	console.log("1. request for" + pathName + ".");

	var handler = "";
	if("/hello" === pathName) {
		handler = "/hello";
		response.write("Hello!");
	} else if("/dust1" === pathName) {
		handler = "/dust1";
		var templateKey = "testkey";
		var source = "Hello! Dust First~";
		var model = "";

		dustview.render(templateKey, source, model, response);
	}
	console.log("2. route to " + handler);

	response.end();

}).listen(9030);

// controller 구현

// dustview 구현 (일단 하드코딩한다!)