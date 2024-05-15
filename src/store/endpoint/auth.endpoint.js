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
        })
    })
});
export const {useSignInMutation, useSignUpMutation, useProfileQuery} = authEndPoints;