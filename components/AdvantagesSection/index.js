import AdvantagesItem from "./AdvantagesItem";

import iconOne from '../../public/img/advantages-1.svg';
import iconTwo from '../../public/img/advantages-2.svg';
import iconThree from '../../public/img/advantages-3.svg';

import classes from './advantagesSection.module.scss';
import cn from "classnames";

const AdvantagesSection = ({className}) => {
    const advantagesData = [
        {id: 1, icon: iconOne, text: "Собственное производство"},
        {id: 2, icon: iconTwo, text: "Натуральные материалы"},
        {id: 3, icon: iconThree, text: "Лаконичный дизайн"},
    ];

    return (
        <section className={cn(classes["advantages"], "container", className)}>
            <div className={cn(classes["advantages-list"])}>
                {advantagesData.map(item => <AdvantagesItem key={item.id} src={item.icon} text={item.text} /> )}
            </div>
        </section>

    );
};

export default AdvantagesSection;