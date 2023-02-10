import cls from 'classnames';
import { FC } from 'react';

import { discountConvertInPercent } from 'shared/helpers/math/discountPrice';
import { Checkbox, DiscountTag } from 'shared/ui';

import { ProductType } from '../../../model/types/ProductsSchema';

import s from './TableRow.module.scss';

interface TableRow {
	className?: string;
	selected?: boolean;
	onSelect?: (item) => void;
	item: ProductType;
}

export const TableRow: FC<TableRow> = ({
	className,
	item,
	selected,
	onSelect,
}) => {
	return (
		<ul
			className={cls(s.TableRow, className, {
				[s.active]: selected,
			})}
		>
			<li>
				<Checkbox value={selected} onClick={() => onSelect(item)} />
			</li>
			<li className={s.item}>{`${item.vendor}-${item.art}`}</li>
			<li className={s.item}>
				{item.category.map((category) => `${category} `)}
			</li>
			<li className={s.item}>{item.name}</li>
			<li className={s.item}>
				{Number(discountConvertInPercent(item.price, item.discountPrice)) > 0 &&
				discountConvertInPercent(item.price, item.discountPrice) < 100 ? (
					<span className={s.discount}>
						{item.discountPrice}
						<DiscountTag
							discount={100 - (item.discountPrice * 100) / item.price}
						/>
					</span>
				) : (
					item.price
				)}
			</li>
			<li className={s.item}>{item.quantity}</li>
			<li className={s.item}>{item.unit ? item.unit : ''}</li>
			<li className={s.item} title={item.owner}>
				{item.owner}
			</li>
		</ul>
	);
};
