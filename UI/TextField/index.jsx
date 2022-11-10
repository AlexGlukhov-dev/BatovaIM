import classes from './textField.module.scss';
import cn from "classnames";

const TextField = ({name, value, onChange, classname, ...props}) => {

	return (
			<input
				className={cn(classes["textField"], classname)}
				name={name}
				value={value}
				onChange={onChange}
				{...props}
			/>
	)
};

export default TextField;