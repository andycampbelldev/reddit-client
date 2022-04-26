import React, { useState } from "react";
import { FormGroup, Label, Input, Button } from 'reactstrap';

function SearchForm() {
    
    
    return (
        <form className="d-flex align-items-center gap-2">
            <Label for="exampleSearch" className="visually-hidden">
                Search
            </Label>
            <Input
                id="exampleSearch"
                name="search"
                placeholder="search placeholder"
                type="search"
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