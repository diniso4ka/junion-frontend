import { useNavigate } from 'react-router'
import { Button } from 'shared/ui'
import First from 'shared/assets/images/not-found/404-group-one.svg'
import Two from 'shared/assets/images/not-found/404-group-two.svg'
import s from './NotFound.module.scss'

const NotFound = () => {
    const navigate = useNavigate()

    const goHome = (): void => {
        navigate('/')
    }

    return (
        <section className={s.wrapper}>
            <div className={s.content}>
                <p className={s.code}>404</p>
                <p className={s.title}>Not found!</p>
                <p className={s.descr}>
                    The requested resource was not found on this server!
                </p>
                <Button theme='purple' onClick={goHome}>
                    Go back
                </Button>
                <div className={s.images}>
                    <img src={First} className={s.imageOne} alt='Oops' />
                    <img src={Two} className={s.imageTwo} alt='Oops' />
                </div>
            </div>
        </section>
    )
}

export default NotFound
