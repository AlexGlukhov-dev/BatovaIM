import {useEffect} from 'react';
import cn from 'classnames';

import classes from './modal.module.scss';

const Modal = ({onClick = false, active, setActive, className = '', children}) => {

  useEffect(()=> {
    const body = document.body;
    const header = document.getElementById('header');
    // const paddingOffset = window.innerWidth - body.offsetWidth;

    body.style.overflow = `${active ? 'hidden' : 'auto' }`;
    body.style.paddingRight = `${active ? '17px' : 0 }`;
    header.style.paddingRight = `${active ? '17px' : 0 }`;
  }, [active]);


  return (
        <div className={cn(classes["modal"], active && classes["active"] )} onClick={onClick ? onClick : () => setActive()}>
            <div className={cn(classes["modal__content"], className, active && classes["active"])} onClick={e => e.stopPropagation()}>
              <button className={classes["modal__closeBtn"]} onClick={onClick ? onClick : () => setActive()}>
                <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9.90039" y="31.1128" width="30" height="1" transform="rotate(-45 9.90039 31.1128)" fill="black"/>
                  <rect x="11.3145" y="9.89966" width="30" height="0.999999" transform="rotate(45 11.3145 9.89966)" fill="black"/>
                </svg>
              </button>
              {children}
            </div>
        </div>
    );
};

export default Modal;