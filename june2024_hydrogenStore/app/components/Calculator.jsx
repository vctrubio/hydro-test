import React, { useEffect } from 'react';
import '../css/Calculator.css'
import { calculateCost, calculateHuellaCo2 } from './CalculatorCalculate'
import { CalculatorChart } from './CalculatorChart'

const PuntoDeAhorro = ({ data, ahorroMensual }) => {
    return (
        <div style={{ maxWidth: '75vw', alignItems: 'center', marginTop: '0em' }}>
            <flex className='punto-ahorro'>
                <div>
                    <h1 >El punto de amortización</h1>
                    <div style={{ lineHeight: '1.8rem' }}>
                        El punto de amortización nos indica un calculo aproximado del tiempo que se tardaría en recuperar la inversión de transitar a Warme, y viene dado por el número de asientos calefactables y la eficiencia energética de cada establecimiento.
                    </div>
                </div>
                <CalculatorChart data={data} ahorroMensual={ahorroMensual} />
            </flex>
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

const SaberMas = () => {
    return (
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
    )
}

const BarContainer = ({ title, a, b, footer, flag, ahorroMensual, setAhorroMensual }) => {
    const max = flag === 'huela' ? 18000 : 5600;
    const unit = max / 200; //change this for the scale
    const aHeightPx = Math.round(a.height / unit * 10);
    const bHeightPx = Math.round(b.height / unit);

    useEffect(() => {
        if (setAhorroMensual) {
            setAhorroMensual(Math.round(b.height - a.height));
        }
    }, [a.height, b.height, setAhorroMensual, ahorroMensual]);

    return (
        <div className='bar-container'>
            <div className='bar-title'>{title}
            </div>

                <div className='bar-24chart'>
                    <div className='bar-content' style={{
                        width: `${bHeightPx}px`,
                        height: 40,
                        backgroundColor: b.backgroundColor,
                    }} />
                    <div className='bar-label'>
                        <div style={{ fontWeight: 'bold' }}>
                            {b.label}
                        </div>
                        <div>
                            {Math.round(b.height)}€
                        </div>
                    </div>
                </div>

                <div className='bar-24chart'>
                    <div className='bar-content' style={{
                        width: `${aHeightPx}px`,
                        height: 40,
                        backgroundColor: a.backgroundColor,
                    }} />
                    <div className='bar-label'>
                        <div style={{ fontWeight: 'bold' }}>
                            {a.label}
                        </div>
                        <div>
                            {Math.round(a.height)}€
                        </div>
                    </div>
                </div>

        </div>
    );
}
export const Calculator = () => {
    const [questions, setQuestions] = React.useState([
        { text: 'Cuantas estufas tienes', min: 1, max: 20, value: 12, desc: 'unidades', step: 1 },
        { text: 'Cuantas sillas tienes en la terraza', min: 1, max: 100, value: 80, desc: '€/mes', step: 1 },
        { text: 'Cuantas estufas electricas tienes', min: 0, max: 20, value: 8, desc: 'unidades', step: 10 },
        { text: 'Cuantas horas al dia abres la terraza', min: 4, max: 12, value: 10, desc: '€/mes', step: 1 },
    ]);
    const [ahorroMensual, setAhorroMensual] = React.useState(0);

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
        backgroundColor: '#FCEADC',
        label: 'Tradicional',
    };

    const warmeA = {
        height: calculateHuellaCo2(questions, "warme"),
        backgroundColor: '#F6FAE0',
        label: 'Warme',
    };

    const tradicionalB = {
        height: calculateCost(questions, "tradicional"),
        backgroundColor: '#FCEADC',
        label: 'Tradiconal',
    };

    const warmeB = {
        height: calculateCost(questions, "warme"),
        backgroundColor: '#F6FAE0',
        label: 'Warme',
    };

    return (
        <div className='calculator-container'>
            <h1 style={{ marginBottom: '.5em', textAlign: 'center' }}>Calcula tu ahorro <br />cambiándote a Warme</h1>
            <div className='calculator'>
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

                <div className='bar-container-head'>
                    <BarContainer title='COMPARATIVA - EMISIONES' a={warmeB} b={tradicionalB} footer={'€/mes'} flag="gastos" ahorroMensual={ahorroMensual} setAhorroMensual={setAhorroMensual} />
                    <BarContainer title='COMPARATIVA - PRECIO' a={warmeA} b={tradicionalA} footer={'KG/Co2/mes'} flag="huela" />
                </div>

            </div>
            {/* <div className='d-flex flex-column justify-content-center align-items-center'>
            <PuntoDeAhorro data={dataLineChart} ahorroMensual={ahorroMensual} />
            <SaberMas />
        </div> */}

        </div>
    )
}