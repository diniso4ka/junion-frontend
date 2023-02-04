import { StateSchema } from 'app/store/config/StateSchema';

export const getLoginPassword = (state: StateSchema) =>
	state?.loginForm?.password || '';
