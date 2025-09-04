import React, { useContext, useState } from "react";
import { MdEditSquare } from "react-icons/md";

import {
  Avatar,
  Button,
  Card,
  Dropdown,
  DropdownItem,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import { AuthContext } from "../../CounterContext/AuthContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import AppButton from "../shared/appButton/AppButton";
import {zodResolver} from "@hookform/resolvers/zod"
import {profileImg} from "../../schema/ProfileImg.schema.js";
import {toast} from "react-toastify";

export default function ProfileData() {
  const { userData, getProfileData } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(null);
  const { register, handleSubmit, formState:{errors} } = useForm(
      {
        resolver: zodResolver(profileImg),
        mode: onchange
      }
  );

  async function changeProfilePhoto(data) {
    const formData = new FormData(
    );
    formData.append("photo", data.photo[0]);
    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}/users/upload-photo`,

      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  const { mutate: handleChangeProfilePhoto, isPending } = useMutation({
    mutationFn: changeProfilePhoto,
    onSuccess: () => {
      setOpenModal(false);
      toast.success("photo uploadedd successfully", { theme: "dark" });
      getProfileData(localStorage.getItem("token"));
    },

    onerror: () => {
      toast.error("photo uploading failed", { theme: "dark" });
    },
  });
  //   34n ezhr bynat user
  return (
    <>
      <Card className="max-w-3xl mx-auto">
        {userData && (
          <div className="flex flex-col items-center pb-10">
            <div className="relative">
              <Avatar
                className="mb-3 rounded-full shadow-lg size-24 Avatar"
                alt={userData.name}
                img={userData.photo}
                rounded
              />
              <MdEditSquare
                className="cursor-pointer dark:bg-gray-900 dark:text-white p-2 size-8 rounded absolute bottom-0 right-0"
                onClick={() => setOpenModal(true)}
              />
            </div>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {userData.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {userData.email}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {userData.gender}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {userData.dateOfBirth}
            </span>
            <div className="mt-4 fflex space-x-3 lg:mt-6">
              <Link
                to={"/changePassword"}
                className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Change Password
              </Link>
            </div>
          </div>
        )}
      </Card>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>

          {errors.photo && (
            <p>
              {errors.photo.message}
            </p>
          )}
          <form
            onSubmit={handleSubmit(handleChangeProfilePhoto)}
            className=" flex-col gap-4 flex w-full items-center justify-center"
          >
            <Label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <FileInput
                {...register("photo")}
                id="dropzone-file"
                className="hidden"
              />
            </Label>
            <AppButton type="submit">
              {" "}
              {isPending ? "uploading" : "upload"}{" "}
            </AppButton>
          </form>
        </ModalBody>
      </Modal>
    </>
    // 34n fy 3dy mezhr4 data gher lw fyh profile data
  );
}
