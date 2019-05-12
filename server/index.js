const gitApi = require('../helpers/github.js');
const db = require('../database/index.js');
const express = require('express');
const bodyparser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyparser.json());

app.post('/repos', function (req, res) {
  /* TO-DOs

  receive username on req
  send username in request to github, receive info back
  first check if array lengths are the same, if db is
  shorter, replace with new data.
  Search db for repos, save those that don't exist
  return success message
  
  */
  console.log('req is!:', req); //do we need to parse this?
  var parsd = json.parse(req);
  console.log('parsed req:', parsd);
  console.log('search term is(req.username):', req.username);

  	gitApi.getReposByUsername(req.username, (err, data) => {
  		if (err) {
  			console.log('error getting repos from github!:', err);
  			return;
  		}

  		console.log('data is type:', typeof data); //need to be parsed?

  		data.forEach((repo) => { //access each object, aka repo in the array
  			var newDbEntry = { //defining the repo object to save to db
  				id: repo.id,
  				name: repo.name,
  				url: repo.html_url,
  				owner: repo.owner.login,
  				lastUpdated: repo.updated_at
  			}


  			db.find({ id: newDbEntry.id }, (err, returnedRepo) => { //find repo on db with id newentryid.id
  				if (err) {
  					console.log('error finding this repo!'); //repo doesn't exist
  					//insert repo to db
  					var repoEntry = new Repo(newDbEntry);

  					save(repoEntry); //save new repo in db


  					return;
  				}

  				console.log('repo already exists in db!:', returnedRepo); //do nothing
  			})
  		})
  	})
});

app.get('/repos', function (req, res) {
  /* To-Dos

  query db for top 25 repos, search/sort by some value
  possibly use options to specify 25 max results 
	
  */

  db.find(null, (err, returnedRepos) => {
  	if (err) { 
  		console.log('no repos in db!');
  		res.send([]);
  		return;
  	}

  	res.stats(200);
  	res.send(returnedRepos); //do a json operation on data before sending?
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

