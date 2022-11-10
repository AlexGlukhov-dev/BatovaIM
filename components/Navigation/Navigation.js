import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import classes from './navigation.module.scss'

const Navigation = ({links, direction, className, loader, closeNav}) => {
	const classDirection = direction === "row" ? classes["nav-row"] : classes['nav-column'];

	return (
		<div className={cn(classes["nav"], classDirection, className && classes[className])}>
			{
				links.map(item => {
					if (item.link === '/shop' || item.link === '/sale') {
						return <Link key={item.id} href={item.link}>
							<a onClick={closeNav ? closeNav : loader} className={classes["nav-item"]}>
								{item.name}
							</a>
						</Link>
					} else {
						return <Link key={item.id} href={item.link}>
							<a onClick={closeNav} className={classes["nav-item"]}>
								{item.name}
							</a>
						</Link>
					}
				})
			}
		</div>
	);
};

export default Navigation;