var express = require('express');
var dustview = require('dustview');
var app = express();

// config
app.engine('html', dustview.eRender);
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	//TODO 확장자 명을 변경할 수 있는 방법은?
	app.set('view engine', 'html');
	app.set('view cache', false);
    app.set('views', __dirname + '/views/');
    // app.use(express.static(__dirname + '/public', {redirect: false}));
	// app.use(express.session({ secret: 'very_unique_secret_string', cookie: { maxAge: 1800000 }}));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.errorHandler());
});	

app.get('/hello', function(req, res){
	res.send('Hello~');
});

app.get('/sample', function(req, res){
	/*
	res.render('sample', function(err, out){
		console.log("success: " + out);
		console.log("fail: " + err);
	});
	*/
	res.render('sample', {name: 'chanwook'});	
});

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});	