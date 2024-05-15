import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "../../lib/constant";

export const apiService = createApi({
   reducerPath : "api",
   baseQuery : fetchBaseQuery({
    baseUrl : API_ENDPOINT,
    prepareHeaders : (headers, {getState}) => {
      const token = localStorage.getItem("token");
      if(token){
         headers.set("authorization", `Bearer ${JSON.parse(token)}`);
      }
    }
   }),
   endpoints : (builder) => ({})
});