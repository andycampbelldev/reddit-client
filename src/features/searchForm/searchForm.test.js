import React from "react";
import { screen, render } from '@testing-library/react';
import SearchForm from './searchForm'

describe('SearchForm component testing', () => {
    test('SearchForm contains text input', () => {
        render(<SearchForm />);
        screen.debug();
        const input = screen.getByRole('searchbox');
        expect(input).toBeInTheDocument();
    })
    test('SearchForm contains submit button', () => {
        render(<SearchForm />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
    })
})