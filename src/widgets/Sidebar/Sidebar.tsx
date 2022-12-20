import React, { useState } from 'react'
import cls from 'classnames'
import s from './Sidebar.module.scss'

import burger from 'shared/assets/images/icons/Sidebar-icons/Burger.svg'
import burgerActive from 'shared/assets/images/icons/Sidebar-icons/Burger-active.svg'
import home from 'shared/assets/images/icons/Sidebar-icons/Home.svg'
import homeActive from 'shared/assets/images/icons/Sidebar-icons/Home-active.svg'
import categories from 'shared/assets/images/icons/Sidebar-icons/Categories.svg'
import categoriesActive from 'shared/assets/images/icons/Sidebar-icons/Categoires-active.svg'
import products from 'shared/assets/images/icons/Sidebar-icons/Products.svg'
import productsActive from 'shared/assets/images/icons/Sidebar-icons/Products-active.svg'
import vendors from 'shared/assets/images/icons/Sidebar-icons/Vendors.svg'
import vendorsActive from 'shared/assets/images/icons/Sidebar-icons/Vendors-active.svg'

import { Button, Link } from 'shared/ui'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false)

    const navLinks = [
        {
            label: 'Home',
            icon: home,
            iconActive: homeActive,
            path: routeConfig.HOME,
        },
        {
            label: 'Categories',
            icon: categories,
            iconActive: categoriesActive,
            path: routeConfig.CATEGORIES,
        },
        {
            label: 'Products',
            icon: products,
            iconActive: productsActive,
            path: routeConfig.PRODUCTS,
        },
        {
            label: 'Vendors',
            icon: vendors,
            iconActive: vendorsActive,
            path: routeConfig.VENDORS,
        },
    ]

    return (
        <aside className={cls(s.sidebar, { [s.collapsed]: collapsed })}>
            <nav className={s.menu}>
                <ul className={s.list}>
                    <li
                        className={s.item}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <Button
                            variant={'text'}
                            className={cls(s.link, s.burger)}
                        >
                            <img
                                className={s.image}
                                src={collapsed ? burgerActive : burger}
                            />
                        </Button>
                    </li>
                    {navLinks.map(element => (
                        <Link
                            className={s.linkItem}
                            key={element.path}
                            isCollapsed={!collapsed}
                            icon={element.icon}
                            iconActive={element.iconActive}
                            variant={'navigation'}
                            to={element.path}
                        >
                            {element.label}
                        </Link>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
