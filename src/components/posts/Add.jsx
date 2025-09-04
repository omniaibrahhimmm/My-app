import React, { useRef } from "react";
import { Button, Card, Label, Textarea } from "flowbite-react";
import { MdFileDownload } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppButton from "../shared/appButton/AppButton";

export default function Add() {
  const fileInputRef = useRef();

  const queryClient = useQueryClient()
    const { register, handleSubmit, reset, formState: {isValid} } = useForm();

const {mutate, isPending}=
  useMutation({
    mutationFn:addPosts,

onSuccess: (data) => {
  reset(); 
  toast.success(data.data.message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
  queryClient.invalidateQueries(["All-posts"])  
  queryClient.invalidateQueries(["user-posts"])

},
onError:( error) => {
     toast.error(error.response?.data?.error || "Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
},
  })

  async function addPosts(data) {
    console.log(data.body, fileInputRef.current.files[0]);

    const formData = new FormData();
    formData.append("body", data.body);
    if (fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

return await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,

        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

    // try {
    //   const { data } = await axios.post(
    //     `${import.meta.env.VITE_BASE_URL}/posts?sort=-createdAt`,

    //     formData,
    //     {
    //       headers: {
    //         token: localStorage.getItem("token"),
    //       },
    //     }
    //   );

    //   if (data.message === "success") {
    //     reset();
    //     toast.success(data.message, {
    //       position: "top-center",
    //       autoClose: 5000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //       transition: Bounce,
    //     });
    //   } else if (data.error) {
    //     throw new Error("Something Went Wrong");
    //   }
    // } catch (error) {
    //   toast.error(error.response?.data?.error || "Something went wrong", {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
  }

  return (
    <section className="py-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <form
            onSubmit={handleSubmit(mutate)}
            className="flex flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="comment">post something</Label>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Textarea
                {...register("body")}
                id="comment"
                placeholder="Leave a comment..."
                rows={2}
              />

              <input
                {...register("image")}
                className="hidden"
                type="file"
                ref={fileInputRef}
              />
              <MdFileDownload
                onClick={() => fileInputRef.current.click()}
                className="text-4xl cursor-pointer"
              />
            </div>
      <AppButton  isLoading={isPending} disabled={!isValid || isPending} type="submit">create Post</AppButton>
          </form>
        </Card>
      </div>
    </section>
  );
}
