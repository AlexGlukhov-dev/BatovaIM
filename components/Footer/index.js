import cn from "classnames";

import MainLogo from "../MainLogo";
import Navigation from "../Navigation/Navigation";

import classes from './footer.module.scss';

import {useRouter} from "next/router";
import Link from "next/link";



const Footer = () => {

    const headerLinksLeft = [
        {id: 1, name: "Магазин", link: "/shop"},
        {id: 2, name: "О бренде", link: "/about"},
        {id: 3, name: "Лукбук", link: "/lookBook"},
        {id: 4, name: "Sale", link: "/sale"},
    ];
    const headerLinksRight = [
        {id: 5, name: "Информация", link: "/info"},
        {id: 6, name: "Контакты", link: "/contacts"},
    ];
    const headerLinks = headerLinksLeft.concat(headerLinksRight);

    return (
        <div className={classes["footer-section"]}>
            <div className={cn(classes["footer"], classes["footer-container"])}>
                <div className={classes["footer__logo"]}>
                    <MainLogo color/>
                </div>
                <div className={classes["footer__copyright"]}>
                    <span>© Batova, 2022</span>
                </div>
                <div className={classes["footer__nav"]}>
                    <Navigation direction="column" links={headerLinks} className="footer-nav"/>
                </div>

                <div className={classes["footer__social"]}>
                    <a className={classes["footer__social--vk"]} href="https://vk.com/batova_brand">
                        <svg viewBox="0 0 33 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.7544 1.38349C32.3428 1.05921 30.7598 1.07606 29.1903 1.08027C27.5847 1.08869 25.9926 1.09712 25.6263 1.23188C25.287 1.35822 24.5181 3.08066 23.5231 4.85363C22.3969 6.86245 20.9993 8.79124 20.1218 8.77861C18.9821 8.76176 19.2444 5.46428 19.3122 3.04276C19.3575 1.43824 19.077 0.937086 18.8238 0.777055C18.2132 0.398034 16.5578 0.0232243 16.5578 0.0232243C16.5578 0.0232243 11.5916 -0.326317 10.8815 1.6867C11.8268 1.80041 13.455 1.52246 12.8263 7.72156C12.7947 8.02057 12.0665 10.5768 9.74623 7.11934C9.17181 6.26443 6.94653 1.10133 6.18215 1.08027C3.6086 1.0171 1.08933 0.916029 0.189263 1.38349C-0.633912 1.80883 1.3019 5.37584 4.56294 10.1389C7.23147 14.0302 10.0583 17.0707 14.934 17.8372C15.8431 17.9214 18.2448 18.0225 18.9866 17.6856C19.5022 17.4498 18.8735 14.0765 20.6058 13.7606C21.3837 13.6216 24.3417 17.2645 25.4679 17.6856C26.1509 17.9383 27.6525 18.0351 29.1948 17.9888C30.8593 17.9383 32.7408 18.1236 32.9217 17.0834C33.3288 14.7545 27.9013 11.7308 27.7385 10.2905C27.6209 9.2587 29.724 7.35938 30.8186 5.91489C32.1438 4.15455 33.5866 2.03625 32.7544 1.38349Z" fill="white"/>
                        </svg>
                    </a>
                    <a className={classes["footer__social--pin"]} href="https://pin.it/3nY0ZQp">
                        <svg width="24px" fill="#fff" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                    </a>
                </div>
                <div className={classes["footer__policy"]}>
                    <Link href="/policy"><a className={classes["footer__policy-link"]}>Политика конфиденциальности</a></Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;