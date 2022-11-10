import Link from "next/link";
import {cleanPhoneNumber} from '../../../utils';

import classes from "./contactItem.module.scss";

const ContactItem = ({title, type = "tel", info}) => {
	// const href = type === 'email' ? `mailto:${info}` : `tel:${info}`;
	let href;

	switch (type) {
		case 'email':
			href = `mailto:${info}`;
			break;
		case 'whatsApp':
			href = `https://api.whatsapp.com/send/?phone=${cleanPhoneNumber(info)}`;
			break;
		default:
			href = `tel:+${cleanPhoneNumber(info)}`;
	}

	return (
		<div className={classes["contact-item"]}>
			<h3 className={classes["contact-item__title"]}>{title}</h3>
			<div className={classes["contact-item__info"]}><Link href={href}><a>{info}</a></Link></div>
		</div>
	)
};

export default ContactItem;