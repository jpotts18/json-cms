

// creating global parameters and start
// listening to 'port', we are creating an express
// server and then we are binding it with socket.io
var express 	= require('express'),
	app			= express(),
	util 		= require('util'), 
    server  	= require('http').createServer(app),
    // io      	= require('socket.io').listen(server),
    port    	= 7890,
	routes		= require('./routes'),
	testing		= require('./testing'),
	auth 		= require('./auth'),
	Models		= require('./models'),
	Config  	= require('./config'),
	Game 		= Models.Game,
	Room 		= Models.Room,
	Comment 	= Models.Comment;

server.listen(port);


/* COMMAND LINE INTERFACE */
var arg1 = process.argv[2];
console.log('CLI ARG = '+arg1);

if(arg1 === 'rebuild'){
	models.synchronize(function(success){
		if(success){
			testing.createFixtures();
		}else{
			console.log('database error not synched');
		}
	});
}

/** EXPRESS CONFIG  **/
app.use(express.bodyParser());
app.use("/styles", express.static(__dirname + '/public/styles'));
app.use("/scripts", express.static(__dirname + '/public/scripts'));
app.use("/images", express.static(__dirname + '/public/images'));

/**	ROUTING  */
// authentication endpoints
app.get('/auth/register', auth.getRegister);
app.post('/auth/register', auth.postRegister);
app.get('/auth/login', auth.getLogin);
app.post('/auth/login', auth.postLogin);

// web pages
app.get('/', routes.homepage);

// accessing models
app.get('/page', routes.getPages);
app.post('/pages', routes.postPages);
app.get('/pages/:slug', routes.sethsGetPage);

app.get('/api/pages/:id/comments', routes.getPageComments);
app.get('/api/pages/:id/blocks', routes.getPageBlocks);


// unique id generator
function generateRoomGuid(){
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4() + S4() + S4() + S4() + S4());
}


// show a message in console
console.log('Chat server is running and listening to port %d...', port);