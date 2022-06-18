import React from 'react';
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { selectCurrentSubreddit, selectSubredditsAreLoading } from "./SubredditSlice";

import SubredditLink from '../../components/SubredditLink/SubredditLink';
import { Nav } from 'reactstrap';

const SubredditNav = (props) => {
    const { subreddits } = props;
    const subreddit = useSelector(selectCurrentSubreddit);
    const isLoading = useSelector(selectSubredditsAreLoading);

    if(isLoading) {
        return (
            <Nav className='d-flex justify-content-center p-2 my-2'>
                {subreddits.map(sr => <SubredditLink isLoading={true} />)}
            </Nav>
        )
    }

    return (
        <Nav pills className='d-flex justify-content-center p-2 my-2'>
            {subreddits.map(sr => <SubredditLink key={uuidv4()} name={sr.name} iconUrl={sr.icon} active={(sr.name === subreddit)} />)}
        </Nav>
    )
}

export default SubredditNav;