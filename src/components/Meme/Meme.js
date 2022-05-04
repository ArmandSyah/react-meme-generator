import React, { useState, useEffect } from "react"

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: 'One does not simply',
        bottomText: 'Walk into Mordor',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    });
    
    const [allMemes, setAllMemes] = useState([]);
    
    const handleClick = () => {
        const randomIndex = Math.floor(Math.random()*allMemes.length);
        const randomMeme = allMemes[randomIndex];
        setMeme(prevMeme => { 
            return { ...prevMeme, randomImage: randomMeme.url }
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        });
    }

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(data => {
                setAllMemes(data.data.memes) 
            });
    }, [])

    return (
        <main>
            <div data-testid="form" className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.topText}
                />
                <button
                    data-testid="meme-button"
                    onClick={handleClick} 
                    className="form--button"
                >
                    Get a new meme image 🖼
                </button>
                
            </div>
            <div className="meme">
                <img 
                    src={meme.randomImage} 
                    className="meme--image"
                    data-testid="meme--image"
                />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}