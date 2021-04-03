import React, {Component} from 'react';
import './App.css';
import {getTopStories, getStory} from './HNservice';
import {Header} from './components/Header';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
class App extends Component {
  state = {
    stories: [],
    story_nums: [],
    index: 0,
    isNewIndex: false
  }

  async componentDidMount() {
    // Gets stories as list of numbers
    const top_stories = await getTopStories();
    this.setState({story_nums: top_stories});
    this.updateStories();
  }

  async componentDidUpdate() {
    if (this.state.isNewIndex) {
      this.updateStories();
      this.setState({isNewIndex: false});
    }
  }

  updateStories = async() => {
    const [first, last] = [this.state.index, this.state.index + 30];
    const single_page = await this.state.story_nums.slice(first, last);
    const stories_to_render = await Promise.all(single_page.map(async(story) => {
      await sleep(0);
      return getStory(story);
    }));
    this.setState({stories: stories_to_render});
  }

  handleMoreClick = () => {
    let new_index = this.state.index;
    if (new_index <= this.state.story_nums.length && this.state.stories.length === 30) {
       new_index += 30;
    }
    this.setState({index: new_index, isNewIndex: true});
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="Feed-list-container">
          <ol className="Feed-list" start={this.state.index + 1}>
            {this.state.stories.length 
              ?  this.state.stories.map(story => 
                   <li className="Story">
                     <a href={story.url}>{story.title}</a>
                     <div className="Story-options">
                       {story.score} points by {story.author} TIMESTAMP | {story.comments} comments
                     </div>
                   </li>) 
              : <div>Yo, I'm loading.</div>
            }
          </ol>
        </div>
        <button onClick={this.handleMoreClick}>More</button>
        <div className="Footer">
          <p>Made with love Muwwwahahhhhh</p>
        </div>
      </div>
    );
  }
}

export default App;