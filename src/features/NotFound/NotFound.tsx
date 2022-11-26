//@ts-nocheck
import { useNavigate } from 'react-router'
import { Button } from 'components'
import s from './NotFound.module.scss'

const NotFound = () => {
    const navigate = useNavigate()
    const goBackHandler = () => {
        navigate(-1)
    }

    return (
        <div className={s.notFoundContainer}>
            <p className={s.statusCode}>404</p>
            <p className={s.statusText}>Not found!</p>
            <p className={s.statusDescription}>
                The requested resource was not found on this server!
            </p>
            <Button onClick={goBackHandler}>Go back</Button>
        </div>
    )
}

export default NotFound
