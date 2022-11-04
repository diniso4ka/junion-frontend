import { Button } from '../../components'
import { useTheme } from '../../app/providers/ThemeProvider/useTheme'

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme()

    return <Button onClick={toggleTheme}>Theme</Button>
}
