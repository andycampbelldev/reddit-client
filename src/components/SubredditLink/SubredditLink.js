import React from "react";

function SubredditLink(props) {
    const { name, active, setSubreddit } = props;

    const handleClick = () => {
        setSubreddit(name);
    }

    return (
        <li 
            className={`${active ? 'border-bottom border-primary' : ''} m-4`}
            onClick={handleClick}
        >
            {name}
        </li>
    )
}

export default SubredditLink