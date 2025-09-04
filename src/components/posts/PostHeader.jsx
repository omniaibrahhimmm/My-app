import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import React, { useContext } from "react";
import { FormateDate } from "../../Lib/FormateDate";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../CounterContext/AuthContext";

export default function PostHeader({
  user: { name, photo, createdAt, _id },
  mediaId,
  isComment,
  setIsEditing,
  onDelete,
}) {
  const { userData } = useContext(AuthContext);

  const QueryClient = useQueryClient();

  const { mutate: HandleRemovePost } = useMutation({
    mutationFn: DeletePost,
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

  async function DeletePost() {
    const endPoint = isComment ? "comments" : "posts";
    return await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/${endPoint}/${mediaId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  return (
    <>
      {/* header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center">
          <picture>
            <Avatar
              alt={name}
              img={
                !photo.includes("undefined")
                  ? photo
                  : `${
                      import.meta.env.VITE_BASE_URL
                    }/uploads/default-profile.png`
              }
              // 34n sour s3t btkon gya bayza
              rounded
              className="me-4"
            />
          </picture>
          <div>
            <h2 className="capitalize text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h2>
            <span>{FormateDate(createdAt)}</span>
            {/* am- pm ===> en-us */}
          </div>
        </div>

        {userData?._id === _id && (
          <Dropdown inline label="">
            <DropdownItem onClick={() => setIsEditing(true)}>Edit</DropdownItem>

            <DropdownItem
              onClick={() => {
                if (onDelete) {
                  onDelete();
                } else {
                  HandleRemovePost(); // الخاص بالبوست نفسه
                }
              }}
            >
          
              Delete
            </DropdownItem>
          </Dropdown>
        )}
      </header>
    </>
  );
}
