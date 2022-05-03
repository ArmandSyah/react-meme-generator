import React from "react";
import { render, cleanup } from "@testing-library/react";

import Header from './Header';

afterEach(cleanup);

it('renders properly', async () => {
    const { getByText } = render(<Header />);

    const memeGeneratorElement = getByText('Meme Generator');

    expect(memeGeneratorElement).toBeVisible();
    expect(memeGeneratorElement).toBeInTheDocument();
    expect(memeGeneratorElement).toHaveClass("header--title");
});

it('renders', async () => {
    const { asFragment } = render(<Header />)
    expect(asFragment()).toMatchSnapshot();
});