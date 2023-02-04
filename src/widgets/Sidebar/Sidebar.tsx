import cls from 'classnames';
import React, { useState } from 'react';

import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { Button, Link } from 'shared/ui';

import { ReactComponent as Burger } from 'shared/assets/images/icons/Sidebar-icons/Burger.svg';
import { ReactComponent as Categories } from 'shared/assets/images/icons/Sidebar-icons/Categories.svg';
import { ReactComponent as Home } from 'shared/assets/images/icons/Sidebar-icons/Home.svg';
import { ReactComponent as Products } from 'shared/assets/images/icons/Sidebar-icons/Products.svg';
import { ReactComponent as Vendors } from 'shared/assets/images/icons/Sidebar-icons/Vendors.svg';

import s from './Sidebar.module.scss';

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false);

	const navLinks = [
		{
			label: 'Home',
			Icon: Home,
			path: routeConfig.HOME,
		},
		{
			label: 'Categories',
			Icon: Categories,
			path: routeConfig.CATEGORIES,
		},
		{
			label: 'Products',
			Icon: Products,
			path: routeConfig.PRODUCTS,
		},
		{
			label: 'Vendors',
			Icon: Vendors,
			path: routeConfig.VENDORS,
		},
	];

	return (
		<aside className={cls(s.sidebar, { [s.collapsed]: collapsed })}>
			<nav className={s.menu}>
				<ul className={s.list}>
					<li className={s.item}>
						<Button
							onClick={() => setCollapsed(!collapsed)}
							variant={'text'}
							className={cls(s.link, s.burger)}
						>
							<Burger
								className={collapsed ? cls(s.image, s.active) : s.image}
							/>
						</Button>
					</li>
					{navLinks.map((element) => (
						<Link
							className={s.linkItem}
							key={element.path}
							isCollapsed={!collapsed}
							Icon={element.Icon}
							variant={'navigation'}
							to={element.path}
						>
							{element.label}
						</Link>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
