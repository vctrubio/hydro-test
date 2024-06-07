import React from 'react';
import '../css/Calculator.css'


const CalculatorQuestion = ({ question, min, max, value, setValue }) => {
    const handleSliderChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className='calculator-question'>
            <span style={{ fontSize: '1.4em', width: '100%' }}>¿{question}?</span>
            <div className='calculator-question-units'>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleSliderChange}
                    className="slider"
                />
                <div className='slider-target'>{value}</div>
            </div>
        </div>
    );
};

const BarContainer = ({ title, a, b }) => {
    return (
        <div className='bar-container'>
            <div className='bar-title'>{title}</div>
            <div className='bar-2chart'>
                <div className='d-flex flex-column align-end'>
                    <div className='bar-outline' style={{
                        width: '100px', /* Default size */
                        height: `${a}px`, /* Set height based on value */
                        backgroundColor: '#4CAF50', /* Green color */
                        paddingTop: '5px'
                    }}>{a}€</div>
                    <div className='bar-label'>Tradicional</div>
                </div>
                <div>
                    <div className='bar-outline' style={{
                        width: '100px', /* Default size */
                        height: `${b}px`, /* Set height based on value */
                        backgroundColor: '#4C2250', /* Green color */
                        paddingTop: '5px'
                    }}>{b}€</div>
                    <div className='bar-label'>Warme</div>
                </div>
            </div>
            <div className='bar-footer'>+21500€ ahorrados (1año)</div>
        </div>
    );
}

export const Calculator = () => {
    const [questions, setQuestions] = React.useState([
        { text: 'Cuantas estufas tienes', min: 1, max: 10, value: 1 },
        { text: 'Cada cuanto cambias la bombona', min: 1, max: 30, value: 1 },
        { text: 'Cuanto pagas por la luz', min: 1, max: 500, value: 1 },
        { text: 'Cuanto pagarias por la luz', min: 1, max: 500, value: 1 },
    ]);

    const handleValueChange = (index, newValue) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[index].value = newValue;
            return newQuestions;
        });
    };

    return (
        <div className='calculator'>
            <h1 style={{ marginBottom: '2em' }}>Calcula tu ahorro cambiándote a Warme</h1>
            <flex>
                <div className='calculator-qs'>
                    {questions.map((question, index) => (
                        <CalculatorQuestion
                            key={index}
                            question={question.text}
                            min={question.min}
                            max={question.max}
                            value={question.value}
                            setValue={newValue => handleValueChange(index, newValue)}
                        />
                    ))}
                    <p style={{ textAlign: 'left' }}>*Los cálculos se basan en lámparas de calor de 1,5 kWh,<br />
                        quemadores de gas de 12 kWh y un precio de la energía de 3€ por kWh.</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 40, margin: '0 4em 0 4em'}}>
                    <BarContainer title='COMPARATIVA - PRECIO' a={50} b={90} />
                    <BarContainer title='COMPARATIVA - EMISSIONES' a={120} b={80} />
                </div>
            </flex>
            <div className='calculator-chart'>
            </div>
        </div>
    )
}