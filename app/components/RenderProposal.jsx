import React, { useState, useEffect } from 'react';
import '../css/Render.css'

async function fetchJsonFile() {
    try {
        const response = await fetch('/PillowTelaConfig.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: no encuentro: /PillowTelaConfig.json', error);
    }
}

const RenderMenu = ({ data, uiPillo, setUiPillo }) => {
    const [selectedTela, setSelectedTela] = useState(Object.keys(data)[0]);
    const [selectedColor, setSelectedColor] = useState(Object.values(data)[0][0]); // Initialize with the first color of the first tela
    const [selectedType, setSelectedType] = useState('single'); // Initialize with 'single'
    const [telaDropdownVisible, setTelaDropdownVisible] = useState(false);
    const [colorDropdownVisible, setColorDropdownVisible] = useState(false);
    const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);

    const handleColorClick = (key, value) => {
        setUiPillo(prevState => ({ ...prevState, [key]: value }));
        setSelectedColor(value);
        setColorDropdownVisible(false);
    }

    const handleTelaClick = (key) => {
        setSelectedTela(key);
        setTelaDropdownVisible(false);
    }

    const handleTypeClick = (type) => {
        setSelectedType(type);
        setUiPillo(prevState => ({ ...prevState, type }));
        setTypeDropdownVisible(false);
    }

    return (
        <div className='d-flex flex-column'>
            <div className='render-dropdown'>
                <div className='render-select' onClick={() => setTypeDropdownVisible(!typeDropdownVisible)}>
                    Select type {selectedType}
                </div>
                {typeDropdownVisible && (
                    <div className='render-dropdown-content'>
                        {['single', 'double', 'triple'].map((type) => (
                            <div key={type} onClick={() => handleTypeClick(type)}>
                                {type}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='render-dropdown'>
                <div className='render-select' onClick={() => setTelaDropdownVisible(!telaDropdownVisible)}>
                    Select tela {selectedTela}
                </div>
                {telaDropdownVisible && (
                    <div className='render-dropdown-content'>
                        {Object.keys(data).map((key) => (
                            <div key={key} onClick={() => handleTelaClick(key)}>
                                {key}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='render-dropdown'>
                <div className='render-select' onClick={() => setColorDropdownVisible(!colorDropdownVisible)}>
                    Select color {selectedColor}
                </div>
                {colorDropdownVisible && (
                    <div className='render-dropdown-content'>
                        {data[selectedTela].map((color, index) => (
                            <div key={index} onClick={() => handleColorClick(selectedTela, color)}>
                                {color}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

const RenderWrapper = ({ data }) => {
    const [uiPillo, setUiPillo] = useState(data.DEFAULT);

    const sortDataValues = (data) => {
        delete data.DEFAULT; //  to pass to RenderMenu we don't want this option
        let sortedData = {};
        Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
                // sortedData[key] = [...data[key]].sort(); // ASC
                sortedData[key] = [...data[key]].sort((a, b) => b - a); //DESC
            } else {
                sortedData[key] = data[key];
            }
        });
        return sortedData;
    }

    return (
        <div className='render-container'>
            <div>Tela : {Object.keys(uiPillo)[0]} <br /> Color: {Object.values(uiPillo)[0]}</div>
            <RenderMenu data={sortDataValues(data)} uiPillo={uiPillo} setUiPillo={setUiPillo} />
        </div>
    )
}

const Fabric = ({ data }) => {

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Fabric Component</h1>
            <div className='d-flex flex-column'>
                {Object.entries(data).map(([key, value]) => {
                    return (
                        <div className='render-row' key={key}>
                            {key}
                            {Object.entries(value).map(([subKey, subValue]) => {
                                return (
                                    <div className='render-hover' style={{ backgroundImage: `url(/telas/${subValue}.jpg)` }} key={subKey}>
                                        {/* {JSON.stringify(subValue)} */}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

const HowDoesItWork = () => {
    return (
        <div>
            <h1>How Does It Work Component</h1>
            <p>This is the How Does It Work component.</p>
        </div>
    );
}

const Specifications = () => {
    return (
        <div>
            <h1>Specifications Component</h1>
            <p>This is the Specifications component.</p>
        </div>
    );
}

const RenderBar = ({ data }) => {
    const TitleEnum = Object.freeze({
        A: 'Fabric',
        B: 'How does it Work?',
        C: 'Specifications'
    });

    const componentMap = {
        [TitleEnum.A]: <Fabric data={data} />,
        [TitleEnum.B]: <HowDoesItWork />,
        [TitleEnum.C]: <Specifications />
    };

    const [title, setTitle] = useState(TitleEnum.A);
    const handleClick = (newTitle) => {
        setTitle(newTitle);
    }

    return (
        <div className='render-bar'>
            <div className='render-navbar'>
                <div
                    onClick={() => handleClick(TitleEnum.A)}
                    className={title === TitleEnum.A ? 'active' : ''}
                >
                    {TitleEnum.A}
                </div>
                <div
                    onClick={() => handleClick(TitleEnum.B)}
                    className={title === TitleEnum.B ? 'active' : ''}
                >
                    {TitleEnum.B}
                </div>
                <div
                    onClick={() => handleClick(TitleEnum.C)}
                    className={title === TitleEnum.C ? 'active' : ''}
                >
                    {TitleEnum.C}
                </div>
            </div>
            <div>{componentMap[title]}</div>
        </div>
    )
}

export const RenderProposal = () => {
    const [pillowDataConfig, setPillowDataConfig] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchJsonFile();
            setPillowDataConfig(result);
        };
        fetchData();
    }, []);

    if (!pillowDataConfig) {
        return <div>Loading... ... ...</div>;
    }

    return (
        <>
            <RenderWrapper data={pillowDataConfig} />;
            <RenderBar data={pillowDataConfig} />
        </>
    )
}