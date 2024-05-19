import React, { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  useCreateMutation,
  useUpdateMutation,
} from "../../../store/endpoint/contact.endpoint";
import { SheetClose } from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

const FormTool = ({ editData, handleClose }) => {
  const [updateFun, apiData] = useUpdateMutation();
  const CloseRef = useRef();
  const initialValue = {
    name: editData.data?.name || "",
    email: editData.data?.email || "",
    phone: editData.data?.phone || "",
    address: editData.data?.address || "",
  };
  const [fun, { data, isLoading, isError }] = useCreateMutation();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name field is required")
      .min(2, "name should be longer than 2"),
    email: Yup.string()
      .required("email field is required")
      .email("invalid email format"),
    phone: Yup.string()
      .required("phone field is required")
      .min(9, "phone number at least 9")
      .max(11, "phone number should not be longer than 11"),
    address: Yup.string().required("address field is required"),
  });
  const handleSubmit = async (value) => {
    if (editData.edit) {
      await updateFun({ id: editData.data?.id, ...value });
    } else {
      await fun(value);
    }
    CloseRef.current.click();
  };
  useEffect(() => {
    console.log("Success", data, isLoading, isError);
  }, [data, isLoading, isError]);
  return (
    <div className="grid gap-4 py-4 h-full">
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleBlur, handleChange, values, isSubmitting }) => (
          <>
            <Form className="flex flex-col gap-4 h-full justify-between pb-12">
              <div className="space-y-5 mt-5">
                <div>
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
                    className="text-danger"
                    name="name"
                    component={"p"}
                  />
                </div>
                <div className="">
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
                </div>
                <div className="">
                  <Label htmlFor="phone">phone</Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="phone"
                    component={"p"}
                  />
                </div>
                <div className="">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    name="address"
                    id="address"
                    placeholder="Enter your address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="address"
                    component={"p"}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <SheetClose asChild ref={CloseRef}>
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    type="button"
                    className="w-full text-lightBlue border-lightBlue mt-3"
                  >
                    Cancel
                    {isSubmitting && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </Button>
                </SheetClose>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-lightBlue mt-3"
                >
                  Create
                  {isSubmitting && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default FormTool;
