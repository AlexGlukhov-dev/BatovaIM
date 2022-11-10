import cn from "classnames";
import Image from "next/image";
import BlockTitle from "../../components/BlockTitle";
import RoundImage from "../../UI/RoundImage";
import AdvantagesSection from "../../components/AdvantagesSection";
import InfoItem from "../../components/InfoItem";
import useSize from "../../hooks/useSize";
import AboutRound from "../../components/AboutRound";
import design from "../../public/img/design.svg";
import quality from "../../public/img/quality.jpg"
import srcImage1 from "../../public/img/slide-3.jpg"
import srcImage2 from "../../public/img/slide-4.jpg"
import srcImage3 from "../../public/img/slide-1.jpg"
import srcImage4 from "../../public/img/slide-2.jpg"

import classes from './about.module.scss';
import about from "../../public/img/about-img.png";
import {MetaHead} from "../../components/MetaHead";
import { useLoader } from '../../hooks/useLoader';

const About = () => {
	const [target, currentSize] = useSize();
	const {width} = currentSize;

	useLoader();

	return (<>
			<MetaHead
				title="О бренде Batova"
				description="Информация о бренде Batova-brand, особенности дизайна, качество товаров."
			/>
		<main ref={target} className={cn(classes["about"])}>
			<section className={classes["about__top"]}>
				<div className="site-container">
					<div className={classes["about__top-info"]}>
						<BlockTitle className={classes["info-title"]}>О бренде</BlockTitle>
						<div className={classes["info-text"]}>
							<p>На идею создания собственного бренда меня вдохновила дочка: мне всегда хотелось одевать ее стильно и при этом, чтобы она всегда чувствовала себя комфортно.
								Для меня было важно, чтобы одежда, которую она носит, имела не только стильный дизайн и интересный крой, но и состояла из натуральной ткани:
								именно эти условия в дальнейшем и стали основными составляющими Batova.<br/>
								Мы считаем, что ребенок может выглядеть стильно как играя на детской площадке, так и посещая практически любые праздники и важные мероприятия. Вам не нужно долго думать, во что одеть ребенка:
								наши изделия гармонично впишутся в любой образ и место.</p>
							<p>Название бренда основано на фамилии не случайно: Batova — это про семейные ценности, про любовь и уважение к детям. Наша цель — привить ребенку вкус стиля и «умного» гардероба,
								а потому все вещи бренда гармонично сочетаются между собой.
								Благодаря экологичным материалам, мы заботимся не только о безопасности наших маленьких клиентов, но и о природе, о разумном потреблении ее ресурсов.</p>
						</div>
						<div className={classes["info-text--wide"]}>
							<p>Одежда Batova обещает служить вам не один сезон. «Растущие» рукава, регулируемые лямки на сарафанах и крой oversize идеально сочетаются с натуральными тканями и лаконичным дизайном,
								позволяя одежде расти вместе с вашим ребенком.</p>
							<p>Дети приходят в этот мир, чтобы украсить его, а наша одежда подчеркнёт индивидуальность каждого малыша!</p>
					</div>
								<div className={classes["about__top-image"]}>
									<RoundImage className={classes["about__top-image--item"]}/>
								</div>
					</div>
				</div>

			</section>
			<AdvantagesSection className={classes["about__advantages"]}/>
			<div className={classes["container"]}>
				<InfoItem srcImage={quality}
									className={cn(classes["about__info-item"], "site-container", width < 1024 && classes["about__info-item-reverse"])}
									title="Качество"
									text={<>
										<p>Основной критерий Batova — натуральность, поэтому мы тщательно подходим к подбору материалов для наших изделий, даже для деталей: например, наши пуговки сделаны из кокоса.</p>
										<p>Вся одежда Batova отшивается в России. Особое внимание уделяется как деталям, которые пришиваются вручную, так и самому пошиву: обработка изделий всегда тщательно контролируется — мы следим за ровными швами,
										отбираем мягкую ткань и разрабатываем максимально комфортные для носки модели.</p>
										<p>Batova создает одежду, которая послужит вашему ребенку помощником и другом в познании этого мира. Наши изделия не способны потревожить детскую кожу, не сковывают движение и приятно пахнут.</p>
									</>
									}/>
				<div className={cn(classes["about__design"], "site-container")}>
					<div className={classes["about__design-image"]}>
						<Image src={design} priority alt="design image"/>
					</div>
				</div>
				<InfoItem srcImage={srcImage2} className={cn(classes["about__bot"],  classes["fix-width"], "site-container")} title="Дизайн"
									text={<>
									<p>Гардероб, в котором все вещи идеально сочетаются друг с другом и не нуждаются в регулярной замене, — мечта многих. Именно поэтому мы выбираем ткани природных и пастельных тонов.</p>
									<p>Стиль Batova отражает лаконичность, красоту и функциональность: эти принципы ложатся в основу модного детского гардероба, а потому наша одежда будет актуальна в любое независимое от трендов и моды время.</p>
									<p>Мы уделяем внимание деталям. Кармашки, в которые так хочется спрятать свой секретик — листик или камушек, который получилось найти на улице, станут с вашим ребенком неразлучными друзьями!</p>
									<p>В Batova ваш ребенок всегда будет в центре внимания!</p>
									</>}
									/>
				<div className={cn(classes["about__images"], "site-container")}>
					<AboutRound src={srcImage1} wrapperClass={classes["about__images-item"]} borderClass={classes["round"]}
											imageClass={classes["image"]}/>
					<AboutRound src={srcImage3} wrapperClass={classes["about__images-item"]} borderClass={classes["round"]}
											imageClass={classes["image"]}/>
					<AboutRound src={srcImage4} wrapperClass={classes["about__images-item"]} borderClass={classes["round"]}
											imageClass={classes["image"]}/>
				</div>
			</div>

		</main>
		</>
	);
};

export default About;