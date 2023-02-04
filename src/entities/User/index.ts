export { userReducer, userActions } from './model/slice/userSlice';
// export { User, UserSchema } from './model/types/user'
export { thunkCheckAuthMe } from './model/services/CheckAuthMe';

export { getAuthData } from './model/selectors/getAuthData/getAuthData';
export { getInitialize } from './model/selectors/getInitialize/getInitialize';
