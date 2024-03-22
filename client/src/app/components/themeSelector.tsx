

import React, { useEffect, useState } from 'react';


const App: React.FC = () => {
    const initialTextColor = localStorage.getItem('textColor') || '#000';
    const initialTextDark = localStorage.getItem('textDark') || '#000';
    const initialHeading = localStorage.getItem('heading') || '#254035';
    const initialLightBg = localStorage.getItem('light-bg') || '#EFF6F3';
    const initialColorOne = localStorage.getItem('color-one') || '#244034';
    const initialColortwo = localStorage.getItem('color-two') || '#D2F34C';
    const initialColorthree = localStorage.getItem('color-three') || '#00BF58';
    const initialColorfour = localStorage.getItem('color-four') || '#005025';
    const initialColorfive = localStorage.getItem('color-five') || '#31795A';

    const [textColor, setTextColor] = useState(initialTextColor); // default color
    const [textDark, setTextDark] = useState(initialTextDark);
    const [heading, setHeading] = useState(initialHeading);
    const [lightBg, setLightBg] = useState(initialLightBg);
    const [colorOne, setColorOne] = useState(initialColorOne);
    const [colortwo, setColortwo] = useState(initialColortwo);
    const [colorthree, setColorthree] = useState(initialColorthree);
    const [colorfour, setColorfour] = useState(initialColorfour);
    const [colorfive, setColorfive] = useState(initialColorfive);
    //   const [headingColor, setHeadingColor] = useState('#00ff00'); // default color

    const [showModelProperties, setShowModelProperties] = useState(false);

    const handleClick = () => {
        setShowModelProperties(true); // Toggle the visibility
    };
    const handleClose = () => {
        setShowModelProperties(false); // Toggle the visibility
    };

    useEffect(() => {
        const root = document.documentElement;

        // Update CSS custom properties based on user input
        root.style.setProperty('--text-color', textColor);
        root.style.setProperty('--text-dark', textDark);
        root.style.setProperty('--heading', heading);
        root.style.setProperty('--light-bg', lightBg);
        root.style.setProperty('--color-one', colorOne);
        root.style.setProperty('--color-two', colortwo);
        root.style.setProperty('--color-three', colorthree);
        root.style.setProperty('--color-four', colorfour);
        root.style.setProperty('--color-five', colorfive);
        // root.style.setProperty('--heading', headingColor);
    }, [textColor, textDark, heading, lightBg, colorOne, colortwo, colorthree, colorfour, colorfive]);

    const saveColors = () => {
        // Save selected colors to local storage
        localStorage.setItem('textColor', textColor);
        localStorage.setItem('textDark', textDark);
        localStorage.setItem('heading', heading);
        localStorage.setItem('light-bg', lightBg);
        localStorage.setItem('color-one', colorOne);
        localStorage.setItem('color-two', colortwo);
        localStorage.setItem('color-three', colorthree);
        localStorage.setItem('color-four', colorfour);
        localStorage.setItem('color-five', colorfive);
        // localStorage.setItem('headingColor', headingColor);
        setShowModelProperties(false);
    };

    const resetColors = () => {
        // Reset colors to their initial values
        setTextColor(initialTextColor);
        setTextDark(initialTextDark);
        setHeading(initialHeading);
        setLightBg(initialLightBg);
        setColorOne(initialColorOne);
        setColortwo(initialColortwo);
        setColorthree(initialColorthree);
        setColorfour(initialColorfour);
        setColorfive(initialColorfive);

        // Save reset colors to local storage
        localStorage.setItem('textColor', initialTextColor);
        localStorage.setItem('textDark', initialTextDark);
        localStorage.setItem('heading', initialHeading);
        localStorage.setItem('light-bg', initialLightBg);
        localStorage.setItem('color-one', initialColorOne);
        localStorage.setItem('color-two', initialColortwo);
        localStorage.setItem('color-three', initialColorthree);
        localStorage.setItem('color-four', initialColorfour);
        localStorage.setItem('color-five', initialColorfive);

        setShowModelProperties(false);
    };

    return (
        <div>
           
                

                    <button className="dash-btn-two tran3s me-3 rounded-3  "
                        onClick={handleClick}
                        data-bs-toggle="modal"
                        data-bs-target="#ThemeModel"
                        type="button"
                    >
                        Theme Settings
                    </button>
              
           

            <div className="modal fade" id="ThemeModel" tabIndex={-1} aria-labelledby="smtpModelLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen modal-dialog-centered">
                    <div className="user-data-form modal-content">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        <div className="container subscription-model">
                            <h2 className="fs-2 text-center mb-3">Theme</h2>
                            {showModelProperties &&
                                <div>
                                    <div className='row mt-3'>
                                        <div className='d-flex col '>
                                            <label className='d-flex'>
                                                Text Color:
                                                <input
                                                    type="color"
                                                    value={textColor}
                                                    onChange={(e) => setTextColor(e.target.value)}
                                                    className='d-flex'
                                                />
                                            </label>
                                            <br />
                                        </div>
                                        <div className='d-flex col'>
                                            <label className='d-flex'>
                                                Text Dark:
                                                <input
                                                    type="color"
                                                    value={textDark}
                                                    onChange={(e) => setTextDark(e.target.value)}
                                                    className='d-flex'
                                                />
                                            </label>

                                            <br />
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='d-flex col'>
                                            <label className='d-flex'>
                                                heading :
                                                <input
                                                    type="color"
                                                    value={heading}
                                                    onChange={(e) => setHeading(e.target.value)}
                                                    className='d-flex'
                                                />
                                            </label>

                                            <br />
                                        </div>
                                        <div className='d-flex col'>
                                            <label className='d-flex'>
                                                light-bg:
                                                <input
                                                    type="color"
                                                    value={lightBg}
                                                    onChange={(e) => setLightBg(e.target.value)}
                                                    className='d-flex'
                                                />
                                            </label>

                                            <br />
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='d-flex col'>
                                            <label className='d-flex'>
                                                Color-one:
                                                <input
                                                    type="color"
                                                    value={colorOne}
                                                    onChange={(e) => setColorOne(e.target.value)}
                                                    className='d-flex'
                                                />
                                            </label>

                                            <br />
                                        </div>
                                        <div className='d-flex col'>
                                            <label className='d-flex'>
                                                Color-two:
                                                <input
                                                    type="color"
                                                    value={colortwo}
                                                    onChange={(e) => setColortwo(e.target.value)}
                                                    className='d-flex'
                                                />
                                            </label>

                                            <br />
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='d-flex col'>
                                            <label className='d-flex'>
                                                Color-three:
                                                <input
                                                    type="color"
                                                    value={colorthree}
                                                    onChange={(e) => setColorthree(e.target.value)}
                                                    className='d-flex'
                                                />
                                            </label>

                                            <br />
                                        </div>
                                        <div className='d-flex col'>
                                            <label className='d-flex'>
                                                Color-four:
                                                <input
                                                    type="color"
                                                    value={colorfour}
                                                    onChange={(e) => setColorfour(e.target.value)}
                                                    className='d-flex'
                                                />
                                            </label>

                                            <br />
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='d-flex col'>
                                            <label className='d-flex'>
                                                Color-five:
                                                <input
                                                    type="color"
                                                    value={colorfive}
                                                    onChange={(e) => setColorfive(e.target.value)}
                                                    className='d-flex'
                                                />
                                            </label>

                                            <br />
                                        </div>
                                    </div>
                                    <div className='mt-3 d-flex'>

                                        <button
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            className='dash-btn-two tran3s me-3 rounded-3' onClick={saveColors}>Save Colors</button>
                                        <button
                                            data-bs-dismiss="modal"
                                            aria-label="Close" className='dash-btn-two tran3s rounded-3' onClick={resetColors}>Reset Colors</button>
                                    </div>
                                </div>


                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App
