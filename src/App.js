import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import hnService from './HNservice';
import {Header, Footer, Feed, Button} from './components';
import {sleep} from './util';

const App = () => {
  /* 
    storyNums:  array of HN stories as numbers
    stories:    array of HN stories 
  */
  const [stories, setStories] = useState([])
  const [storyNums, setStoryNums] = useState([])
  const [index, setIndex] = useState(1)
  const [isNewIndex, setIsNewIndex] = useState(true)

  const updateStories = useCallback(async() => {
    const [first, last] = [((index * 30) - 30), index * 30];
    const single_page = storyNums.slice(first, last);
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
    window.onpopstate = () => {
      const path = window.location.pathname
      const newIndex = path.substring(path.lastIndexOf('='))
      newIndex === '/'
        ? setIndex(1)
        : setIndex(newIndex.substring(1))
    }
    updateStories()
  }, [isNewIndex, index, updateStories, storyNums]);

  const handleMoreClick = (e) => {
    e.preventDefault()
    const indexIncrement = index + 1
    const location = 'page=' + index
    setIndex(indexIncrement)
    window.history.pushState(null, '', location)
    setIsNewIndex(true)
  };

  return (
      <div className="App">
        <Header />
        <Feed start={index}
          stories={stories}/>
        <Button linkHandler={handleMoreClick} />
        <Footer />
      </div>
    );
}

export default App;