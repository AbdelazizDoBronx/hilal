import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from './userSlice'; 
import { useDispatch } from 'react-redux';

const BASE_URL = 'http://localhost:3001/api/';

export const apiSlice = createApi({
  reducerPath: 'apislice',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => 'check-auth',
    }),
  }),
});

export const { useCheckAuthQuery } = apiSlice;

