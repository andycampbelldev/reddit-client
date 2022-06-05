import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentSubreddit, setCurrentSubreddit } from "../SubredditNav/SubredditSlice";
import { getPosts } from "../PostsGrid/PostsSlice";
import { selectSearchTerm, setSearchTerm } from "./SearchTermSlice";
import { Label, Input, Button } from 'reactstrap';

function SearchForm() {
    const dispatch = useDispatch();
    const subreddit = useSelector(selectCurrentSubreddit);
    const searchTerm = useSelector(selectSearchTerm);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(setCurrentSubreddit(''))
        dispatch(getPosts(`https://www.reddit.com/search.json?q=${searchTerm}&limit=100`));
    }

    const handleChange = e => {
        dispatch(setSearchTerm(e.target.value));
    }
    
    return (
        <form className="d-flex align-items-center gap-2" onSubmit={handleSubmit} >
            <Label for="exampleSearch" className="visually-hidden">
                Search
            </Label>
            <Input
                id="exampleSearch"
                name="search"
                placeholder="search reddit"
                type="search"
                value={searchTerm}
                onChange={handleChange}
            />
            <Button 
                color="primary"
                outline
            >
                Search
            </Button>
        </form>
    )
}

export default SearchForm;