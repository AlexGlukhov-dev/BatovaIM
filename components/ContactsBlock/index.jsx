import classes from "./contactsBlock.module.scss";
import ContactItem from "./ContactItem";

const ContactsBlock = () => {

return <div className={classes["contactsBlock"]}>
    <ContactItem title="Телефон" info="+7 (993) 355-08-35"/>
    <ContactItem title="WhatsApp " type="whatsApp" info="+7 (993) 355-08-35"/>
    <ContactItem title="E-mail" type="email" info="info@batova-brand.ru"/>
</div>
};

export default ContactsBlock;