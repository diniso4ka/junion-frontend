import { FC, ReactNode } from 'react'
import { DeepPartial } from 'redux'
import { StateSchema } from '../config/StateSchema'
import { ReducersMapObject } from '@reduxjs/toolkit'
import { createReduxStore } from '../config/store'
import { Provider } from 'react-redux'
import { useNavigate } from 'react-router'

interface StoreProviderProps {
    children: ReactNode
    initialState?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider: FC<StoreProviderProps> = ({
    children,
    initialState,
    asyncReducers,
}) => {
    // const navigate = useNavigate()
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>
        // navigate
    )
    return <Provider store={store}>{children}</Provider>
}
