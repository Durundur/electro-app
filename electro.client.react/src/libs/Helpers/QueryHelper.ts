export const buildQueryString = (query: object): string => {
	const params = new URLSearchParams();

	for (const [key, value] of Object.entries(query)) {
		if (value !== undefined && value !== null && value !== "") {
			if (Array.isArray(value)) {
				const correctValue = value.filter((v) => !!v);
				if (correctValue.length === 0) {
					continue;
				}
				params.append(key, correctValue.join(";"));
			} else {
				params.append(key, value.toString());
			}
		}
	}

	return params.toString();
};

export const buildQueryStringWithDuplicatedKey = (query: object): string => {
	const params = new URLSearchParams();

	for (const [key, value] of Object.entries(query)) {
		if (Array.isArray(value)) {
			value.forEach((item) => {
				if (item !== undefined && item !== null && item !== "") {
					params.append(key, item.toString());
				}
			});
		} else if (value !== undefined && value !== null && value !== "") {
			params.append(key, value.toString());
		}
	}

	return params.toString();
};
