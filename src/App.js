import React, {Component} from 'react';
import './App.css';
import {getTopStories, getStory} from './HNservice';



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
class App extends Component {
  state = {
    stories: [],
    story_nums: []
  }


  async componentDidMount() {
    // Gets stories as list of numbers
    const top_stories = await getTopStories(); 
    const smaller = await top_stories.slice(0,30);
    console.log(smaller)
    const stories_to_render = await Promise.all(smaller.map(async(story) => {
      await sleep(0);
      return getStory(story);
    }))
    console.log(stories_to_render);
    this.setState({story_nums: top_stories, stories: stories_to_render})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Jack Reactor: A Hacker News Clone
        </header>
        <div className="Feed-list-container">
          <ol className="Feed-list">
            {this.state.stories.map(story => 
              <li className="Story">
              <a href={story.url}>{story.title}</a>
              <div className="Story-options">
                {story.score} points by {story.author} TIMESTAMP | {story.comments} comments
              </div>
            </li>
            )}
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