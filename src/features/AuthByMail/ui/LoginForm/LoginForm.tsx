import cls from 'classnames';
import { FC, useCallback, useState } from 'react';

import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema';
import { thunkCheckAuthMe } from 'entities/User';
import { RetrievePasswordModal } from 'features/RetrievePassword';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { loginValidation } from 'shared/helpers/validations/loginValidation';
import { Button, Input } from 'shared/ui';

import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/config/components/DynamicModuleLoader';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginMail } from '../../model/selectors/getLoginMail/getLoginMail';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginStatus } from '../../model/selectors/getLoginStatus/getLoginStatus';
import { thunkLoginByMail } from '../../model/services/LoginByMail';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

import s from './LoginForm.module.scss';

interface ValidationProps {
	mail?: string;
	password?: string;
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

const LoginPage: FC = () => {
	const mail = useAppSelector(getLoginMail);
	const password = useAppSelector(getLoginPassword);
	const error = useAppSelector(getLoginError);
	const isLoading = useAppSelector(getLoginStatus);
	const [errors, setErrors] = useState<ValidationProps>({});
	const [isModalRetrieve, setIsModalRetrieve] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const onChangeMail = useCallback(
		(value) => {
			dispatch(loginActions.setMail(value.target.value));
		},
		[dispatch],
	);
	const onChangePassword = useCallback(
		(value) => {
			dispatch(loginActions.setPassword(value.target.value));
		},
		[dispatch],
	);

	const onSubmitForm = useCallback(async () => {
		const validationErrors = loginValidation({ mail, password });
		setErrors(validationErrors);
		if (!validationErrors) {
			await dispatch(thunkLoginByMail({ email: mail, password }));
			const response = await dispatch(thunkCheckAuthMe());
			// @ts-ignore
			if (response.payload.status === 200) {
				await navigate(routeConfig.HOME);
			}
		}
	}, [dispatch, mail, password, navigate]);

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
			<main className={s.wrapper}>
				<form className={s.contentWrapper}>
					<div className={s.message}>
						{error && <p className={cls(s.helper, s.helperError)}>{error}</p>}
					</div>
					<div className={s.formItem}>
						<Input
							placeHolder={'E-mail address'}
							onChange={onChangeMail}
							value={mail}
							helperText={errors?.mail}
							helperClass={'error'}
							error={!!errors?.mail}
						/>
					</div>
					<div className={s.formItem}>
						<Input
							placeHolder={'Password'}
							type={'password'}
							onChange={onChangePassword}
							value={password}
							helperText={errors?.password}
							helperClass={'error'}
							error={!!errors?.password}
						/>
						<div className={s.forgotBtnWrapper}>
							<Button
								onClick={() => setIsModalRetrieve(true)}
								className={s.forgotBtn}
								variant={'hint'}
							>
								Forgot you Password?
							</Button>
						</div>
					</div>
					<div className={s.formButton}>
						<Button
							onClick={onSubmitForm}
							isLoading={isLoading}
							className={s.button}
							theme='purple'
						>
							Log In
						</Button>
					</div>
				</form>
			</main>
			{isModalRetrieve && (
				<RetrievePasswordModal
					onClose={() => setIsModalRetrieve(false)}
					isOpen={isModalRetrieve}
				/>
			)}
		</DynamicModuleLoader>
	);
};

export default LoginPage;
