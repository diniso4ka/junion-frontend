import React from 'react'

export const RegisterAsync: React.LazyExoticComponent<() => JSX.Element> =
    React.lazy(() => import('./Register'))
