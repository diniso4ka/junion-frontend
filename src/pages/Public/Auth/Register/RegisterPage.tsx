import React from 'react';

import { RegisterForm } from 'features/RegisterByMail';

import s from './RegisterPage.module.scss';

const RegisterPage = () => {
	return (
		<div className={s.wrapper}>
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
