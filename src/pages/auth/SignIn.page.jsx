import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../store/endpoint/auth.endpoint";
import { Loader2 } from "lucide-react";
import AuthGuard from "../../components/guard/Auth.Guard";

const SignInPage = () => {
  const nav = useNavigate();
  const [fun, data] = useSignInMutation();
  const initialValue = {
    email: "",
    password: "",
  };
  const handleSubmit = async (v) => {
    await fun(v);
  };
  useEffect(() => {
    if (data?.data?.success) {
      console.log(data);
      nav("/home");
    }
  }, [data]);
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "password is at least 8 characters"),
  });
  return (
    <AuthGuard check={data?.data?.success} token={data?.data?.token}>
      <div className="w-3/5 mx-auto h-full flex justify-center items-center">
        <Card className="basis-2/4 p-5">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="">Sign In</CardTitle>
            <CardDescription className="text-lightBlue">
              <Link to={"/sign_up"}>I don't have an account</Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={initialValue}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              validateOnChange={false}
            >
              {({ handleBlur, handleChange, values, isSubmitting }) => (
                <>
                  <Form className="flex flex-col gap-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="email"
                      component={"p"}
                    />
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="password"
                      component={"p"}
                    />
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-lightBlue mt-3"
                    >
                      Sign In{" "}
                      {isSubmitting && (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  </Form>
                </>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
};
export default SignInPage;
