// @ts-nocheck
import React, { useState } from 'react'
import cls from 'classnames'
import s from './Sidebar.module.scss'

import burger from 'shared/assets/images/icons/Sidebar-icons/Burger.svg'
import home from 'shared/assets/images/icons/Sidebar-icons/Home.svg'
import categories from 'shared/assets/images/icons/Sidebar-icons/Categories.svg'
import products from 'shared/assets/images/icons/Sidebar-icons/Products.svg'
import vendors from 'shared/assets/images/icons/Sidebar-icons/Vendors.svg'

import { Button, Link } from 'components'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false)

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
                            <img className={s.image} src={burger} />
                        </Button>
                    </li>
                    {/*<li className={s.item}>*/}
                    {/*    <Link className={cls(s.link)} to={routeConfig.HOME}>*/}
                    {/*        <div className={s.linkContent}>*/}
                    {/*            <img className={s.image} src={home} />*/}
                    {/*            <p className={s.text}>Home</p>*/}
                    {/*        </div>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<li className={s.item}>*/}
                    {/*    <Link className={s.link} to={routeConfig.CATEGORIES}>*/}
                    {/*        <img className={s.image} src={categories} />*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<li className={s.item}>*/}
                    {/*    <Link className={s.link} to={routeConfig.PRODUCTS}>*/}
                    {/*        <img className={s.image} src={products} />*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<li className={s.item}>*/}
                    {/*    <Link className={s.link} to={routeConfig.VENDORS}>*/}
                    {/*        <img className={s.image} src={vendors} />*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    <Link
                        variant={'navigation'}
                        icon={home}
                        to={routeConfig.HOME}
                        isCollapsed={!collapsed}
                    >
                        Home
                    </Link>
                    <Link
                        variant={'navigation'}
                        icon={categories}
                        to={routeConfig.CATEGORIES}
                        isCollapsed={!collapsed}
                    >
                        Categories
                    </Link>
                    <Link
                        variant={'navigation'}
                        icon={products}
                        to={routeConfig.PRODUCTS}
                        isCollapsed={!collapsed}
                    >
                        Products
                    </Link>
                    <Link
                        variant={'navigation'}
                        icon={vendors}
                        to={routeConfig.VENDORS}
                        isCollapsed={!collapsed}
                    >
                        Vendors
                    </Link>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
