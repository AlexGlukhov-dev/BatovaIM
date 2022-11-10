import {useState} from "react";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";

import AuthForm from "./AuthForm";
import RegistrationForm from "./RegistrationForm";

import classes from './registration.module.scss';
import {useRouter} from "next/router";

const Registration = ({closeModal}) => {
	const router = useRouter();
	const handleRedirect = () => router.push("/personal");

	const [active, setActive] = useState('auth');
	const handleAuth = val => setActive(val);

	return (
		<>
			<div className={classes["auth-selector"]}>
				<button className={cn( classes["title"], active === 'auth' && classes["active"])}
								onClick={() => handleAuth('auth')}>Авторизация
				</button>
				<button className={cn( classes["title"], active === 'reg' && classes["active"])}
								onClick={() => handleAuth('reg')}>Регистрация
				</button>
			</div>
			<AnimatePresence exitBeforeEnter>
					{active === 'auth' && <motion.span
						key="auth"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}>
						<AuthForm redirect={handleRedirect} closeModal={closeModal}/>
					</motion.span>}
					{active === 'reg' && <motion.span
						key="reg"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}><RegistrationForm  redirect={handleRedirect} closeModal={closeModal}/>
					</motion.span>}
			</AnimatePresence>
		</>
	)
};

export default Registration;