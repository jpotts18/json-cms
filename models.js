
var Sequelize = require('sequelize');
var Config    = require('./config');

var user = Config.dbUser;
var database = Config.dbName;
var password = Config.dbPassword;

var sequelize = new Sequelize(database , user, password );

//************* USER **************//
exports.User = sequelize.define('users',{
	first 		: {	type: Sequelize.STRING, validate : {isAlpha : true}}
,	last 	  	: { type: Sequelize.STRING, validate : {isAlpha : true}}
,	username 	: { type: Sequelize.STRING, validate : { max : 15, min : 5 , unique : true}}
,	password 	: { type: Sequelize.STRING, validate : { min : 6}}
,	email 		: { type: Sequelize.STRING, validate : { isEmail : true }}
,	apiKey 	  : { type: Sequelize.STRING, validate : { unique : true}}
});

exports.Page = sequelize.define('pages',{
  isPublished : Sequelize.BOOLEAN
, slug        : Sequelize.STRING
, isDraft     : Sequelize.BOOLEAN
});

exports.Block = sequelize.define('blocks',{
  tag       : Sequelize.STRING 
, body      : Sequelize.TEXT
, isMobile  : Sequelize.BOOLEAN
});

exports.Comment = sequelize.define('comments',{
  title     : Sequelize.STRING
, content   : Sequelize.TEXT
, author    : Sequelize.STRING
, email     : Sequelize.STRING
});


exports.Block.belongsTo(exports.Page);
exports.Page.hasMany(exports.Block);

exports.Comment.belongsTo(exports.Page);
exports.Page.hasMany(exports.Comment);


exports.synchronize = function(fn){
  sequelize.sync({force: true});  
  //wait 2 seconds to make sure that the database has been built
  setTimeout(function(){
    fn(true);
  }, 2000);
};
 