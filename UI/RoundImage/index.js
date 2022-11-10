import classes from './roundImage.module.scss';
import about from "../../public/img/about-img.png";
import cn from "classnames";
import Image from "next/image";

const RoundImage = ({alt, className, imgClass}) => {
    return (
        <div className={cn(classes["round"], className)}>
            <div className={cn(classes["round-image"], imgClass)}>
                <Image layout="fill" priority src={about} alt={alt}/>
            </div>
        </div>
    );
};

export default RoundImage;