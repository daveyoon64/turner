import {React} from 'react';
import {generateId} from '../util';

export const Feed = (props) => {
  return(
    <div className="Feed-list-container">
      <ol className="Feed-list" start={props.index + 1}>
        {props.stories.length 
          ? props.stories.map(story => 
            <li className="Story" key={generateId()}>
              <a href={story.url}>{story.title}</a>
              <div className="Story-options">
                {story.score} points by {story.author} TIMESTAMP | {story.comments} comments
              </div>
            </li>) 
          : <div>Yo, I'm loading.</div>
            }
      </ol>
    </div>
  )
}