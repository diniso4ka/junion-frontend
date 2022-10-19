import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'

import './shared/config/i18n'
import { Provider } from 'react-redux'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Suspense fallback='loading'>
        <Provider store={store}>
            <App />
        </Provider>
    </Suspense>
)
