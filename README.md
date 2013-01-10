JSON CMS
===

## Why is it Useful ? 

- Follows RESTful prinicples and accesses endpoints to retrieve JSON.
- Removes HTML from CMS data by abstracting into blocks. Allows client to parse and style data as needed.
- Node.js backend uses REST calls to populate database. 

## Client Side Javascript Library

### To run:

1. git clone https://github.com/jpotts18/json-cms.git
2. npm install
3. mv config.js-template to config.js 
3. update connection string and configs
3. start the server
- if you want to rebuild `node server.js rebuild` 
- if you want to run the server normally it is `node server.js` or `npm start`


Please be sure you have expressjs and socket.io modules installed before running this application.

On Windows/Mac/Linux:

	$ node server.js
	$ node server.js rebuild (dumps database and rebuild)
	
After running go to this address:

	http://locahost:7890/
	
