import React from "react";
import { useDispatch } from "react-redux";

import { setCurrentSubreddit } from "../../features/SubredditNav/SubredditSlice";
import { setSearchTerm } from "../../features/SearchForm/SearchTermSlice";

import { NavItem, NavLink } from "reactstrap";

import './SubredditLink.css';

function SubredditLink(props) {
    const dispatch = useDispatch();
    const { name, iconUrl, active } = props;

    const handleClick = () => {
        dispatch(setSearchTerm(''));
        dispatch(setCurrentSubreddit(name));
    }

    return (
        <NavItem>
            <NavLink onClick={handleClick} active={active} href='#'>
                <img className='SubredditLink-icon' src={iconUrl} alt={`community icon for the ${name} subreddit`}/>
                /r/{name}
            </NavLink>
        </NavItem>
    )
}

export default SubredditLink