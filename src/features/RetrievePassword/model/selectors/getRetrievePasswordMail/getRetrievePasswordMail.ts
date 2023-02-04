import { StateSchema } from 'app/store/config/StateSchema';

export const getRetrievePasswordMail = (state: StateSchema) =>
	state?.retrievePassword?.mail || '';
