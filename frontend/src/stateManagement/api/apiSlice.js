import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Users'],  // this is optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  endpoints: (builder) => ({}), // we'll add this later :)
});