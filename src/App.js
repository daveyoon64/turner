import React, {Component} from 'react';
import './App.css';
import {getTopStories, getStory} from './HNservice';

class App extends Component {
  state = {
    title: '',
    url: '',
    score: 0,
    author: '',
    comments: 0
  }
  
  // get story numbers from https://hacker-news.firebaseio.com/v0/topstories.json
    // this still be the state we use for our pagination
  // to display story...
    // get a number from story numbers
      //and create new_story like we did below

  async componentDidMount() {
    // testing
    const top_stories = await getTopStories(); 
    console.log(await top_stories);
    console.log(await getStory(top_stories[0]));

    const url = 'https://hacker-news.firebaseio.com/v0/item/26638145.json';
    const response = await fetch(url);
    const data = await response.json();
    const new_story = {
      title: data.title,
      url: data.url,
      score: data.score,
      author: data.by,
      comments: data.descendants
    }
    this.setState({...new_story});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Jack Reactor: A Hacker News Clone
        </header>
        <div className="Feed-list-container">
          <ol className="Feed-list">
            <li>this is story test</li>
            <li>this is story test</li>
            <li>this is story test</li>
            <li className="Story">
              <a href={this.state.url}>{this.state.title}dkjgasdkljgahsdklgjashdlkgahsdklgashdklgjahsdlkga</a>
              <div className="Story-options">
                {this.state.score} points by {this.state.author}ldfkgjsdfl;gsjfgl;sj TIMESTAMP | {this.state.comments} comments
              </div>
            </li>
            <li className="Story">
              <a href={this.state.url}>{this.state.title}</a>
              <div className="Story-options">
                {this.state.score} points by {this.state.author} TIMESTAMP | {this.state.comments} comments
              </div>
            </li>
          </ol>
        </div>
        <div className="Footer">
          <p>Made with love Muwwwahahhhhh</p>
          <button>Back</button>
        </div>
      </div>
    );
  }
}

export default App;