import React from "react";

import { NavItem, NavLink } from "reactstrap";

function SubredditLink(props) {
    const { name, active, setSubreddit } = props;

    const handleClick = () => {
        setSubreddit(name);
    }

    return (
        <NavItem>
            <NavLink onClick={handleClick} active={active} href='#'>
                {name}
            </NavLink>
        </NavItem>
    )
}

export default SubredditLink