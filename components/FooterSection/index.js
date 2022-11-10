import MainDecor from "../MainDecor";
import classes from "./footerSection.module.scss";
import Footer from "../Footer";

const FooterSection = () => {
    return (
        <footer className={classes["footer-wrapper"]}>
            <MainDecor className={classes["footer__decor"]}/>
            <Footer/>
        </footer>
    );
};

export default FooterSection;