import cls from 'classnames';
import { FC } from 'react';

import s from './Text.module.scss';

interface TextProps {
	className?: string;
	title?: string;
	subtitle?: string;
	mediumText?: string;
	text?: string;
	date?: string;
	weight?: 'light' | 'medium' | 'bold';
	theme?: 'error';
}

export const Text: FC<TextProps> = ({
	className,
	title,
	subtitle,
	mediumText,
	text,
	date,
	weight,
	theme,
}) => {
	return (
		<span className={cls(className, s[theme])}>
			{title && <h1 className={cls(className, s.title, s[theme])}>{title}</h1>}
			{subtitle && (
				<h3 className={cls(className, s.subtitle, s[weight], s[theme])}>
					{subtitle}
				</h3>
			)}
			{mediumText && (
				<p className={cls(className, s.mediumText)}>{mediumText}</p>
			)}
			{text && (
				<p className={cls(className, s.text, s[theme])} title={text}>
					{text}
				</p>
			)}
			{date && <p className={cls(className, s.date)}>{date}</p>}
		</span>
	);
};
