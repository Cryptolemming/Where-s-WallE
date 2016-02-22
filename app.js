var express = require('express');
var path = require('path');
var swig = require('swig');

var app = express();

// view engine setup
var swig = new swig.Swig();
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	res.render('index');
});

app.listen(8080, function() {
	console.log('listening on port 8080');
});