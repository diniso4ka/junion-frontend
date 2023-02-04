import { StateSchema } from 'app/store/config/StateSchema';

export const getLoginMail = (state: StateSchema) =>
	state?.loginForm?.mail || '';
