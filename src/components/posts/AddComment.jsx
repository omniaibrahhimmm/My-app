import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button, Textarea } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import AppButton from "../shared/appButton/AppButton";

export default function AddComment({ post }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();
  const QueryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: AddComment,

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
      QueryClient.invalidateQueries(["details-post", post]);
      // rerender comments
    },
    onError: (error) => {
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
  });

  async function AddComment(data) {
    const CommentData = { ...data, post };

    return await axios.post(
      `${import.meta.env.VITE_BASE_URL}/comments`,
      CommentData,

      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
      <Textarea
        {...register("content", { required: true })}
        id="comment"
        placeholder="Leave a comment..."
        rows={2}
      />

      <AppButton
        isLoading={isPending}
        disabled={!isValid || isPending}
        type="submit"
      >
        create comment
      </AppButton>
    </form>
  );
}
