export const buildQueryString = (query: object): string => {
	const params = new URLSearchParams();

	for (const [key, value] of Object.entries(query)) {
		if (value !== undefined && value !== null && value !== "") {
			params.append(key, value.toString());
		}
	}

	return params.toString();
};
