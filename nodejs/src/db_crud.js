var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'test'
	});

connection.connect();

exports.test = function(req, res){
          res.send('tested');   
};
//----------------------------------------------------------------------------
exports.vote = function(req,res){
  
    connection.query('SELECT * from votes where name ="'+ req.query.voter +'"', function(err, rows, fields) {
		if(rows.length >= 2){
			res.send("Already reached voting limit" );
			console.log('Invalid vote.');
		}
		else{
			//res.send(JSON.stringify(rows));
			console.log('valid.');
            connection.query('SELECT * from votes where contestant="'+ req.query.voteFor +'" and name ="'+ req.query.voter +'"', function(err, rows, fields) {
                if(rows.length == 0){
           
                    var data = {
                        name    : req.query.voter,
                        contestant : req.query.voteFor
                    };
                    
                    var query = connection.query("INSERT INTO votes set ? ",data, function(err, rows)
                    {
                        res.send("Thank you for voting!");
                       // res.redirect('/process_get?first_name='+ req.query.voter); 
                    });
                }
                else{
                    res.send("Already voted for this contestant. Choose another!" );
                }
                
            });
        } 
	});

};

//----------------------------------------------------------------------------

exports.process_get= function (req, res) {
    //res.send('tested'); 

   console.log(req.body);
   // Prepare output in JSON format
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
  // res.send(JSON.stringify(response));
	var user="";
	
	connection.query('SELECT * from names where name ="'+ response.first_name +'"', function(err, rows, fields) {
		if(rows.length == 0){
			res.send("Invalid Password" );
			console.log('Invalid.');
		}
		else{
			//res.send(JSON.stringify(rows));
			console.log('valid.');
			user = rows[0].name;
			//res.render("list", { name: user });
		}
	    
	});

	
		connection.query('SELECT * from names where isC = true', function(err, rows, fields) {
			  if (!err){
				console.log('The solution is: ', rows);
				res.render("list", { name: user  ,  list: rows });
			  }	
			  else
				console.log('Error while performing Query.');
			});
};
//-----------------------------------------------------------------------------------------------------

exports.result = function (req, res) {
    //res.send('works');

	connection.query('SELECT contestant, count(*) as no_of_votes from votes group by contestant', function(err, rows, fields) {
		if(rows.length == 0){
			res.send("No results available" );
			console.log('Invalid.');
		}
		else{
			res.render("result", { list: rows });
            //res.send("results available" );
		}
	    
	});
};

//-------------------------------------------------------------------------------------------------------

exports.getVotedList = function (req, res) {

	connection.query('SELECT * from votes where name ="'+ req.query.name +'"', function(err, rows, fields) {
		if(rows.length == 0){
			res.send(rows);
		}
		else{
			res.send(rows);
		}
	});
};