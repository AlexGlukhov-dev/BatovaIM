import {useState, useEffect} from "react";
import {checkScroll} from "../../utils";

import arrow from './../../public/img/arrow_up.svg';

import classes from './scrollToTopBtn.module.scss';

import Button from "../Button";
import Image from "next/image";

const ScrollToTopBtn = () => {
	const [showBtn, setShowBtn] = useState(false);

	useEffect(() => {
		if (window) {
			window.addEventListener('scroll', () => checkScroll(100, setShowBtn));
		}
		return () => window.removeEventListener('scroll', () => checkScroll(100, setShowBtn))
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	return (
		<>
			{showBtn && <div className={classes["scroll-btn__wrapper"]}>
				<Button onClick={scrollToTop} variant="icon" className={classes["scroll-btn"]}>
					<svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.142577 13.2911L0.142577 14.557C0.272277 14.557 8.57303 14.4304 11.8155 6.96202L11.8155 30L13.1125 30L13.1125 6.96202C16.355 14.4304 24.6557 14.557 24.7854 14.557L24.7854 13.2911C24.2666 13.2911 13.1125 13.1646 13.1125 0.126582L11.8155 0.126582C11.8155 13.038 0.661374 13.2911 0.142577 13.2911Z"/>
					</svg>
				</Button>
			</div>
			}
		</>
	)
};

export default ScrollToTopBtn;
