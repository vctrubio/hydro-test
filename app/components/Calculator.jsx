import React from 'react';
import '../css/Calculator.css'


const PuntoDeAhorro = () => {
    return (
        <flex style={{marginTop: '4em', gap: '4em'}}>
            <div>
                Label left
            </div>
            <div style={{ width: '350px' }}>
                <h2>Punto de amortización</h2>
                <div>
                    El punto de amortización nos indica un calculo aproximado del tiempo que se tardaría en recuperar la inversión de transitar a Warme, y viene dado por el número de asientos calefactables y la eficiencia energética de cada establecimiento
                </div>
            </div>
        </flex>
    )
}
const CalculatorQuestion = ({ question, min, max, value, setValue, desc }) => {
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
                <div className='slider-target'>{value} {desc}</div>
            </div>
        </div>
    );
};

const BarContainer = ({ title, a, b, footer }) => {
    return (
        <div className='bar-container'>
            <div className='bar-title'>{title}</div>
            <div className='bar-2chart'>
                <div className='d-flex flex-column align-end'>
                    <div className='bar-outline' style={{
                        width: '100px', /* Default size */
                        height: `${a.height}px`, /* Set height based on value */
                        backgroundColor: a.backgroundColor, /* Green color */
                        paddingTop: '5px'
                    }}>{a.height}€</div>
                    <div className='bar-label'>{a.label}</div>
                </div>
                <div>
                    <div className='bar-outline' style={{
                        width: '100px', /* Default size */
                        height: `${b.height}px`, /* Set height based on value */
                        backgroundColor: b.backgroundColor, /* Green color */
                        paddingTop: '5px'
                    }}>{b.height}€</div>
                    <div className='bar-label'>{b.label}</div>
                </div>
            </div>
            <div className='bar-footer'>{footer}</div>
        </div>
    );
}
export const Calculator = () => {
    const [questions, setQuestions] = React.useState([
        { text: 'Cuantas estufas tienes', min: 1, max: 10, value: 4, desc: '', step: 1 },
        { text: 'Cada cuanto cambias la bombona', min: 1, max: 30, value: 3, desc: 'semanas', step: 1 },
        { text: 'Cuanto pagas por la luz', min: 1, max: 500, value: 1, desc: '€/mes', step: 10 },
        { text: 'Cuanto pagarias por la luz', min: 1, max: 500, value: 1, desc: '€/mes', step: 10 },
    ]);


    const handleValueChange = (index, newValue) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[index].value = newValue;
            return newQuestions;
        });
    };

    const a = {
        height: 50,
        backgroundColor: '#3B5463',
        label: 'Warme',
    };

    const b = {
        height: 90,
        backgroundColor: '#B8ADAD',
        label: 'Tradicional',
    };

    const c = {
        height: 120,
        backgroundColor: '#3B5463',
        label: 'Warme',
    };

    const d = {
        height: 80,
        backgroundColor: '#B8ADAD',
        label: 'Tradicional',
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
                            desc={question.desc}
                            setValue={newValue => handleValueChange(index, newValue)}
                        />
                    ))}
                    <p style={{ textAlign: 'left' }}>*Los cálculos se basan en lámparas de calor de 1,5 kWh,<br />
                        quemadores de gas de 12 kWh y un precio de la energía de 3€ por kWh.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40, margin: '0 4em 0 4em' }}>
                    <BarContainer title='COMPARATIVA - PRECIO' a={b} b={a} footer={'+21500€ ahorrados (1año)'} />
                    <BarContainer title='COMPARATIVA - EMISSIONES' a={d} b={c} footer={'+20€ ahorrados (1año)'} />
                </div>
            </flex>
            <PuntoDeAhorro />
        </div>
    )
}