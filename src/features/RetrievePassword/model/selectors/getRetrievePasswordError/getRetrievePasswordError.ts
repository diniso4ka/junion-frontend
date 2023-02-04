import { StateSchema } from 'app/store/config/StateSchema';

export const getRetrievePasswordError = (state: StateSchema) =>
	state?.retrievePassword?.error;
