import cn from "classnames";
import classes from './blockTitle.module.scss';

const BlockTitle = ({children, className}) => {
    return (
        <h3 className={cn(classes["title"], className) }>
            {children}
        </h3>
    );
};

export default BlockTitle;