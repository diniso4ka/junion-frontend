import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './shared/config/i18n'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Providers/AppRouter'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Suspense fallback='loading'>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </Suspense>
)
