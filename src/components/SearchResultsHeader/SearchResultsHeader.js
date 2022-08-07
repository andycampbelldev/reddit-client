import React from 'react';

import './SearchResultsHeader.css';

function SearchResultsHeader({ searchedTerm }) {    
    return (
        <p className='SearchResultsHeader'>Results from Reddit for "{searchedTerm}"</p>
    )
}

export default SearchResultsHeader;
