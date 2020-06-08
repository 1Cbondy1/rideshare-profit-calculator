import React from 'react';
import Lottie from 'react-lottie'
import smallSedan from '../lotties/small-sedan.json'

class Animation extends React.Component {
    
    render() {
        const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: smallSedan,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
        };

        return(
            <div>
                <Lottie options={defaultOptions}
                    height={350}
                    width={350}
                />
            </div>
        )
    }
}

export default Animation;
