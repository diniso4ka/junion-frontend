import { useTheme } from '../../app/providers/ThemeProvider/useTheme';
import { Button } from '../../shared/ui';

export const ThemeSwitcher = () => {
	const { theme, toggleTheme } = useTheme();

	return <Button onClick={toggleTheme}>Theme</Button>;
};
