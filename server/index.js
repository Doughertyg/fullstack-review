import getReposByUsername from '../helpers/github.js';
import save from '../database/index.js';
import db from '../database/index.js';
const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  /* TO-DOs

  receive username on req
  send username in request to github, receive info back
  first check if array lengths are the same, if db is
  shorter, replace with new data.
  Search db for repos, save those that don't exist
  return success message
  
  */

  	getReposByUsername(req.username, (err, data) => {
  		if (err) {
  			console.log('error getting repos from github!:', err);
  			return;
  		}

  		data.forEach((repo) => { //access each object, aka repo in the array
  			var newDbEntry = { //defining the repo object to save to db
  				id: repo.id,
  				name: repo.name,
  				url: repo.html_url,
  				owner: repo.owner.login
  			}


  			find(repo, { id: newDbEntry.id }, (err, returnedRepo) => {
  				if (err) {
  					console.log('error finding this repo!'); //repo doesn't exist
  					//insert repo to db
  					var repoEntry = new Repo(newDbEntry);

  					repoEntry.save(); //save new repo in db


  					return;
  				}

  				console.log('repo already exists in db!'); //do nothing
  			})

  			if () {}


  		})
  	})



});

app.get('/repos', function (req, res) {
  /* To-Dos

  query db for top 25 repos, search/sort by some value
  possibly use options to specify 25 max results 
	
  */
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

