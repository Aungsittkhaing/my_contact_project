import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./service/ApiService";

export const store = configureStore({
    reducer : {
        [apiService.reducerPath] : apiService.reducer
    },
    middleware : (getDefaultMiddle) => getDefaultMiddle().concat(apiService.middleware)
});