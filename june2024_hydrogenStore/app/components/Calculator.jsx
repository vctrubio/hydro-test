import React, { useEffect } from 'react';
import '../css/Calculator.css'
import { calculateCost, calculateHuellaCo2 } from './CalculatorCalculate'
import { CalculatorChart } from './CalculatorChart'

const PuntoDeAhorro = ({ data, ahorroMensual }) => {
    return (
        <div>
            <div className='punto-ahorro'>
                <CalculatorChart data={data} ahorroMensual={ahorroMensual} />
                <div style={{ marginTop: 10, lineHeight: '1.4rem' }}>
                    El punto de amortización nos indica un calculo aproximado del tiempo que se tardaría en recuperar la inversión de transitar a Warme, y viene dado por el número de asientos calefactables y la eficiencia energética de cada establecimiento.
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
            <div className='bar-title'>{title} </div>
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
                    <div style={{ opacity: 0.5, fontSize: '1.2em' }}>
                        (
                        {Math.round(b.height)}
                        {flag == 'huela' ?
                            ' € /año' :
                            ' kg C02 /año'
                        }
                        )
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
                    <div style={{ opacity: 0.5, fontSize: '1.2em' }}>
                        (
                        {Math.round(b.height)}
                        {flag == 'huela' ?
                            ' € /año' :
                            ' kg C02 /año'
                        }
                        )
                    </div>
                </div>

            </div>

            <div>
                <span className='d-flex flex-start' style={{ marginLeft: 6 }}>
                    <svg width="20px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z" fill="#000000" />
                    </svg>
                </span>
                <div className='bar-title-number'>
                    {flag === 'huela' ? `${Math.round(a.height - b.height)}` : `+${ahorroMensual}`} {footer}
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
                    <BarContainer title='COMPARATIVA - EMISIONES' a={warmeB} b={tradicionalB} footer={'Kg C02 emitidos /año'} flag="gastos" ahorroMensual={ahorroMensual} setAhorroMensual={setAhorroMensual} />
                    <BarContainer title='COMPARATIVA - PRECIO' a={warmeA} b={tradicionalA} footer={'€ ahorrados / año'} flag="huela" />
                    <PuntoDeAhorro data={dataLineChart} ahorroMensual={ahorroMensual} />
                    {/* to do is get the numbers in the right orger */}
                </div>



            </div>
            {/* <SaberMas /> */}

        </div>
    )
}