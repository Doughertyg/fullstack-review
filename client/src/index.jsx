import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
//const JSON = require('JSON'); //not sure this works

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  //oncomponentmount perform get to server to receive repos from db?

  getRepos () {
    console.log('getting updated repos from db!');

    $.get('/repos', (err, data) => {
      if (err) {
        console.log('error getting updated repos!');
      } else {

        console.log('data before parse!:', data);

        // var resData = json.parse(data);
        // console.log('data after parse!', resData);

        this.setState({
          repos: Data
        })

        // repolist updated! state updated, will refresh
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);

    $.post("/repos", {username: term}, (err, data) => {
      if (err) {
        console.log('error posting to the server! Check other places on pipeline');
        return;
      }

      console.log('post success! server should have queried github, then db, and updated repolist on db');
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));