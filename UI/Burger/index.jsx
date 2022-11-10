import {useEffect, useState} from 'react';
import cn from 'classnames';

import classes from './burger.module.scss';

const Burger = ({ setActive, active}) => {
    const [toggle, setToggle] = useState(false);
    const clickHandler = () => {
        setActive(prev => !prev);
        setToggle(prev => !prev);
    }

    useEffect(()=> {
        toggle ?  document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible';
        active ? setToggle(true) :  setToggle(false)
    }, [active, toggle])

    return (
        <button onClick={clickHandler} className={cn(classes["burger"], classes[toggle && "burger--active"])}>
            <div className={classes["burger__line"]}/>
        </button>
    );
};

export default Burger;