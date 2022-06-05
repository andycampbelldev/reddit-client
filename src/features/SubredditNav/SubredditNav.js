import React from 'react';
import { useSelector } from "react-redux";
import { selectCurrentSubreddit } from "./SubredditSlice";
import { v4 as uuidv4 } from 'uuid';

import SubredditLink from '../../components/SubredditLink/SubredditLink';
import { Nav } from 'reactstrap';

const SubredditNav = (props) => {
    const { subreddits } = props;
    const subreddit = useSelector(selectCurrentSubreddit);

    return (
        <Nav pills className='d-flex justify-content-between p-2'>
            {subreddits.map(subredditName => <SubredditLink key={uuidv4()} name={subredditName} active={(subredditName === subreddit)} />)}
        </Nav>
    )
}

export default SubredditNav;