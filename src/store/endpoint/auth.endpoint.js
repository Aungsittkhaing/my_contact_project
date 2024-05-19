import { apiService } from "../service/ApiService";

const authEndPoints = apiService.injectEndpoints({
    endpoints : (builder) => ({
        signIn : builder.mutation({
            query : (data) => ({
                url : "login",
                method : "POST",
                body : data
            })
        }),
        signUp : builder.mutation({
            query : (data) => ({
                url : "register",
                method : "POST",
                body : data
            })
        }),
        profile : builder.query({
            query : () => "user-profile"
        }),
        logout: builder.mutation({
            query: () => ({
              url: "user-logout",
              method: "POST",
            }),
          }),
    })
});
export const {useSignInMutation, useSignUpMutation, useProfileQuery, useLogoutMutation} = authEndPoints;