import {useRef} from "react";
import cn from "classnames";
import classes from "./crumb.module.scss";

const Crumb = ({src, page, currentPage}) => {
    const target = useRef(null);
    const checkHref = currentPage === src;

    if(checkHref && target.current) {
        target.current.removeAttribute("href")
    }

    return (
        <a href={src} className={cn(classes["crumb"], currentPage === "/about" && classes["about-color"])} ref={target}>
            {
                src === '/'
                ?
                <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.30303 9.39958V6.39748H6.69431V9.39958C6.69431 9.72981 6.96333 10 7.29214 10H9.0856C9.4144 10 9.68342 9.72981 9.68342 9.39958V5.19664H10.6997C10.9747 5.19664 11.1062 4.8544 10.897 4.67427L5.89921 0.153107C5.67204 -0.0510357 5.3253 -0.0510357 5.09813 0.153107L0.100345 4.67427C-0.102914 4.8544 0.0226287 5.19664 0.297626 5.19664H1.31392V9.39958C1.31392 9.72981 1.58294 10 1.91174 10H3.70521C4.03401 10 4.30303 9.72981 4.30303 9.39958Z" fillOpacity="0.4"/>
                </svg>
                :
                <span className={classes["crumb-name"]}>
                    {page}
                </span>
            }
        </a>
    );
};

export default Crumb;