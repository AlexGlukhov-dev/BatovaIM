import React from 'react';
import classes from "./aboutRound.module.scss";
import Image from "next/image";
import cn from "classnames";

const AboutRound = ({src, wrapperClass, imageClass, borderClass}) => {
  return (
    <div className={cn(classes["about-round"], wrapperClass)}>
      <div className={cn(classes["about-round__image"], imageClass)}>
        <Image layout="fill" src={src} priority alt="round image" />
      </div>
      <div className={cn(classes["about-round__border"], borderClass)}/>
    </div>
  );
};

export default AboutRound;