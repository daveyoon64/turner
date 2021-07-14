import {React} from 'react';
import {generateId, generateTimestamp} from '../util';

export const Feed = ({start, stories}) => {
  return(
    <div className="Feed-list-container">
      <ol className="Feed-list" start={ ((start * 30) - 29) }>
        {stories.length 
          ? stories.map(story => 
            <li className="Story" key={generateId()}>
              <a href={story.url}>{story.title}</a>
              <div className="Story-options">
                {story.score} points by {story.by} on {generateTimestamp(story.time)} | {story.descendants} comments
              </div>
            </li>) 
          : (
              <div className="Loading">
                <span>Loading...</span>
                <div className="half-spinner"></div>
              </div>
          )
        }
      </ol>
    </div>
  )
}