import { StateSchema } from 'app/store/config/StateSchema';

export const getRegisterPassword = (state: StateSchema) =>
	state?.registerForm?.password || '';
