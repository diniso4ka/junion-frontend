import React from 'react';
import cls from 'classnames'
import './styles/index.css'

function App() {
  const [theme, setTheme] = React.useState('default')
  const toggleTheme = () => {
    setTheme((prev) => prev === 'default' ? 'dark' : 'default')
  }
  return (
    <div className={cls('app', theme === 'default' ? '' : 'dark')}>
      junion-backoffice
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

export default App;
