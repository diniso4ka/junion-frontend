import cls from 'classnames';
import { FC, useState } from 'react';

import { Link } from 'react-router-dom';
import { Checkbox } from 'shared/ui/index';

import { discountConvertInPercent } from '../../../helpers/math/discountPrice';
import { DiscountTag } from '../../DiscountTag/DiscountTag';

import s from './TableRow.module.scss';

interface TableRow {
	className?: string;
	type: 'products' | 'vendors' | 'categories';
	selected?: boolean;
	onSelect?: (item) => void;
	item: any;
}

export const TableRow: FC<TableRow> = ({
	className,
	type,
	item,
	selected,
	onSelect,
}) => {
	return (
		<div
			className={cls(s.TableRow, className, {
				[s.active]: selected,
			})}
		>
			{type === 'products' && (
				<ul className={cls(s.items, s[type])}>
					<li>
						<Checkbox value={selected} onClick={() => onSelect(item)} />
					</li>
					<li className={s.item}>{`${item.vendor}-${item.art}`}</li>
					<li className={s.item}>
						{item.category.map((category) => `${category} `)}
					</li>
					<li className={s.item}>{item.name}</li>
					<li className={s.item}>
						{Number(discountConvertInPercent(item.price, item.discountPrice)) >
							0 &&
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
			)}
			{type === 'categories' && (
				<Link
					to={`/products?category=${item._id}`}
					className={cls(s.items, s[type])}
				>
					<li className={s.item}>{item._id}</li>
					<li className={s.item}>{item.quantity}</li>
				</Link>
			)}
			{type === 'vendors' && (
				<ul className={cls(s.items, s[type])}>
					<li>
						<Checkbox value={selected} onClick={() => onSelect(item)} />
					</li>
					<li className={s.item}>{item.code}</li>
					<li className={s.item}>{item.name}</li>
					<li className={s.item}>{item.regCode}</li>
					<li className={s.item}>{item.address}</li>
				</ul>
			)}
		</div>
	);
};
