import classes from './textArea.module.scss';
import cn from "classnames";

const TextArea = ({name, value, onChange, classname, ...props}) => {

return (
	<textarea
	name={name}
	value={value}
	onChange={onChange}
	className={cn(classes["textArea"], classname)}
	{...props}
	/>
)
};

export default TextArea;