import { StateSchema } from 'app/store/config/StateSchema';

export const getInitialize = (state: StateSchema) => state.user.initialize;
