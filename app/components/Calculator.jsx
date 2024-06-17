import React from 'react';
import '../css/Calculator.css'

const PuntoDeAhorro = () => {
    return (
        <div style={{ maxWidth: '989px', alignItems: 'center', marginTop: '5em' }}>
            <flex className='punto-ahorro'>
                <div>
                    <h1 >El punto de amortización</h1>
                    <div style={{ lineHeight: '1.8rem' }}>
                        El punto de amortización nos indica un calculo aproximado del tiempo que se tardaría en recuperar la inversión de transitar a Warme, y viene dado por el número de asientos calefactables y la eficiencia energética de cada establecimiento.
                    </div>
                </div>
                <div className='punto-ahorro-graph'>
                </div>
            </flex>

            <div className='punto-g'>
                <div className='p-4'>
                    <h5 className='mb-3'>¿Te gustaría saber exactamente cuánto podrías ahorrar con Warme?</h5>
                    <p>Déjanos tu mail y te haremos un estudio exhaustivo personalizado</p>
                    <div className='d-flex flex-row justify-content-center mt-1' style={{ gap: '1em' }}>
                        <input type='text' placeholder='email' />
                        <button style={{ width: '200px', fontWeight: 'lighter' }}>Pedir estudio</button>
                    </div>
                </div>
                <div className='punto-g-banner'>
                </div>
            </div>
        </div>
    )
}
const CalculatorQuestion = ({ question, min, max, value, setValue, desc }) => {
    const handleSliderChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className='calculator-question'>
            <div className='calculator-qq'>¿{question}?</div>
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
            <div className='bar-title' style={{ fontWeight: 'bold' }}>{title}</div>
            <div className='bar-2chart'>
                <div className='d-flex flex-column align-end'>
                    <div className='bar-content' style={{
                        height: `${a.height}px`,
                        backgroundColor: a.backgroundColor
                    }}>{a.height}€</div>
                    <div className='bar-label'>{a.label}</div>
                </div>
                <div>
                    <div className='bar-content' style={{
                        height: `${b.height}px`, /* Set height based on value */
                        backgroundColor: b.backgroundColor, /* Green color */
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
            <div className='calculator-mb'>
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
                    </div>
                </flex>
                <div className='calculator-footer'>
                    *Los cálculos se basan en lámparas de calor de 1,5 kWh,<br />
                    quemadores de gas de 12 kWh y un precio de la <br />energía de 3€ por kWh.
                </div>
            </div>
            <div className='bar-container-head'>
                <BarContainer title='COMPARATIVA - PRECIO' a={b} b={a} footer={'- 58300 Kg/CO2 e (1año)'} />
                <BarContainer title='COMPARATIVA - EMISSIONES' a={d} b={c} footer={'+ 23000€ ahorrados (1año)'} />
            </div>
            <PuntoDeAhorro />
        </div>
    )
}