// Create web server 
// Run: node comments.js
// Open browser: http://localhost:8080/comments.html
// Enter a comment and click Submit to see the comments
// Stop server: Ctrl+C
// Open browser: http://localhost:8080/comments
// See the comments in JSON format

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

var COMMENTS_FILE = 'comments.json';

// Create web server
http.createServer(function (req, res) {
  // Get the URL
  var url_parts = url.parse(req.url, true);
  // Get the pathname
  var pathname = url_parts.pathname;
  // Get the query
  var query = url_parts.query;
  // Log the pathname
  console.log("Received request for " + pathname);

  // If the pathname is /comments
  if (pathname == '/comments') {
    // Read the comments from the JSON file
    fs.readFile(COMMENTS_FILE, function(err, data) {
      // If error
      if (err) {
        // Log the error
        console.error(err);
        // Set the status code to 500 (Internal Server Error)
        res.statusCode = 500;
        // Set the content type to application/json
        res.setHeader('Content-Type', 'application/json');
        // Send the error message
        res.end(JSON.stringify({error: 'Failed to read comments'}));
        // Exit
        return;
      }
      // Set the status code to 200 (OK)
      res.statusCode = 200;
      // Set the content type to application/json
      res.setHeader('Content-Type', 'application/json');
      // Send the comments
      res.end(data);
    });
  // If the pathname is /comments.html
  } else if (pathname == '/comments.html') {
    // Read the comments.html file
    fs.readFile('comments.html', function(err, data) {
      // If error
      if (err) {
        // Log the error
        console.error(err);
        // Set the status code to 500 (Internal Server Error)
        res.statusCode = 500;
        // Set the content type to text/plain
        res.setHeader('Content-Type', 'text/plain');
        // Send the error message
        res.end('Internal Server Error');
        // Exit
        return;
      }
      // Set the status code