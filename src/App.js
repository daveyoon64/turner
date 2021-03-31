import React, {Component} from 'react';
import './App.css';
import {getTopStories, getStory} from './HNservice';

class App extends Component {
  state = {
    stories: [],
    story_nums: []
  }

  async componentDidMount() {
    // Gets stories as list of numbers
    const top_stories = await getTopStories(); 
    const stories_to_render = [];
    for (let i = 0; i < 30; i++) {
      // Gets story using numbers from stories
      let temp = await getStory(top_stories[i]);
      stories_to_render.push(temp);
    }
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