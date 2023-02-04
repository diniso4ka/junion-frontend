export const searchProductsByIncludes = (data, searchValue) => {
	const convertedData = data.map((item) => ({
		...item,
		searchData: `${item.vendor}-${item.art} ${item.category.join(' ')} ${
			item.name
		} ${item.price} ${item.quantity} ${item.unit} ${item.owner}
        `,
	}));
	const filteredData = convertedData.filter((item) =>
		item.searchData.toLowerCase().includes(searchValue.toLowerCase()),
	);
	return filteredData;
};
export const searchVendorsByIncludes = (data, searchValue) => {
	const convertedData = data.map((item) => ({
		...item,
		searchData: Object.values(item).reduce(
			(string, cur) => string + `${cur} `,
			'',
		),
	}));
	const filteredData = convertedData.filter((item) =>
		item.searchData.toLowerCase().includes(searchValue.toLowerCase()),
	);
	return filteredData;
};
