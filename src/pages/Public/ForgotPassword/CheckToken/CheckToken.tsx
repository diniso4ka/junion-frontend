import { FC, useEffect } from 'react'
import cls from 'classnames'
import { useNavigate, useParams } from 'react-router'
import { useAppDispatch } from 'app/store'
import { thunkCheckToken } from 'features/RetrievePassword/model/services/thunkCheckToken'
import { PageLoader } from 'widgets/PageLoader/PageLoader'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'

interface CheckTokenProps {
    className?: string
}

export const CheckToken: FC<CheckTokenProps> = ({ className }) => {
    const { verifyToken } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const fetchCheckToken = async () => {
        const response = await dispatch(thunkCheckToken(verifyToken))
        // @ts-ignore
        if (response.payload?.status === 200) {
            navigate(routeConfig.CHANGE_PASSWORD)
        } else {
            await navigate(routeConfig.NOT_ACTIVE)
        }
    }
    useEffect(() => {
        fetchCheckToken()
    }, [])
    return <PageLoader />
}
