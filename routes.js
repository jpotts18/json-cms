models	= require('./models'),
Block	= models.Block,
Comment = models.Comment,
Page 	= models.Page,
User 	= models.User;


exports.getPages = function (req, res){
	res.success(__dirname + '/public/pages.html');
}

exports.homepage = function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
}


exports.getPage = function(req,res){
	var slug = req.params.slug;

	// Page is a model this runs a Select * from 'pages' where slug = '?'

	Page.find({where: {slug : slug}})
		// this returns a single page object
		.success(function(page){
			console.log(page);
			// I have defined relationships in models.js so I can access the blocks
			page.getBlocks()
				// on successfully finding the blocks they are returned
				.success(function(blocks){
					console.log(blocks);
					// addiing the blocsk to the page object
					page.blocks = blocks;
						// I have defined this relationsihp in models.js so I can access the comments
						page.getComments();
						.success(function(comments){
							// adding the comments to the page object
							page.comments = comments;
							console.log(comments);
							// the page with all of the comments, blocks as a response
							res.send(page);
						})
						.error(function(error){
							res.send({error:'Comments not found'});
						});
					
				})							
				.error(function(error){
					res.send({error:'blocks not found'});
				});
		})	
		.error(function(error){
			res.send({error:'Page not found'});
		});
}


/* GAME */

/*
DEST 	: GET /games
CURL 	: curl -X GET http://localhost:7890/games
*/

exports.getGames = function (req, res){
	Game.findAll()
		.success(function(games){
			if(games.length > 0){
				res.send({success : true, games : games});
			}else{
				res.send({success : false, msg : "no games were found"});
			}
		});
		//TODO: use http codes instead of success
		//TODO: error handling
}

/*
DEST 	: POST /games
data 	: {away_teamId: 1, home_teamId : 2, location: x, win: 1 , loss : 2 , logonum : 3}
return 	: {success : true, msg : x}
CURL 	: curl --data 'rank=2&teamName=UNLV&location=SLC&win=2&loss=4&logonum=4' http://localhost:7890/teams
*/

exports.postGames = function (req,res){
	if(req.body){
		var game = Game.build(req.body);
		game.save();
		res.send({success:true, msg : "Game created"});
	}else{
		res.send({success:false, msg: "Game not created"});
	}
		//TODO: error handling
}

/* TEAM */
/*
DEST 	: GET /teams
return 	: {success : true, teams : }
CURL 	: curl -X GET http://localhost:7890/teams
*/
exports.getTeams = function(req,res){
	Team.findAll()
		.success(function(teams){
			if(teams.length > 0){
				res.send({success:true, teams : teams});
			}else{
				res.send({success:false, msg: "No teams were found"})
			}
		});
		//TODO: error handling
}

/*
DEST 	: POST /teams
data 	: {rank: x, teamName: y, location: z, win: 1 , loss : 2 , logonum : 3}
return 	: {success : true, msg : x}
CURL 	: curl --data "rank=1&teamName=BYU&location=Provo&win=1&loss=2&logonum=3" http://localhost:7890/teams
*/

exports.postTeams = function(req,res){
	var team = Team.build(req.body);
	team.save();
	res.send({success:true, msg: "team created"});
		//TODO: error handling
}

