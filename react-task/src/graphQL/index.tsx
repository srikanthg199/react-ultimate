import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_API_GATEWAY_URL,
});

// Authentication Link
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('authToken');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtaXQuc2hhaEBicmFpbnZpcmUuY29tIiwiaWQiOjYsInJvbGUiOjQzLCJ0b2tlblVVSUQiOiIzOGU3NTUxNy0zYzk1LTQ2MzktYTVhNi1lYTM3NTkzZWZlOTIiLCJ1dWlkIjoiNTExZGNiNDItZTE5MC00OWE3LThjOGUtZWMwODljNGNkODExIiwiaWF0IjoxNzM0NjczNTU2LCJleHAiOjE3MzQ2NzcxNTZ9.6xzoRKnfGBcybJQczH7q-E_HLOVWhcNCPvIpWt2sXqI`,
		},
	};
});

// Apollo Client
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
