import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import Meme from './Meme';

afterEach(cleanup);

it('renders properly', async () => {
    render(<Meme />)

    const formElement = screen.getByTestId("form");
    expect(formElement).toBeVisible();

    // Image should be empty at start
    const memeImage = screen.getByRole('img')
    expect(memeImage).toHaveAttribute('src', '')

    const buttonElement = screen.getByTestId("meme-button")
    expect(buttonElement).toHaveClass("form--button")
    
    fireEvent.click(buttonElement);
    expect(memeImage).toHaveAttribute('src', expect.stringMatching(/jpg|png/i));
});

it('renders', async () => {
    const { asFragment } = render(<Meme />)
    expect(asFragment()).toMatchSnapshot();
});