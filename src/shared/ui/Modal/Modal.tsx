import cls from 'classnames';
import { FC, ReactNode, useEffect } from 'react';

import { Portal } from 'shared/ui/index';

import close from 'shared/assets/images/icons/close.svg';

import s from './Modal.module.scss';

interface ModalProps {
	className?: string;
	children: ReactNode;
	onClose: () => void;
	isOpen: boolean;
	position?: 'center' | 'top';
	overlay?: boolean;
	closeIcon?: boolean;
}

export const Modal: FC<ModalProps> = ({
	className,
	children,
	isOpen,
	onClose,
	closeIcon = false,
	position = 'center',
	overlay = true,
}) => {
	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			if (e.code === 'Escape') {
				e.preventDefault();
				onClose();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [onClose]);
	return (
		<Portal>
			<div
				onMouseDown={() => onClose()}
				className={cls(s.wrapper, className, {
					[s.opened]: isOpen,
					[s.overlay]: overlay,
				})}
			>
				<div
					onMouseDown={(e) => e.stopPropagation()}
					className={cls(s.Modal, {
						[s.top]: position === 'top',
					})}
				>
					{closeIcon && (
						<img
							className={s.closeIcon}
							src={close}
							alt={'close'}
							onClick={onClose}
						/>
					)}
					{children}
				</div>
			</div>
		</Portal>
	);
};
