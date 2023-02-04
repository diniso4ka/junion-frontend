import cls from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/store';
import { thunkGetVendorsList } from 'entities/Vendors';
import { Button, Input, Text } from 'shared/ui';

import { Vendor } from '../../../../entities/Vendors/model/types/VendorsSchema';
import { getUpdateVendorAddress } from '../../model/selectors/getUpdateVendorAddress/getUpdateVendorAddress';
import { getUpdateVendorError } from '../../model/selectors/getUpdateVendorError/getUpdateVendorError';
import { getUpdateVendorName } from '../../model/selectors/getUpdateVendorName/getUpdateVendorName';
import { getUpdateVendorRegCode } from '../../model/selectors/getUpdateVendorRegCode/getUpdateVendorRegCode';
import { getUpdateVendorStatus } from '../../model/selectors/getUpdateVendorStatus/getUpdateVendorStatus';
import { thunkUpdateVendor } from '../../model/services/thunkUpdateVendor';
import { updateVendorActions } from '../../model/slice/updateVendorSlice';

import closeIcon from 'shared/assets/images/icons/close.svg';

import s from './UpdateVendorForm.module.scss';

interface CreateVendorFormProps {
	className?: string;
	onClose: () => void;
	data?: Vendor;
}

export const UpdateVendorForm: FC<CreateVendorFormProps> = ({
	className,
	onClose,
	data,
}) => {
	const name = useAppSelector(getUpdateVendorName);
	const regCode = useAppSelector(getUpdateVendorRegCode);
	const address = useAppSelector(getUpdateVendorAddress);
	const status = useAppSelector(getUpdateVendorStatus);
	const error = useAppSelector(getUpdateVendorError);
	const [validationError, setValidationError] = useState(false);
	const dispatch = useAppDispatch();

	const onSubmitForm = useCallback(async () => {
		setValidationError(false);
		if (!name && !address && !regCode) {
			return setValidationError(true);
		}
		const response = await dispatch(
			thunkUpdateVendor({
				name,
				address,
				regCode,
				code: data.code,
				id: data._id,
			}),
		);
		console.log(response);
		//@ts-ignore
		if (response.payload.status === 200) {
			dispatch(thunkGetVendorsList());
			onClose();
		}
	}, [name, regCode, address]);

	const onChangeName = useCallback(
		(e) => {
			dispatch(updateVendorActions.setName(e.target.value));
		},
		[name, dispatch],
	);
	const onChangeAddress = useCallback(
		(e) => {
			dispatch(updateVendorActions.setAddress(e.target.value));
		},
		[address, dispatch],
	);
	const onChangeRegCode = useCallback(
		(e) => {
			dispatch(updateVendorActions.setRegCode(e.target.value));
		},
		[regCode, dispatch],
	);

	useEffect(() => {
		if (data) {
			dispatch(updateVendorActions.setName(data.name));
			dispatch(updateVendorActions.setAddress(data.address));
			dispatch(updateVendorActions.setRegCode(data.regCode));
		}
	}, []);
	return (
		<div className={cls(s.UpdateVendorForm, className)}>
			<img onClick={onClose} className={s.closeIcon} src={closeIcon} />
			<Text className={s.title} title={'Change vendor details'} />
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
					Change
				</Button>
			</div>
			{error && <p>Server Error</p>}
			{validationError && <p>Validation Error</p>}
		</div>
	);
};
