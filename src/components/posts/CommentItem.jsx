import { Card } from "flowbite-react";
import React, { useState } from "react";
import PostHeader from "./PostHeader";
import { Form } from "react-router-dom";
import AppButton from "../shared/appButton/AppButton";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function CommentItem({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const { handleSubmit, register } = useForm();
  const QueryClient = useQueryClient();

  const { mutate: HandleDeleteComment } = useMutation({
    mutationFn: DeleteComment,
    onSuccess: () => {
      toast.success("deleted success", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      // rerender comments
      QueryClient.invalidateQueries(["All-posts"]);
      QueryClient.invalidateQueries(["user-posts"]);
    },
    onError: () => {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
  });
  const { mutate: handleUpdateComment } = useMutation({
    mutationFn: UpdateComment,
    onSuccess: () => {
      toast.success("Updated success", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setIsEditing(false);

      // rerender comments
      QueryClient.invalidateQueries(["All-posts"]);
      QueryClient.invalidateQueries(["user-posts"]);
    },
    onError: () => {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
  });
  async function DeleteComment() {
    return await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/comments/${comment._id}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }

  async function UpdateComment(data) {
    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}/comments/${comment._id}`,
      data,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  return (
    <Card>
      <PostHeader
        user={{
          ...comment.commentCreator,
          createdAt: comment.createdAt,
        }}
        mediaId={comment._id}
        isComment={true}
        setIsEditing={setIsEditing}
         onDelete={HandleDeleteComment} 
      />
      {isEditing ? (
        <form onSubmit={handleSubmit(handleUpdateComment)}>
          <textarea
            className="mb-3"
            defaultValue={comment.content}
            {...register("content")}
          />
          <div className="flex gap-2">
            <AppButton type="submit">Update </AppButton>
            <AppButton
              type="reset"
              color="alternate"
              onClick={() => setIsEditing(false)}
            >
              cancel
            </AppButton>
          </div>
        </form>
      ) : (
        <h3 className=" textt-2xl font-bold tracking-tight text-grey-900 dark:text-white ">
          {comment.content}
        </h3>
      )}
    </Card>
  );
}
