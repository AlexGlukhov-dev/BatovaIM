import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import cn from 'classnames';

import {formatPrice} from '../../utils';
import {addToFavorites, removeToFavorites} from '../../redux/slices/personalCabinetSlice';
import {filteredDataLiked} from '../../redux/slices/productsSlice';
import { showLoader } from '../../redux/slices/loaderSlice';

import Button from '../../UI/Button';

import classes from './productPrev.module.scss';

const ProductPrev = ({prod, width}) => {
    const {id, src, title, price, oldPrice, sale, liked} = prod;
    const dispatch = useDispatch();
    const router = useRouter();
    const userId = useSelector(state => state.auth.auth.userID);
    const loader = useSelector(state => state.loader.loader);
    const content = width > 768 ? "Подробнее" : <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.142577 13.2911L0.142577 14.557C0.272277 14.557 8.57303 14.4304 11.8155 6.96202L11.8155 30L13.1125 30L13.1125 6.96202C16.355 14.4304 24.6557 14.557 24.7854 14.557L24.7854 13.2911C24.2666 13.2911 13.1125 13.1646 13.1125 0.126582L11.8155 0.126582C11.8155 13.038 0.661374 13.2911 0.142577 13.2911Z"/>
    </svg>;

    const currentPath = router.pathname;
    const path = currentPath.split('/').includes('[id]') ? id : (currentPath + '/' + id);

    const setServerLike = (data) => {
      const url = 'https://api.batova-brand.ru/v1/user/like';
      axios.post(url, data);
    };

    const likeHandler = () => {
        dispatch(filteredDataLiked(id));
        prod = {...prod, "liked": !liked};
        liked ? dispatch(removeToFavorites(id)) : dispatch(addToFavorites(prod));
        if (userId) {
        setServerLike({userId, productId: prod.id})
        }
    };

    const loaderHandler = () => {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '17px';
      document.getElementById('header').style.paddingRight = '17px';
      dispatch(showLoader());
    };

    return (
        <article className={classes["product-prev"]}>
            <button onClick={likeHandler} className={cn(classes["product-prev__like"], "btn-reset")}>
                {liked ?
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 24L10.26 22.2736C4.08 16.1657 0 12.1373 0 7.19346C0 3.16512 2.904 0 6.6 0C8.688 0 10.692 1.0594 12 2.73352C13.308 1.0594 15.312 0 17.4 0C21.096 0 24 3.16512 24 7.19346C24 12.1373 19.92 16.1657 13.74 22.2866L12 24Z" fill="#BEC2A1"/>
                    </svg>
                    :
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4 0C15.312 0 13.308 1.0594 12 2.73352C10.692 1.0594 8.688 0 6.6 0C2.904 0 0 3.16512 0 7.19346C0 12.1373 4.08 16.1657 10.26 22.2866L12 24L13.74 22.2736C19.92 16.1657 24 12.1373 24 7.19346C24 3.16512 21.096 0 17.4 0ZM12.12 20.3379L12 20.4687L11.88 20.3379C6.168 14.7008 2.4 10.9733 2.4 7.19346C2.4 4.57766 4.2 2.6158 6.6 2.6158C8.448 2.6158 10.248 3.91063 10.884 5.70245H13.128C13.752 3.91063 15.552 2.6158 17.4 2.6158C19.8 2.6158 21.6 4.57766 21.6 7.19346C21.6 10.9733 17.832 14.7008 12.12 20.3379Z" />
                    </svg>}
            </button>
            {sale && <div className={classes["product-prev__sale"]}><span>-{sale}%</span></div>}
            <Link href={path}>
              <a>
                <div className={classes["product-prev__img"]}>
                      <div className={classes["product-prev__img-image"]}>
                        <Image src={src} width={290} height={400} priority alt="product-img"/>
                      </div>
                    <div className={classes["product-prev__img-border"]} />
                </div>
              </a>
            </Link>
            <h3 className={classes["product-prev__title"]}>{title}</h3>
            {oldPrice ? <span className={classes["product-prev__old-price"]}> {formatPrice(oldPrice)} р</span> : <div className={classes["product-prev__no-price"]} />}
            <div className={classes["product-prev__bottom"]}>
                <div className={classes["product-prev__bottom-price"]}>{formatPrice(price)} р</div>
                <Link href={path}>
                   <a> <Button className={classes["product-prev__bottom-btn"]} onClick={loaderHandler} variant="contained" direction="horizontal-right" color="black">{content}</Button> </a>
                </Link>
            </div>
        </article>
    );
};

export default ProductPrev;