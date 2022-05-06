import React from 'react';
import SubredditLink from '../../components/SubredditLink/SubredditLink';
import { useSelector, useDispatch } from "react-redux";
import { selectSubreddit, setSubreddit } from "./subredditSlice";
import { Nav } from 'reactstrap';

const SubredditNav = (props) => {
    const { subreddits } = props;
    const dispatch = useDispatch();
    const subreddit = useSelector(selectSubreddit);

    const handleClick = name => {
        dispatch(setSubreddit(name));
    }

    return (
        <Nav pills className='d-flex justify-content-between p-2'>
            {subreddits.map(sub => <SubredditLink name={sub.name} active={(sub.name === subreddit)} setSubreddit={handleClick}/>)}
        </Nav>
    )
}

export default SubredditNav;