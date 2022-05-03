import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSubreddit, setSubreddit } from "./SubredditSlice";

function SubredditLink(props) {
    const { name, url } = props;
    
    const dispatch = useDispatch();
    const subreddit = useSelector(selectSubreddit);

    const handleClick = e => {
        dispatch(setSubreddit(name));
    }

    return (
        <li 
            className={`${subreddit === name ? 'border-bottom border-primary' : ''} m-4`}
            onClick={handleClick}
        >
            {name}
        </li>
    )
}

export default SubredditLink