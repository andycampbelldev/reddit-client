import React from 'react';
import { useDispatch } from 'react-redux';

import { setCurrentSubreddit } from '../../features/SubredditNav/SubredditSlice';
import { setSearchInput, setSearchedTerm } from '../../features/SearchForm/SearchTermSlice';

import { NavItem, NavLink } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'
import './SubredditLink.css';

function SubredditLink({ name, iconUrl, active, isLoading }) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setSearchInput(''));
        dispatch(setSearchedTerm(''));
        dispatch(setCurrentSubreddit(name));
    }

    if (isLoading) {
        return (
            <div className='d-flex align-items-center px-4'>
                <Skeleton className='me-2' circle={true} height={45} width={45} /> <Skeleton height={25} width={100} />
            </div>
        )
    }

    return (
        <NavItem className={`SubredditLink ${active ? 'SubredditLink-active' : ''}`}>
            <NavLink className='SubredditLink-link d-flex align-items-center' onClick={handleClick} href='#'>
                <img className='SubredditLink-icon' src={iconUrl} alt={`community icon for the ${name} subreddit`}/>
                <span className='SubredditLink-name'>/r/{name}</span>
                {/* /r/{name} */}
            </NavLink>
        </NavItem>
    )
}

export default SubredditLink