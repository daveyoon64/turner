
let test = ' https://hacker-news.firebaseio.com/v0/item/26638145.json';

export const testGet = () => {
  return fetch(test)
    .then(response => response.json())
}