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
			authorization: token ? `Bearer ${token}` : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtaXQuc2hhaEBicmFpbnZpcmUuY29tIiwiaWQiOjYsInJvbGUiOjQzLCJ0b2tlblVVSUQiOiI5ZTRhZGM3MC0wMGMzLTQ4MjItODliMC1lZTZjODc5OTFiZTEiLCJ1dWlkIjoiNTExZGNiNDItZTE5MC00OWE3LThjOGUtZWMwODljNGNkODExIiwiaWF0IjoxNzM0NDE4MTQ2LCJleHAiOjE3MzQ0MjE3NDZ9.etVE9o_Ijt8tlXKEfzIdyuZGG8bhUTlXRt6C1VCowjE`,
		},
	};
});

// Apollo Client
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
