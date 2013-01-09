
models	= require('./models'),
Game 	= models.Game,
Team 	= models.Team,
User 	= models.User,
Comment = models.Comment;

exports.getDebug = function(req,res){ 	
	res.sendfile(__dirname + '/public/debug.html');
}

exports.createFixtures = function(){

	User.find({where:{username: 'jpotts18'}})
		.success(function(user){
			if(user){
				console.log('Database is already built');
			}
			else{
				generateFixtures();
			}
		})
		.error(function(error){
			console.log(error);
		});
}

function generateFixtures(){
	console.log('+++++++++++++++++++++++++++++++++++++++');
	console.log('GENERATING FIXTURES');
	console.log('+++++++++++++++++++++++++++++++++++++++');
	// generating data
	generateUsers();
	generatePages();
	generateBlocks();
	generateComments();
	// generateGames();
	// generateTeams();
	// generateComments();
	
}

function generatePages(){
	var pages = [];
	pages.push({ slug : 'page-1', isDraft : false, isPublished : true });
	pages.push({ slug : 'page-2', isDraft : true,  isPublished : true });
	for (var i = 0; i < pages.length; i++) {
		Page.build(pages[i])
			.save()
			.success(function(){

			})
			.error(function(){

			});
	};
}
function generateBlocks(){
	var blocks = [];
	blocks.push({ tag : 'heading-1', body : 'This is Page one Header one', isMobile : true, pageId : 1  });
	blocks.push({ tag : 'heading-2', body : 'This is Page one Header two', isMobile : true, pageId : 1  });
	blocks.push({ tag : 'paragraph', body : 'This is a paragraph one for Page one text', isMobile : true, pageId : 1 });
	blocks.push({ tag : 'paragraph', body : 'This is a paragraph two for Page one text', isMobile : true, pageId : 1 });
	blocks.push({ tag : 'paragraph', body : 'This is a paragraph three for Page one text', isMobile : true, pageId : 1 });
	blocks.push({ tag : 'heading-1', body : 'This is Page two Header one', isMobile : true, pageId : 2  });
	blocks.push({ tag : 'heading-2', body : 'This is Page two Header two', isMobile : true, pageId : 2  });
	blocks.push({ tag : 'paragraph', body : 'This is a paragraph one for Page two text', isMobile : true, pageId : 2 });
	blocks.push({ tag : 'paragraph', body : 'This is a paragraph two for Page two text', isMobile : true, pageId : 2 });
	blocks.push({ tag : 'paragraph', body : 'This is a paragraph three for Page two text', isMobile : true, pageId : 2 });
	for (var i = 0; i < blocks.length; i++) {
		Block.build(blocks[i])
			.save()
			.success(function(block){

			})
			.error(function(){

			});
	};
}
function generateComments(){
	var comments = 	 [];
	comments.push({ title : 'New Comment', content : 'Great article 1', author : 'jpotts18', email : 'jpotts@gmail.com', pageId : 1 });
	comments.push({ title : 'New Comment', content : 'Great article 2', author : 'jpotts18', email : 'jpotts@gmail.com', pageId : 1 });
	comments.push({ title : 'New Comment', content : 'Great article 3', author : 'jpotts18', email : 'jpotts@gmail.com', pageId : 1 });
	comments.push({ title : 'New Comment', content : 'Great article 4 for page 2', author : 'jpotts18', email : 'jpotts@gmail.com', pageId : 2 });
	comments.push({ title : 'New Comment', content : 'Great article 5 for page 2', author : 'jpotts18', email : 'jpotts@gmail.com', pageId : 2 });
	for (var i = 0; i < comments.length; i++) {
		Comment.build(comments[i])
			.save()
			.success(function(comment){

			})
			.error(function(){

			});
	};
}

function generateUsers(){

	var users = [];
	users.push({
				first : 'Jeff',
				last : 'Potter',
				username : 'jpotts18',
				password : 'sha1$5206e6e3$1$cddd0560dbcb5a07f73b851ccc0c507bd6d51197',
				email : 'jeff.potter6@gmail.com',
				apiKey : '3e9ca43b-16f8-5089-5b2b-8a775f130275'
				});
	users.push({
				first : 'Nick',
				last : 'Walter',
				username : 'nwalter',
				password : 'sha1$aee25eb4$1$d5c4fbbafcfe2d10dbe71f2f289a98c5bfd1f8f6',
				email : 'nwalter@gmail.com',
				apiKey : '702b0a4c-2042-a1e7-51eb-caf84285a4ee'
				});
	users.push({
				first : 'Mike',
				last : 'Tingey',
				username : 'mtingey',
				password : 'sha1$599a25e5$1$e5cd1d35c5c30e655f1efa857bf4e1bce74b9e0c',
				email : 'mike@moneygarden.com',
				apiKey : '0711989c-c2f2-d77c-5ca7-eb742e076dc4'
				});
	for (var i = 0; i < users.length; i++) {
		User.build(users[i])
			.save()
			.success(function(user){

			})
			.error(function(){

			});
	}
}
