var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('views', __dirname+ "/views");
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

var db = require('./db_crud');

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "form.html" );
});

app.get('/test', db.test);

app.get('/db', function (req, res) {
   res.send('Page Listing');
});

app.get('/form.html', function (req, res) {
   res.sendFile( __dirname + "/" + "form.html" );
})

app.get('/vote', db.vote);

app.get('/process_get', db.process_get);

app.get('/result', db.result);

app.get('/getVotedList', db.getVotedList);



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})