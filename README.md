JSON CMS
===

## Why is it Useful? 

- Follows RESTful prinicples and by consuming API through JSON.
- Removes HTML from CMS data by abstracting into blocks. Allows client to parse and style data as needed.
- Node.js backend uses REST calls to populate database. 

## Client Side Javascript Library

- [Angular.js](http://angularjs.org/) based front-end (Still to come - Currently jQuery)
- Consumes REST api and dynamically creates UI
- User module built 

### To run:

1. `git clone https://github.com/jpotts18/json-cms.git`
2. `npm install`
3. move configuration template `mv config.js-template config.js` 
3. update connection string and configs
3. start the server
	- if you want to rebuild the database `node server.js rebuild` 
	- if you want to run the server normally it is `node server.js` or `npm start`
4. After running go to this address:
	- `http://localhost:7890/page` is my proof of concept currently 
	- `http://localhost:7890/api/pages/1/comments`
	- `http://localhost:7890/api/pages/1/blocks`

### To contribute:

- Drop me a line or pull request or @jpotts18 on twitter
	
