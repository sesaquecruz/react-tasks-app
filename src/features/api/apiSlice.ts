import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { audience, auth } from '../auth/auth';

const apiUrl = process.env?.REACT_APP_API_HOST ?? '';

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['Tasks'],
	baseQuery: fetchBaseQuery({ 
		baseUrl: apiUrl,
		prepareHeaders: async (headers) => {
			const isAuthenticated = auth.isAuthenticated();
			
			if (isAuthenticated) {
				const token = await auth.getAccessTokenSilently()({
					authorizationParams: {
					  audience: audience,
					},
				});

				headers.set('Authorization', `Bearer ${token}`);
			}
			
			return headers;
		}
	}),
	endpoints: (builder) => ({}),
});
