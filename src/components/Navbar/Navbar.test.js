import React from "react";
import { screen, render } from '@testing-library/react';
import Navbar from './Navbar'

describe('Navbar component testing', () => {
    test('Navbar will render and contains the name "Reddit-Client"', () => {
        render(<Navbar />);
        // Navbar has rendered and is identifiable by navigation role
        const navbar = screen.getByRole('navigation');
        expect(navbar).toBeInTheDocument();
        // "Reddit Client" is on the page
        const appName = screen.getByText('Reddit-Client');
        expect(appName).toBeInTheDocument();
    })
})