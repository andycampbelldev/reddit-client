import React from 'react';

import './More.css'

export default function More({ moreWhat, onClick }) {
    const handleClick = () => {
        onClick();
    }

    return (
        <div className='More d-flex my-2'>
            <div className='More-blockquote flex-shrink-0 me-2'></div>
            <button onClick={handleClick} className='More-button d-block border-0 py-2'>more {moreWhat}</button> 
        </div>
    )
}