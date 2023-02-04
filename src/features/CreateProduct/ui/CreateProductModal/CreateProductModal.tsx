import { FC } from 'react';

import { Modal } from 'shared/ui';

import { CreateProductForm } from '../CreateProductForm/CreateProductForm';

interface CreateProductModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const CreateProductModal: FC<CreateProductModalProps> = ({
	className,
	isOpen,
	onClose,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<CreateProductForm onClose={onClose} />
		</Modal>
	);
};
