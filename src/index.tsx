import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './shared/config/i18n/i18n';

import App from './app/App';
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary';
import ThemeProvider from './app/providers/ThemeProvider/ThemeProvider';
import { StoreProvider } from './app/store';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);
root.render(
	<BrowserRouter>
		<StoreProvider>
			<ErrorBoundary>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</ErrorBoundary>
		</StoreProvider>
	</BrowserRouter>,
);
