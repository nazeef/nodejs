

	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'test'
	});

	connection.connect();
	
	connection.query('SELECT * from names', function(err, rows, fields) {
	  if (!err)
		console.log('The solution is: ', response);
	  else
		console.log('Error while performing Query.');
	});

//module.exports = connection;/
connection.end();