import classes from "./sectionTitle.module.scss";
import cn from "classnames";

const SectionTitle = ({variant = 'h1', children, light, className}) => {
    const Tag = variant === 'h1' ? 'h1' : 'h2';
    return (
        <Tag className={cn(classes["title"], className, light && classes['title-light'])}>
            {children}
        </Tag>
    );
};

export default SectionTitle;