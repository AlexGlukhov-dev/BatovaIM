import { useEffect } from 'react';
import { hideLoader } from '../redux/slices/loaderSlice';
import { useSelector, useDispatch } from 'react-redux';

export const useLoader = () => {
	const loader = useSelector(state => state.loader.loader);
	const dispatch = useDispatch();

	useEffect(() => {
		if (loader) {
			dispatch(hideLoader());
			document.body.style.overflow = 'auto';
			document.body.style.paddingRight = '0';
			document.getElementById('header').style.paddingRight = '0';
		}
	}, [])
}