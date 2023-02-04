import { endpoints } from '../endpoints';
import api from '../instance';

export const fetchCategories = async () => {
	const res = await api.get(endpoints.categories);
	return res;
};
