import { Button } from 'shared/ui'
import s from './PageError.module.scss'
import { FC } from 'react'

const PageError: FC = () => {
    const reloadPage = () => {
        // eslint-disable-next-line no-use-before-define
        location.reload()
    }

    return (
        <div className={s.pageErrorContainer}>
            <p className={s.title}>This site can't be reached!</p>
            <p className={s.description}>
                junion-backoffice.vercel.app’s server IP address could not be
                found
            </p>
            <Button onClick={reloadPage}>Reload</Button>
        </div>
    )
}

export default PageError
