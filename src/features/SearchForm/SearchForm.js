import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentSubreddit } from '../SubredditNav/SubredditSlice';
import { getPosts } from '../PostsGrid/PostsSlice';
import { selectSearchTerm, setSearchTerm } from './SearchTermSlice';

import { Label, Input, Button } from 'reactstrap';

import './SearchForm.css';

function SearchForm() {
    const dispatch = useDispatch();
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
        <form className='SearchForm d-flex align-items-center gap-2' onSubmit={handleSubmit} >
            <Label for='searchInput' className='visually-hidden'>Search</Label>
            <Input
                className='SearchForm-Input'
                id='searchInput'
                name='search'
                placeholder='search reddit'
                type='search'
                value={searchTerm}
                onChange={handleChange}
            />
            <Button className='SearchForm-Submit' outline>Search</Button>
        </form>
    )
}

export default SearchForm;