// baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../config/config';
import { RootState } from '../redux/store';

 const baseApi = createApi({
 
  baseQuery: fetchBaseQuery({
    baseUrl: config.server.api.url,
    prepareHeaders: (headers, { getState }) => {
  

      // const token = (getState() as RootState).auth.token;
      const token = localStorage.getItem('token');
      if (token) {
       
        headers.set('Authorization', `Bearer ${token}`);
      }
     
      headers.set('Accept', 'application/json');
      
      return headers;
    }
 
  }),
  
  endpoints: () => ({}),
});

export default baseApi;