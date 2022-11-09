import React, { useState } from 'react'
import cls from 'classnames'
import s from './Sidebar.module.scss'

import burgermenu from 'shared/assets/images/icons/burgermenu.png'
import home from 'shared/assets/images/icons/home.png'
import categories from 'shared/assets/images/icons/categories.png'
import products from 'shared/assets/images/icons/products.png'
import vendors from 'shared/assets/images/icons/vendors.png'
import { Button } from '../../components'

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <aside
            className={cls(s.Sidebar, {
                [s.collapsed]: collapsed,
            })}
        >
            <p onClick={() => setCollapsed(!collapsed)}>toggle</p>
        </aside>
    )
}

export default Sidebar
