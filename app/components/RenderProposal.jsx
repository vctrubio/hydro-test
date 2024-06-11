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

const RenderMenu = ({ data, setUiPillo }) => {

    const handleClick = (key, value) => {
        setUiPillo({ [key]: value });
    }

    return (
        <div className='d-flex flex-column'>
            {Object.entries(data).map(([key, value]) => {
                return (
                    <div className='render-row' key={key}>
                        {key}
                        {Object.entries(value).map(([subKey, subValue]) => {
                            return (
                                <div className='render-hover' style={{ backgroundImage: `url(/telas/${subValue}.jpg)` }} key={subKey} onClick={() => handleClick(key, subValue)}>
                                    {JSON.stringify(subValue)}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
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
            <RenderMenu data={sortDataValues(data)} setUiPillo={setUiPillo} />
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

    return <RenderWrapper data={pillowDataConfig} />;
}