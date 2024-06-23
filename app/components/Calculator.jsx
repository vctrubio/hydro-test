import React from 'react';
import '../css/Calculator.css'
import { calculateCost, calculateHuellaCo2 } from './CalculatorCalculate'
import { CalculatorChart } from './CalculatorChart'

const PuntoDeAhorro = ({ data }) => {
    return (
        <div style={{ maxWidth: '989px', alignItems: 'center', marginTop: '5em' }}>
            <flex className='punto-ahorro'>
                <div>
                    <h1 >El punto de amortización</h1>
                    <div style={{ lineHeight: '1.8rem' }}>
                        El punto de amortización nos indica un calculo aproximado del tiempo que se tardaría en recuperar la inversión de transitar a Warme, y viene dado por el número de asientos calefactables y la eficiencia energética de cada establecimiento.
                    </div>
                </div>
                <CalculatorChart data={data} />
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

const BarContainer = ({ title, a, b, footer, flag }) => {
    // bar-container-height = 400px
    const max = flag === 'huela' ? 18000 : 5600;
    const unit = max / 300;
    const aHeightPx = Math.round(a.height / unit * 10);
    const bHeightPx = Math.round(b.height / unit);

    return (
        <div className='bar-container'>
            <div className='bar-title' style={{ fontWeight: 'bold' }}>{title}</div>
            <div className='bar-2chart'>
                <div className='d-flex flex-column align-end'>
                    <div className='bar-content' style={{
                        height: `${aHeightPx}px`,
                        backgroundColor: a.backgroundColor
                    }} />
                    <div className='bar-label'>
                        <div>
                            {a.label}
                        </div>
                        <div>
                        </div>
                        {Math.round(a.height)}€
                    </div>
                </div>
                <div>
                    <div className='bar-content' style={{
                        height: `${bHeightPx}px`, /* Set height based on value */
                        backgroundColor: b.backgroundColor, /* Green color */
                    }} />
                    <div className='bar-label'>
                        <div>
                            {b.label}
                        </div>
                        <div>
                            {Math.round(b.height)}€
                        </div>
                    </div>
                </div>
            </div>
            <div className='bar-footer'>
                {flag === 'huela' ? `${Math.round(a.height - b.height)}` : `+${Math.round(b.height - a.height)}`} {footer}
            </div>
        </div>
    );
}
export const Calculator = () => {
    const [questions, setQuestions] = React.useState([
        { text: 'Cuantas estufas tienes', min: 1, max: 20, value: 12, desc: '', step: 1 },
        { text: 'Cuantas estufas electricas tienes', min: 0, max: 20, value: 8, desc: '', step: 10 },
        { text: 'Cuantas sillas tienes en la terraza', min: 1, max: 100, value: 80, desc: '', step: 1 },
        { text: 'Cuantas horas al dia abres la terraza', min: 4, max: 12, value: 10, desc: '', step: 1 },
    ]);


    const handleValueChange = (index, newValue) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[index].value = newValue;
            return newQuestions;
        });
    };

    const dataLineChart = questions[2].value * 120;
    
    const tradicionalA = {
        height: calculateHuellaCo2(questions, "tradicional"),
        backgroundColor: '#3B5463',
        label: 'Tradicional',
    };

    const warmeA = {
        height: calculateHuellaCo2(questions, "warme"),
        backgroundColor: '#B8ADAD',
        label: 'Warme',
    };

    const tradicionalB = {
        height: calculateCost(questions, "tradicional"),
        backgroundColor: '#3B5463',
        label: 'Tradiconal',
    };

    const warmeB = {
        height: calculateCost(questions, "warme"),
        backgroundColor: '#B8ADAD',
        label: 'Warme',
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
                <BarContainer title='Huela Co2' a={warmeA} b={tradicionalA} footer={'KG/Co2 (mes)'} flag="huela" />
                <BarContainer title='Gastos Economicos' a={warmeB} b={tradicionalB} footer={'€ (mes)'} flag="gastos" />
            </div>
            <PuntoDeAhorro data={dataLineChart} />

        </div>
    )
}