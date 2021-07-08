import React, {Component} from 'react';
import './App.css';
import {getTopStories, getStory} from './HNservice';
import {Header, Footer, Feed} from './components';
import {sleep} from './util';

class App extends Component {
  state = {
    stories: [],
    story_nums: [],
    index: 0,
    isNewIndex: false
  }

  componentDidMount = async() => {
    // Gets stories as list of numbers
    const top_stories = await getTopStories();
    this.setState({story_nums: top_stories});
    this.updateStories();
  }

  componentDidUpdate = async() => {
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
        <Feed start={this.state.index}
          stories={this.state.stories}/>
        <button onClick={this.handleMoreClick}>More</button>
        <Footer />
      </div>
    );
  }
}

export default App;