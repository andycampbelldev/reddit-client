import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectDarkMode, setDarkMode, toggleDarkMode } from './ThemeSlice';

import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import './ThemeSwitch.css';

export default function ThemeSwitch(props) {
    const dispatch = useDispatch();
    const darkMode = useSelector(selectDarkMode);

    useEffect(() => {
        dispatch(setDarkMode());
    }, [dispatch]);

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    }

    return (
        <Button className='ThemeSwitch' onClick={handleToggleDarkMode} outline>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </Button>
    )
}
