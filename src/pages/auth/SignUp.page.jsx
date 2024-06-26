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
import { Loader2 } from "lucide-react";
import { useSignUpMutation } from "../../store/endpoint/auth.endpoint";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "../../components/guard/Auth.Guard";

const SignUpPage = () => {
  const nav = useNavigate();
  const { toast } = useToast();
  const [fun, data] = useSignUpMutation();
  const initialValue = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const handleSubmit = async (v) => {
    await fun(v);
  };
  useEffect(() => {
    if (data.error) {
      toast({
        title: "Auth Error from server",
        description: data.error.data.message,
      });
    } else if (data.data) {
      nav("/");
    }
  }, [data]);
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name should be longer than 2"),
    email: Yup.string()
      .required("Email is required")
      .email("invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "password is at least 8 characters"),
    password_confirmation: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  return (
    <AuthGuard path="/sign_up">
      <div className="w-3/5 mx-auto h-full flex justify-center items-center">
        <Card className="basis-2/4 p-5">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="">Sign Up</CardTitle>
            <CardDescription className="text-lightBlue">
              <Link to={"/"}>Already have an account?</Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={initialValue}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ handleBlur, handleChange, values, isSubmitting }) => (
                <>
                  <Form className="flex flex-col gap-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <ErrorMessage
                      className="text-danger text-sm"
                      name="name"
                      component={"p"}
                    />
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
                      className="text-danger text-sm"
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
                      className="text-danger text-sm"
                      name="password"
                      component={"p"}
                    />
                    <Label htmlFor="password_confirmation">
                      Confirm Password
                    </Label>
                    <Input
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                      placeholder="Enter your confirm password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password_confirmation}
                    />
                    <ErrorMessage
                      className="text-danger text-sm"
                      name="confirm_password"
                      component={"p"}
                    />
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-lightBlue mt-3"
                    >
                      Sign Up{" "}
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
export default SignUpPage;
