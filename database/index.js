const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher'); //connecting to our db
var db = mongoose.connection; //defining a handle for our db

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { //called once the connection is opened
	console.log('connected to db!'); //now do the rest of the db setup
	
	//must define our schema:

	let repoSchema = mongoose.Schema({ //use promise instead?
	  // schema design, add method?
	  id: Number,
	  name: String,
	  url: String,
	  owner: String
	});

	//add method here to schema? method to return data

	//compile into a model for use:

	let Repo = mongoose.model('Repo', repoSchema); //entries to our db will instances of Repo

});

//define save callback and actions
/* wait this is wrong:
let save = (err, repo) => {
	if (err) {
		console.log('error saving repo! eek!');
		return;
	}

	console.log('successfully saved repo:', repo);
}
*/

let save = (repoToSave) => {
	repoToSave.save((err, repo) => {
		if (err) {
			console.log('error saving repo! eek!');
			return;
		}

		console.log('successfully saved repo:', repo);
	})
}

//should define find callback here and any others we might use

let find = (id, callback) => {

	Repo.find(id, callback); //Repo is the name of our model class
}

// let find = (err, repos) => {
// 	if (err) {
// 		console.log('error finding repo! please re-evaluate life choices');
// 		return;
// 	}

// 	console.log('found repos!:', repos);
// }

/*

in checking for saved repos we can user 'owner' and username as the 
first argument to search for repos owned by that user
additionally we can search passing 'name' or id as the first argument
to ensure we don't create any duplicates 

*/

//insert comment art below
module.exports.db = db;
module.exports.find = find;
module.exports.save = save;