import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm, setSearchTerm } from "./searchTermSlice";
import { Label, Input, Button } from 'reactstrap';

function SearchForm() {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);

    const handleSubmit = e => {
        e.preventDefault();
        alert(`You searched for: ${searchTerm}`);
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
                placeholder="search placeholder"
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