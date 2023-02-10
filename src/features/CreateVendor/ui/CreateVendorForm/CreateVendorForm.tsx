import cls from 'classnames';
import { FC, useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/store';
import { thunkGetVendorsList } from 'entities/Vendors';
import { Button, Input, Text } from 'shared/ui';

import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/config/components/DynamicModuleLoader';

import { getCreateVendorAddress } from '../../model/selectors/getCreateVendorAddress/getCreateVendorAddress';
import { getCreateVendorError } from '../../model/selectors/getCreateVendorError/getCreateVendorError';
import { getCreateVendorName } from '../../model/selectors/getCreateVendorName/getCreateVendorName';
import { getCreateVendorRegCode } from '../../model/selectors/getCreateVendorRegCode/getCreateVendorRegCode';
import { getCreateVendorStatus } from '../../model/selectors/getCreateVendorStatus/getCreateVendorStatus';
import { thunkCreateVendor } from '../../model/services/thunkCreateVendor';
import {
	createVendorValidateErrors,
	validate,
} from '../../model/services/validate/validate';
import {
	createVendorActions,
	createVendorReducer,
} from '../../model/slice/createVendorSlice';

import closeIcon from 'shared/assets/images/icons/close.svg';

import s from './CreateVendorForm.module.scss';

interface CreateVendorFormProps {
	className?: string;
	onClose: () => void;
}

const initialState: ReducersList = {
	createVendor: createVendorReducer,
};

export const CreateVendorForm: FC<CreateVendorFormProps> = ({
	className,
	onClose,
}) => {
	const name = useAppSelector(getCreateVendorName);
	const regCode = useAppSelector(getCreateVendorRegCode);
	const address = useAppSelector(getCreateVendorAddress);
	const status = useAppSelector(getCreateVendorStatus);
	const error = useAppSelector(getCreateVendorError);
	const [validationError, setValidationError] =
		useState<createVendorValidateErrors>();
	const dispatch = useAppDispatch();

	const onSubmitForm = useCallback(async () => {
		const errors = validate({ name, address, regCode });
		if (errors) {
			return setValidationError(() => errors);
		}
		const response = await dispatch(
			thunkCreateVendor({ name, address, regCode }),
		);
		// @ts-ignore
		if (response.payload.status === 201) {
			dispatch(thunkGetVendorsList());
			onClose();
		}
	}, [name, regCode, address, dispatch, onClose]);

	const onChangeName = useCallback(
		(e) => {
			dispatch(createVendorActions.setName(e.target.value));
		},
		[dispatch],
	);
	const onChangeAddress = useCallback(
		(e) => {
			dispatch(createVendorActions.setAddress(e.target.value));
		},
		[dispatch],
	);
	const onChangeRegCode = useCallback(
		(e) => {
			dispatch(createVendorActions.setRegCode(e.target.value));
		},
		[dispatch],
	);
	return (
		<DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
			<div className={cls(s.CreateVendorForm, className)}>
				<img onClick={onClose} className={s.closeIcon} src={closeIcon} />
				<Text className={s.title} title={'New vendor'} />
				<form className={s.form}>
					<ul className={s.items}>
						<li className={s.inputItem}>
							<label className={s.label}>Vendor's name</label>
							<Input
								sizeContainer={'adaptive'}
								className={s.input}
								onChange={onChangeName}
								value={name}
								disabled={status}
								variant={'outline'}
								error={!!validationError?.name}
								helperText={validationError?.name}
							/>
						</li>
						<li className={s.inputItem}>
							<label className={s.label}>
								Vendor's <br />
								address
							</label>
							<Input
								sizeContainer={'adaptive'}
								className={s.input}
								onChange={onChangeAddress}
								value={address}
								disabled={status}
								variant={'outline'}
								error={!!validationError?.address}
								helperText={validationError?.address}
							/>
						</li>
						<li className={s.inputItem}>
							<label className={s.label}>
								Vendor's <br />
								Reg Code
							</label>
							<Input
								sizeContainer={'small'}
								variant={'outline'}
								className={s.input}
								onChange={onChangeRegCode}
								value={regCode}
								disabled={status}
								error={!!validationError?.regCode}
								helperText={validationError?.regCode}
							/>
						</li>
					</ul>
				</form>
				<div className={s.buttonWrapper}>
					<Button
						isLoading={status}
						className={s.button}
						size={'small'}
						onClick={onSubmitForm}
					>
						Create
					</Button>
				</div>
				{error && <Text theme={'error'} text={'Server error'} />}
			</div>
		</DynamicModuleLoader>
	);
};
