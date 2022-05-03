import React from 'react';
import SubredditLink from '../SubredditLink/SubredditLink';
import { useSelector, useDispatch } from "react-redux";
import { selectSubreddit, setSubreddit } from "../SubredditNav/SubredditSlice";

const SubredditNav = (props) => {
    const { subreddits } = props;
    const dispatch = useDispatch();
    const subreddit = useSelector(selectSubreddit);

    const handleClick = name => {
        dispatch(setSubreddit(name));
    }

    return (
        <div className='d-flex justify-content-between'>
            {subreddits.map(sub => <SubredditLink name={sub.name} active={(sub.name === subreddit)} setSubreddit={handleClick}/>)}
        </div>
    )
}

export default SubredditNav;