
let test = 'https://hacker-news.firebaseio.com/v0/item/26638145.json';

export const getTopStories = async() => {
  // Gets the top 500 stories as numbers from Hacker News' API
  // data looks like: [3434523, 3453463, ...]
  const url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const getStory = async(number) => {
  // asynchronous function to grab story from Hacker News
  const url = 'https://hacker-news.firebaseio.com/v0/item/';
  const storyUrl = url + number + '.json';
  const response = await fetch(storyUrl);
  const story = await response.json();
  return story;
}