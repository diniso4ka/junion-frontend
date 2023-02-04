import { FC, useCallback, useEffect } from 'react';

import { useParams } from 'react-router';
import { useAppDispatch } from 'app/store';
import { thunkCheckToken } from 'features/RetrievePassword/model/services/thunkCheckToken';

import { PageLoader } from 'widgets/PageLoader/PageLoader';

interface CheckTokenProps {
	className?: string;
}

export const CheckToken: FC<CheckTokenProps> = ({ className }) => {
	const { verifyToken } = useParams();
	const dispatch = useAppDispatch();

	const fetchCheckToken = useCallback(async () => {
		await dispatch(
			thunkCheckToken({
				verifyToken: verifyToken,
			}),
		);
	}, [dispatch, verifyToken]);
	useEffect(() => {
		fetchCheckToken();
	}, [fetchCheckToken]);
	return <PageLoader />;
};
