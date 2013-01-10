JSON CMS
===

## Why is it Useful

Data comes down from the server without being forced into a specific format, the client can decide how to parse it.
The information is not dependent on the cms being on the web. It can be used on mobile devices as well.
Removes the styling that is inherent in html.

## Client Side Javascript Library

### To run:

```javascript
	1. git clone //URL
	2. npm install
	3. go into the config.js and update connection string
	3. node server.js
		if you want to rebuild
		node server.js rebuild 
```


Please be sure you have expressjs and socket.io modules installed before running this application.

On Windows/Mac/Linux:

	$ node server.js
	$ node server.js rebuild (dumps database and rebuild)
	
After running go to this address:

	http://locahost:7890/
	
