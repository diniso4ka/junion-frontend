export interface LoginSchema {
	mail: string;
	password: string;
	isLoading: boolean;
	error?: string;
}
