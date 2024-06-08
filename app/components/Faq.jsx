import React, { useState } from 'react';
import '../css/Faq.css';

function Faq() {
    const [shownIndex, setShownIndex] = useState(-1);

    const handleClick = (index) => {
        setShownIndex(shownIndex === index ? -1 : index);
    };

    const faqItems = [
        { question: '¿Lorem ipsum dolor sit amet, consectetur  elit? 1', answer: 'Answer uno: ¿Lorem ipsum dolor sit amet, consectetur adipiscing elit?' },
        { question: '¿ consectetur adipiscing elit? 2', answer: 'Answer dos: ¿Lorem ipsum dolor sit amet, consectetur adipiscing elit?' },
        { question: '¿Lorem ipsum dolor sit amet, consectetur adipiscing elit? 3', answer: 'Answer tres: ¿Lorem ipsum dolor sit amet, consectetur adipiscing elit?  ' },
    ];

    return (
        <div className="faq">
            <h1>Preguntas Frecuentes (FAQ)</h1>
            <div>
                {faqItems.map((item, index) => (
                    <div key={index} style={{borderBottom: '1px solid black'}}>
                        <div className="faq-question" onClick={() => handleClick(index)}>
                            {item.question}
                            <div style={{marginLeft: '1em'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </div>
                        </div>
                        <div className={`faq-item ${shownIndex === index ? 'show' : ''}`}>{item.answer}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Faq;