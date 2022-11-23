import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'

import './shared/config/i18n/i18n'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './app/providers/ThemeProvider/ThemeProvider'
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement!)
root.render(
    <BrowserRouter>
        <ErrorBoundary>
            <ThemeProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>
)
