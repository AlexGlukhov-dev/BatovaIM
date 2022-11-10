import SectionTitle from "../../components/SectionTitle";
import RoundImage from "../../UI/RoundImage";
import FlowerDecor from "../../components/FlowerDecor";
import ContactsBlock from "../../components/ContactsBlock";

import classes from './contacts.module.scss';
import Index from "../../components/ContactForm";
import {MetaHead} from "../../components/MetaHead";
import { useLoader } from '../../hooks/useLoader';

const Contacts = () => {
  useLoader();

    return (<>
        <MetaHead
          title='Контакты интернет-магазина "Batova-brand.ru"'
          description='Информация о контактах с сотрудниками интернет-магазина бренда "Батова"'
        />
      <main className={classes["contacts"]}>
        <div className={classes["contacts-container"]}>
          <SectionTitle className={classes["contacts__title"]}>Контакты</SectionTitle>
          <p className={classes["contacts__subtitle"]}>Если у вас возникли вопросы заполните форму ниже или напишите нам в WhatsApp</p>

          <div className={classes["contacts__content"]}>
            <Index/>
          </div>

          <FlowerDecor className={classes["contacts__decor"]}/>
          <ContactsBlock />
        </div>

        <div className={classes["contacts__image"]}>
          <RoundImage className={classes["contacts__image-item"]}/>
        </div>
      </main>
      </>
    );
};

export default Contacts;