import React, { useState } from "react"
import memesData from "../../data/memesData"

export default function Meme() {
    const memes = memesData['data']['memes']

    const [memeImage, setMemeImage] = useState('');
    
    const handleClick = () => {
        const randomIndex = Math.floor(Math.random()*memes.length);
        const randomMeme = memes[randomIndex];
        
        setMemeImage(randomMeme.url);

        console.log(randomMeme.url)
    }

    return (
        <main>
            <div data-testid="form" className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                />
                <button
                    data-testid="meme-button"
                    onClick={handleClick} 
                    className="form--button"
                >
                    Get a new meme image 🖼
                </button>
                
            </div>
            <img src={memeImage} className="meme--image"/>
        </main>
    )
}