export type gqlParams = {
	query: string;
	variables?: object;
};

export const wpQuery = async ({ query, variables = {} }: gqlParams) => {
	const response = await fetch(`${import.meta.env.WORDPRESS_API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	if (!response.ok) {
		console.error(response);
		throw new Error('Failed to fetch data');
	}

	const { data } = await response.json();

	return data;
};
