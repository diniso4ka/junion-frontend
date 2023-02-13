import cls from 'classnames';
import { FC, useCallback } from 'react';

import { useNavigate } from 'react-router';
import { Button, Input, Text } from 'shared/ui';

import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/config/components/DynamicModuleLoader';

import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { popupInfoActions } from '../../../PopupInfo';
import { getRetrievePasswordConfirmPassword } from '../../model/selectors/getRetrievePasswordConfirmPassword/getRetrievePasswordConfirmPassword';
import { getRetrievePasswordPassword } from '../../model/selectors/getRetrievePasswordPassword/getRetrievePasswordPassword';
import { getRetrievePasswordStatus } from '../../model/selectors/getRetrievePasswordStatus/getRetrievePasswordStatus';
import { thunkChangePassword } from '../../model/services/thunkChangePassword';
import {
	retrievePasswordActions,
	retrievePasswordReducer,
} from '../../model/slice/retrievePasswordSlice';

import s from './ChangePasswordForm.module.scss';

interface ChangePasswordFormProps {
	className?: string;
}

const initialState: ReducersList = {
	retrievePassword: retrievePasswordReducer,
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
	className,
}) => {
	const navigate = useNavigate();
	const password = useAppSelector(getRetrievePasswordPassword);
	const confirmPassword = useAppSelector(getRetrievePasswordConfirmPassword);
	const status = useAppSelector(getRetrievePasswordStatus);
	const dispatch = useAppDispatch();

	const onPasswordChange = useCallback(
		(e) => {
			dispatch(retrievePasswordActions.setPassword(e.target.value));
		},
		[dispatch],
	);
	const onConfirmPasswordChange = useCallback(
		(e) => {
			dispatch(retrievePasswordActions.setConfirmPassword(e.target.value));
		},
		[dispatch],
	);

	const onSubmitForm = async () => {
		if (password === confirmPassword && password && confirmPassword) {
			const response = await dispatch(thunkChangePassword({ password }));
			//@ts-ignore //TODO ts-ignore
			if (response.payload?.data) {
				dispatch(
					popupInfoActions.setPopupInfo({
						text: 'Password changed',
						type: 'success',
					}),
				);
				navigate('/');
			} else {
				dispatch(
					popupInfoActions.setPopupInfo({
						text: 'Failed to change a password',
						type: 'error',
					}),
				);
			}

			setTimeout(() => {
				dispatch(popupInfoActions.unmountPopup());
			}, 1800);
		}
	};

	return (
		<DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
			<form className={cls(s.ChangePasswordForm, className)}>
				<Text className={s.Title} title={'Change password'} />
				<div className={s.formItem}>
					<Text className={s.label} mediumText={'New password'} />
					<Input
						type={'password'}
						disabled={status}
						className={s.formInput}
						sizeContainer={'adaptive'}
						value={password}
						onChange={onPasswordChange}
					/>
				</div>
				<div className={s.formItem}>
					<Text className={s.label} mediumText={'Confirm new password'} />
					<Input
						type={'password'}
						disabled={status}
						onChange={onConfirmPasswordChange}
						className={s.formInput}
						sizeContainer={'adaptive'}
						value={confirmPassword}
					/>
				</div>
				<div className={s.buttonWrapper}>
					<span />
					<div className={s.changeBtn}>
						<Button
							isLoading={status}
							onClick={onSubmitForm}
							className={s.button}
						>
							Change
						</Button>
					</div>
				</div>
			</form>
		</DynamicModuleLoader>
	);
};
