import { FC } from 'react';

import { ChangePasswordForm } from 'features/RetrievePassword/ui/ChangePasswordForm/ChangePasswordForm';

import s from './ChangePasswordPage.module.scss';

const ChangePasswordPage: FC = () => {
	return (
		<div className={s.ChangePasswordPage}>
			<ChangePasswordForm />
		</div>
	);
};

export default ChangePasswordPage;
