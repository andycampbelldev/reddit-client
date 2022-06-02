import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectSubreddit, setSubreddit } from "./SubredditSlice";
import { v4 as uuidv4 } from 'uuid';

import SubredditLink from '../../components/SubredditLink/SubredditLink';
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
            {subreddits.map(sub => <SubredditLink key={uuidv4()} name={sub.name} active={(sub.name === subreddit)} setSubreddit={handleClick}/>)}
        </Nav>
    )
}

export default SubredditNav;