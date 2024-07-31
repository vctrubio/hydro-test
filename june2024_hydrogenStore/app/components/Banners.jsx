import { useEffect, useState } from 'react';
import logo from '../assets/favicon.svg';
import '../css/Banner.css'

export const BannerPhoto = () => {
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [loading, setLoading] = useState(true);

    const hour = new Date().getHours();

    useEffect(() => {
        let imageSrc;

        if (hour >= 6 && hour < 12) {
            imageSrc = "/backgroundBanner/A.jpg";
        } else if (hour >= 12 && hour < 18) {
            imageSrc = "/backgroundBanner/B.jpg";
        } else {
            imageSrc = "/backgroundBanner/C.jpg";
        }

        setBackgroundImage(imageSrc);
        setLoading(false);
    }, [hour]);

    if (loading) {
        return <div>Loading...</div>; // or return null, or a loading spinner, etc.
    }

    if (!backgroundImage) {
        throw new Error("Background image not found");
    }

    return (
        <div className='banner-photo' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>¿Eres Friolero?</h1>
            <h1>Descrubre Warme!</h1>
        </div>
    )
}

export const BannerDesc = () => {
    return (
        <div>
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
            <flex className='banner-cartoon'>
                <div className='margin-up-down'>
                    <div className="icon-text">
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
            </flex>
        </div>
    )
}