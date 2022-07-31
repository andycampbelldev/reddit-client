import React from 'react';

import './More.css'

export default function More({ moreWhat, onClick }) {
    const handleClick = () => {
        onClick();
    }

    return (
        <div className='More d-flex my-2'>
            <div className='More-blockquote'></div>
            <button onClick={handleClick} className='More-button'>more {moreWhat}</button> 
        </div>
    )
}