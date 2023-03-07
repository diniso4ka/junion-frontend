import cls from 'classnames';
import React, { InputHTMLAttributes, memo, useState } from 'react';

import eye from 'shared/assets/images/password-icons/codicon_eye.svg';
import eyeClosed from 'shared/assets/images/password-icons/codicon_eye-closed.svg';

import s from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	type?: 'text' | 'password';
	placeHolder?: string;
	variant?: 'primary' | 'secondary' | 'outline';
	sizeContainer?: 'large' | 'medium' | 'small' | 'adaptive';
	heightContainer?: number | null;
	className?: string;
	helperText?: string;
	helperClass?: 'error' | 'hint' | 'success';
	error?: boolean;
	withHint?: string[] | null;
	isHintOpen?: boolean;
	onCloseHint?: () => void;
	onHandleSelect?: (hint: string) => void;
}

export const Input = memo(
	({
		type = 'text',
		variant = 'primary',
		sizeContainer = 'large',
		heightContainer = null,
		className,
		error = false,
		helperText,
		helperClass = 'error',
		placeHolder,
		...rest
	}: IInputProps) => {
		const [visible, setVisible] = useState<boolean>(false);
		const helperTextClass = cls({
			[s.helperError]: helperClass === 'error',
			[s.helperHint]: helperClass === 'hint',
			[s.helperSuccess]: helperClass === 'success',
		});

		const classnames = cls(s.input, s[variant], s[sizeContainer], {
			[s.error]: error,
		});
		const onToggleVisible = () => {
			setVisible(!visible);
		};

		return (
			<div className={cls(s.wrapper, className)}>
				<div className={s.inputWrapper}>
					<input
						style={heightContainer && { height: heightContainer }}
						className={classnames}
						onChange={(e) => rest.onChange(e)}
						placeholder={placeHolder}
						autoComplete={'off'}
						type={
							type === 'text'
								? 'text'
								: type === 'password' && visible
								? 'text'
								: 'password'
						}
						{...rest}
					/>
					<div className={s.rightImage}>
						{type === 'password' &&
							(visible ? (
								<img src={eye} onClick={onToggleVisible} />
							) : (
								<img src={eyeClosed} onClick={onToggleVisible} />
							))}
					</div>
				</div>

				<div className={s.helperWrapper}>
					{helperText ? (
						<p className={cls(s.helper, helperTextClass)}>{helperText}</p>
					) : (
						<div></div>
					)}
				</div>
			</div>
		);
	},
);
