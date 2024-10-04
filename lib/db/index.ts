interface Query {
	query: string;
	variables?: object;

	method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
}

export async function bigFetchQuery({
	query,
	variables,
	method = "POST",
}: Query) {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
			{
				method,
				headers: {
					"Content-Type": "application/json",
					apikey: process.env.NEXT_PUBLIC_GRAPHQL_API_KEY as string,
				},
				body: JSON.stringify({
					query,
					variables,
				}),
				cache: "no-store",
			}
		);

		// Check if the request was successful
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		if (data.errors) {
			throw new Error(data.errors[0].message || "GraphQL error occurred");
		}

		return data.data;
	} catch (error) {
		console.error("Error in GraphQL query:", error);
		throw new Error(`Failed to execute query: ${error}`);
	}
}
