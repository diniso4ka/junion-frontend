import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'

import './shared/config/i18n/i18n'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './app/providers/ThemeProvider/ThemeProvider'
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary'
import { StoreProvider } from './app/store'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement!)
root.render(
    <BrowserRouter>
        <ErrorBoundary>
            <ThemeProvider>
                <StoreProvider>
                    <App />
                </StoreProvider>
            </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>
)
