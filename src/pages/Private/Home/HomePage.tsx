import React from 'react'
import cls from 'classnames'
import s from './HomePage.module.scss'

const HomePage: React.FC = () => {
    return <div className={cls(s.HomePage, s.wrapper)}>Авторизирован</div>
}

export default HomePage
