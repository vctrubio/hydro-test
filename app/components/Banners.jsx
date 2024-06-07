import logo from '../assets/favicon.svg';
import '../css/Banner.css'

export const BannerPhoto = () => {
    return (
        <div className='banner-photo'>
            <h1>¿Eres Friolero?</h1>
            <h1>Descrubre Warme!</h1>
        </div>
    )
}

export const BannerDesc = () => {
    return (
        <>
            <flex className='banner-desc'>
                <div className='banner-desc-photo'>
                </div>
                <div className='banner-desc-info'>
                    <h2>La solución más <br />eficiente y sostenible,<br />con un mayor confort </h2>
                    <p>
                        Warme es una revolucion para ofrecer un mejor servicio en tu negocio, con nuestra tecnología de bajo voltaje y alimentación externa, diseñada específicamente para el sector hostelero, garantizando una experiencia cálida y acogedora en cualquier situación climática.
                    </p>
                </div>
            </flex>
            <div className='banner-cartoon'>
                <div className='margin-up-down'>
                    <div className="icon-text" style={{marginRight: '25px'}}>
                        <img src={logo} alt="Icon" />
                        Calor bajo demanda
                    </div>
                    <div className="icon-text">
                        <img src={logo} alt="Icon" />
                        Mayor eficiencia y confort
                    </div>
                    <div className="icon-text">
                        <img src={logo} alt="Icon" />
                        Menos emisiones de CO2
                    </div>
                    <div className="icon-text">
                        <img src={logo} alt="Icon" />
                        Ahorro de energía y dinero
                    </div>
                </div>
                <div className='banner-cartoon-photo'>
                </div>
            </div>
        </>
    )
}