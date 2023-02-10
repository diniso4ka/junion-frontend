import cls from 'classnames';
import { FC } from 'react';

import { discountConvertInPercent } from 'shared/helpers/math/discountPrice';
import { Checkbox, DiscountTag } from 'shared/ui';

import { Vendor } from '../../../model/types/VendorsSchema';

import s from './TableRow.module.scss';

interface TableRow {
	className?: string;
	selected?: boolean;
	onSelect?: (item) => void;
	item: Vendor;
}

export const TableRow: FC<TableRow> = ({
	className,
	item,
	selected,
	onSelect,
}) => {
	return (
		<ul className={cls(s.TableRow)}>
			<li>
				<Checkbox value={selected} onClick={() => onSelect(item)} />
			</li>
			<li className={s.item}>{item.code}</li>
			<li className={s.item}>{item.name}</li>
			<li className={s.item}>{item.regCode}</li>
			<li className={s.item}>{item.address}</li>
		</ul>
	);
};
