import React from "react";
import { screen, render, cleanup, fireEvent, act } from "@testing-library/react";

import Meme from './Meme';
import memesData from '../../data/memesData';

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(memesData)
    })
});

afterEach(cleanup);

it('renders properly', async () => {
    await act(async () => {
        render(<Meme />)
    })

    const formElement = screen.getByTestId("form");
    expect(formElement).toBeVisible();

    // Image should have default image at start
    const memeImage = screen.getByRole('img')
    expect(memeImage).toHaveAttribute('src', 'http://i.imgflip.com/1bij.jpg')
});

it('renders new image after pressing button', async () => {
    await act(async () => {
        render(<Meme />)
    })
    
    const formElement = screen.getByTestId("form");
    expect(formElement).toBeVisible();

    // Image should have default image at start
    const memeImage = screen.getByRole('img')
    expect(memeImage).toHaveAttribute('src', 'http://i.imgflip.com/1bij.jpg')

    const buttonElement = screen.getByTestId("meme-button")
    expect(buttonElement).toHaveClass("form--button")
    
    await act(async () => {
        fireEvent.click(buttonElement);
    });
    expect(memeImage).not.toHaveAttribute('src', 'http://i.imgflip.com/1bij.jpg')
    expect(memeImage).toHaveAttribute('src', expect.stringMatching(/jpg|png/i));
});

it('renders text on the image', async () => {
    await act(async () => {
        render(<Meme />)
    })
    const topText = screen.getByText('One does not simply');
    const bottomText = screen.getByText('Walk into Mordor');

    expect(topText).toHaveClass("meme--text top")
    expect(bottomText).toHaveClass("meme--text bottom")

    // Changing the text
    const topTextBox = screen.getByPlaceholderText("Top text");
    const bottomTextBox = screen.getByPlaceholderText('Bottom text');

    const newTopText = 'This is'
    const newBottomText = 'poggers';

    await act(async () => {
        fireEvent.change(topTextBox, {target: {value: newTopText}});
    });

    await act(async () => {
        fireEvent.change(bottomTextBox, {target: {value: newBottomText}})
    });

    expect(topText).toHaveTextContent(newTopText);
    expect(bottomText).toHaveTextContent(newBottomText);
});

it('renders', async () => {
    let fragment;

    await act(async () => {
        const { asFragment } = render(<Meme />)
        fragment = asFragment
    })
    expect(fragment()).toMatchSnapshot();
});