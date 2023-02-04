import cls from 'classnames';
import React, {
	InputHTMLAttributes,
	memo,
	useEffect,
	useRef,
	useState,
} from 'react';

import { useClickOutside } from 'shared/hooks/useClickOutside';

import s from './InputWithHint.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	variant?: 'line' | 'outline';
	hintSize?: 'large' | 'medium' | 'small' | 'adaptive';
	hint?: string[];
	isHintOpen?: boolean;
	onCloseHint?: () => void;
	onHandleSelect?: (hint: string) => void;
	position?: 'default' | 'right';
}

export const InputWithHint = memo(
	({
		type = 'text',
		variant = 'line',
		hint,
		hintSize = 'medium',
		className,
		onCloseHint,
		isHintOpen,
		onHandleSelect,
		position = 'default',
		...rest
	}: IInputProps) => {
		const [value, setValue] = useState('');
		const ref = useRef();
		useClickOutside(ref, () => onCloseHint?.());

		const filteredItems = hint.filter((item) => {
			return item.toLowerCase().includes(value.toLowerCase());
		});

		const onHandleHint = (e) => {
			onHandleSelect(e.target.innerHTML);
			onCloseHint?.();
		};
		useEffect(() => {
			if (rest.value) {
				// @ts-ignore
				setValue(rest.value);
			} else {
				setValue('');
			}
		}, [rest.value]);
		return (
			<div ref={ref} className={cls(s.inputWrapper, className)}>
				<input
					className={cls(s.input, s[variant])}
					onChange={(e) => rest.onChange(e)}
					autoComplete={'off'}
					type={'text'}
					{...rest}
				/>
				<div
					className={
						position === 'right' && isHintOpen && filteredItems.length
							? s.rightWrapper
							: undefined
					}
				>
					<ul
						className={cls(s.hint, s[hintSize], {
							[s.opened]: isHintOpen && filteredItems.length,
						})}
					>
						{filteredItems.map((item, index) => (
							<li key={index} onClick={onHandleHint} className={s.hintItem}>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	},
);
