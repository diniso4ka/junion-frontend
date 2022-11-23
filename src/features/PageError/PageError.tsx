//@ts-nocheck
import { Button } from 'components'
import s from './PageError.module.scss'

const PageError = () => {
    return (
        <div className={s.pageErrorContainer}>
            <p className={s.title}>This site can't be reached!</p>
            <p className={s.description}>
                junion-backoffice.vercel.app’s server IP address could not be
                found
            </p>
            <Button>Reload</Button>
        </div>
    )
}

export default PageError
