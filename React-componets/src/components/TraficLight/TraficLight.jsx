import React, { useEffect, useState } from 'react';
import './TraficLight.css';

const TraficLight = () => {
    const [lightColor, setLightColor] = useState('green');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLightColor(prevColor => {
                switch (prevColor) {
                    case 'green':
                        return 'yellow';
                    case 'yellow':
                        return 'red';
                    case 'red':
                        return 'green';
                    default:
                        return 'green';
                }
            });
        }, lightColor === 'green' ? 3000 : lightColor === 'yellow' ? 2000 : 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div className="traffic-light">
                <div className={`light ${lightColor === 'red' ? 'lit' : ''} red`}></div>
                <div className={`light ${lightColor === 'yellow' ? 'lit' : ''} yellow`}></div>
                <div className={`light ${lightColor === 'green' ? 'lit' : ''} green`}></div>
            </div>
            <div className='pole'></div>
        </div>
    );
};

export default TraficLight;
