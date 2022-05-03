import React from 'react';
import SubredditLink from '../../features/SubredditLink/SubredditLink';

const SubredditContainer = (props) => {
    const { subreddits } = props;
    return (
        <div className='d-flex justify-content-between'>
            {subreddits.map(subreddit => <SubredditLink name={subreddit.name} url={subreddit.url}/>)}
        </div>
    )
}

export default SubredditContainer;