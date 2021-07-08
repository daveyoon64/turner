import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import hnService from './HNservice';
import {Header, Footer, Feed} from './components';
import {sleep} from './util';

const App = () => {
  const [stories, setStories] = useState([]);
  const [storyNums, setStoryNums] = useState([]);
  const [index, setIndex] = useState(0);
  const [isNewIndex, setIsNewIndex] = useState(true);

  const updateStories = useCallback(async() => {
    const [first, last] = [index, index + 30];
    const single_page = await storyNums.slice(first, last);
    const stories_to_render = await Promise.all(single_page.map(async(story) => {
      await sleep(0)
      return hnService.getStory(story)
    }));
    setStories(stories_to_render)
  }, [index, storyNums]);

  useEffect(() => {
    if (isNewIndex) {
      hnService
      .getTopStories()
      .then(stories => {
        setStoryNums(stories)
      })
      setIsNewIndex(false)
    }
    updateStories()
  }, [isNewIndex, index, updateStories, storyNums]);

  const handleMoreClick = (e) => {
    let new_index = index;
    if (new_index <= storyNums.length && stories.length === 30) {
       new_index += 30;
    }
    setIndex(new_index)
    setIsNewIndex(true)
  }

  return (
      <div className="App">
        <Header />
        <Feed start={index}
          stories={stories}/>
        <button onClick={handleMoreClick}>More</button>
        <Footer />
      </div>
    );
}

export default App;