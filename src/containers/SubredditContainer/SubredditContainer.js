import React from 'react';

const SubredditContainer = (props) => {
    const { list } = props;
    return (
        <div>
            {list.map(subreddit => <li>{subreddit.name}</li>)}
        </div>
    )
}

export default SubredditContainer;