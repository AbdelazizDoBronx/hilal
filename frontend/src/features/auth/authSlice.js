import { apiSlice } from '../api/apiSlice';
import { setUser, clearUser } from '../user/userSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.token);
          dispatch(setUser(data.user));
        } catch {
          dispatch(clearUser());
        }
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'register',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('token');
          dispatch(clearUser());
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),
    checkAuth: builder.query({
      query: () => ({
        url: 'check-auth',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          localStorage.removeItem('token');
          dispatch(clearUser());
        }
      },
      // Skip the query if there's no token
      skip: () => !localStorage.getItem('token'),
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: 'update-profile',
        method: 'PUT',
        body: userData,
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch (error) {
          console.error('Profile update failed:', error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCheckAuthQuery,
  useUpdateProfileMutation
} = authApiSlice;
