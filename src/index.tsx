import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'

import './shared/config/i18n/i18n'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './app/providers/ThemeProvider/ThemeProvider'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement!)
root.render(
    <BrowserRouter>
        <ThemeProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </BrowserRouter>
)
