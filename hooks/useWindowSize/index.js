import React, {useState, useEffect} from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect( () => {
        if (typeof window !== 'undefined') {
            const resizeHandler = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                })
            }

            window.addEventListener('resize', resizeHandler)

            return () => window.removeEventListener('resize', resizeHandler)
        }
    }, [] )

    return windowSize;
};

export {useWindowSize};


