import { FC } from 'react';

import { Modal } from 'shared/ui';

import { CreateVendorForm } from '../CreateVendorForm/CreateVendorForm';

interface CreateProductModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const CreateVendorModal: FC<CreateProductModalProps> = ({
	isOpen,
	onClose,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<CreateVendorForm onClose={onClose} />
		</Modal>
	);
};
