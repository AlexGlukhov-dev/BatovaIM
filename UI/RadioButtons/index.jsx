import React from "react";
import { Field } from "formik";

import classes from './radioButtons.module.scss';
import cn from "classnames";

const Radio = (props) => {
	const { name, options, className, ...rest } = props;

	return (
		<div className={cn(classes["form-control"], className)}>
			<Field name={name} {...rest}>
				{({ field }) => {
					return options.map((option) => {
						return (
							<div className={classes["radio-btn-group"]} key={option.key}>
								<label htmlFor={option.value}>
								<input
									type="radio"
									id={option.value}
									{...field}
									value={option.value}
									checked={field.value === option.value}
								/>
									<span className={classes["checkmark"]}/>
									<span>{option.key}</span></label>
							</div>
						);
					});
				}}
			</Field>
		</div>
	);
};

export default Radio;
