import React, { useState } from "react";
import Nav from "../../components/nav/Nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaPlus } from "react-icons/fa";
import EmptyLottie from "../../components/lottieComponents/Empty.lottie";
import AuthGuard from "../../components/guard/Auth.Guard";
import FormTool from "./tool/Form.tool";
import { useGetQuery } from "../../store/endpoint/contact.endpoint";
import DataTableTool from "./tool/DataTable.tool";

const HomePage = () => {
  const { data, isLoading, isError, isSuccess } = useGetQuery();
  const [editData, setEditData] = useState({ edit: false, data: null });

  const handleEdit = (id) => {
    const apiData = data?.contacts?.data;
    const finder = apiData.find((i) => i.id === id);
    setEditData({ edit: true, data: finder });
    console.log(finder);
  };
  const handleClose = () => {
    setEditData({ edit: false, data: null });
  };
  return (
    <AuthGuard>
      <Sheet>
        <div className="w-screen h-screen bg-[#fcfcfd]">
          <Nav />
          <div className="px-52 mx-auto">
            <div className="flex justify-end mb-5">
              <SheetTrigger asChild>
                <Button className="bg-lightBlue space-x-2 mt-2">
                  <FaPlus />
                  <p>Create Contact</p>
                </Button>
              </SheetTrigger>
            </div>
            {data?.contacts?.data?.length > 0 ? (
              <DataTableTool
                handleEdit={handleEdit}
                apiData={data?.contacts?.data}
              />
            ) : (
              <div className="w-full bg-white h-[600px] mt-5 rounded border flex flex-col justify-center items-center">
                <EmptyLottie />
                <p className="font-semibold text-gray-400">There is no list!</p>
              </div>
            )}
          </div>
          <SheetContent onClose={handleClose} onOverlayClick={handleClose}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <FormTool editData={editData} handleClose={handleClose} />
            {/* <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
          </SheetContent>
        </div>
      </Sheet>
    </AuthGuard>
  );
};

export default HomePage;
