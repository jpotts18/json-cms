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

exports.getPages = function(req, res){
	res.sendfile(__dirname + '/public/html/page.html');
}

exports.getPageComments = function(req,res){
	var pageId = req.params.id;
	Comment.findAll({ where:{ pageId : pageId} })
		.success(function(comments){
			if(comments){
				res.send(comments);	
			}
		})
}

exports.getPageBlocks = function(req,res){
	var pageId = req.params.id;
	Block.findAll({ where: { pageId : pageId } })
		.success(function(blocks){
			if(blocks){
				res.send(blocks);
			}
		});
}

// exports.getPage = function(req,res){
// 	var slug = req.params.slug;

// 	// Page is a model this runs a Select * from 'pages' where slug = '?'
// 	Page.find({where: {slug : slug}})
// 		// this returns a single page object
// 		.success(function(page){
// 			console.log(page);
// 			// I have defined relationships in models.js so I can access the blocks
// 			page.getBlocks()
// 				// on successfully finding the blocks they are returned
// 				.success(function(blocks){
// 					console.log(blocks);
// 					// addiing the blocsk to the page object
// 					page.blocks = blocks;
// 						// I have defined this relationsihp in models.js so I can access the comments
// 						page.getComments()
// 						.success(function(comments){
// 							// adding the comments to the page object
// 							page.comments = comments;
// 							console.log(comments);
// 							// the page with all of the comments, blocks as a response
// 							res.send(page);
// 						})
// 						.error(function(error){
// 							res.send({error:'Comments not found'});
// 						});
					
// 				})							
// 				.error(function(error){
// 					res.send({error:'blocks not found'});
// 				});
// 		})	
// 		.error(function(error){
// 			res.send({error:'Page not found'});
// 		});
// }

// exports.sethsGetPage = function(req,res){
//  	var slug = req.params.slug,
//     data = {};

//    	var sendError = function (message) {
//     	res.send({ error: 'There was an error' });
//    	}
   
//    	var commentsSuccess = function (comments) {
//     	data.comments = comments;
//     	res.send(data);
//    	}
 
//  	var getComments = function(blocks) {
//     	data.blocks = blocks;
//      	Page.getComments()
//        		.success(commentsSuccess)
//        		.error(sendError);
//    }

//    var getBlocks = function(page){
// 	    data = page;
// 	    console.log(data);
// 	    Page.getBlocks()
// 	    	.success(getComments)
// 	       	.error(sendError)
//    }

//    Page.find({where: {slug : slug}})
//      .success(getBlocks)
//      .error(sendError);
// }


// exports.getPageComments = function(req,res){
// 	var params = req.params;

// }

// exports.getPageBlocks = function(req,res){
// 	var params = req.params;
// }
