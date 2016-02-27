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

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
