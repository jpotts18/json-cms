
// load in the models and User Model
models	= require('./models'),
pwHash 	= require('password-hash'),
User 	= models.User;

/* 	
DEST 	: POST /login
data 	: {username : x, password : y}
return	: {success : true, apiKey : z}
errors 	: Wrong username or password
cUrl 	: curl --data "username=testUsername&password=asdf" http://localhost:7890/login 
*/

exports.postLogin = function (req,res){
	User.find({where:
				{username: req.body.username}})
		.success(function(user){
			if(!user){
				res.send({success: false, msg:'wrong *username or password'})}
			if(user){
				if(pwHash.verify(req.body.password,user.password)){
					res.send({	success : true, 
								user : { 
									id : user.id, 
									username : user.username, 
									apiKey : user.apiKey
								}
							});
				}else{
					res.send({success: false, msg: 'wrong username or *password'});
				}
			}
		});
}

/*
DEST 	: POST /register
data 	: {first: x, last: y, username: z, password : a, email: f}
return 	: {success : true, msg : x}
errors 	: Sorry User already in the database
CURL 	: curl --data "first=firstTest&last=lastTest&username=testUsername&password=asdf&email=testEmail" http://localhost:7890/register
*/

exports.postRegister = function(req,res){
	User.find({where:{username: req.body.username}})
		.success(function(user){
			if(!user){
				var newUser = User.build(req.body);
				newUser.apiKey = generateApiKey();
				newUser.password = pwHash.generate(newUser.password);
				newUser.save();
				res.send({ success : true, msg : "New user created "+newUser.username });
			}else{
				res.send({ success : false, msg : "Sorry user already in DB"});
			}
		});
}

exports.validateToken = function(data, fn){
	User.find({where:{
				apiKey: data.apiKey
				}})
		.success(function(user){
			if(user){ fn(user);}
			else{ fn(null);}
		});
}


exports.getLogin = function (req, res) {
	res.sendfile(__dirname + '/public/login.html');
}

exports.getRegister = function (req, res) {
	res.sendfile(__dirname + '/public/register.html');
}

/// Other functions
function generateApiKey(){
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}