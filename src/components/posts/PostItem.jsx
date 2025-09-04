import React, { useState } from "react";
import { Avatar, Card } from "flowbite-react";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import PostHeader from "./PostHeader";
import CommentItem from "./CommentItem";
import AddComment from "./AddComment";
import { Bounce, toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import AppButton from "../shared/appButton/AppButton";

export default function PostItem({ post, showAllComments = false }) {
  const { body, image, user, comments, _id, createdAt } = post;
  const { handleSubmit, register } = useForm();

  const [isEditing, setIsEditing] = useState(false);
  const QueryClient = useQueryClient();

  const { mutate: handleUpdatePost } = useMutation({
    mutationFn: UpdatePost,
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
  async function UpdatePost(data) {
    const formData = new FormData();
    formData.append("body", data.body);

    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}/posts/${post._id}`,
      formData,
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
        user={{ ...user, createdAt, body }}
        mediaId={_id}
        isComment={false}
        setIsEditing={setIsEditing}
        // 34n delete post
      />
      {/* content */}
      {isEditing ? (
        <form onSubmit={handleSubmit(handleUpdatePost)}>
          <textarea
            className="mb-3"
            defaultValue={body}
            {...register("body")}
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
          {body}
        </h3>
      )}
      {image && (
        <img
          src={image}
          className="w-full h-96 object-cover rounded-lg"
          alt={body}
        />
      )}
      {/* footer */}
      <footer className="flex justify-between items-center">
        <AiFillLike />
        <div className="flex gap-4">
          <FaComment />
          {comments && comments.length}
        </div>

        <Link to={`/posts/${_id}`}>
          <FaShareAlt className="cursor-pointer" />
        </Link>
      </footer>
      {/* comments  */}

      {comments &&
        comments.length > 0 &&
        (showAllComments ? (
          <>
            {comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
          </>
        ) : (
          <>
            <CommentItem comment={comments[comments.length - 1]} />
          </>
        ))}

      <AddComment post={_id} />
    </Card>
  );
}
