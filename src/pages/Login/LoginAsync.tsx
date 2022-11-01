import React from 'react'

export const LoginAsync: React.LazyExoticComponent<() => JSX.Element> =
    React.lazy(() => import('./Login'))
