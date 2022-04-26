import React, { useState } from "react";
import { FormGroup, Label, Input, Button } from 'reactstrap';

function SearchForm() {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleChange = ({ target }) => {
        setSearchTerm(target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`You searched for: ${searchTerm}`);
        setSearchTerm('');
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