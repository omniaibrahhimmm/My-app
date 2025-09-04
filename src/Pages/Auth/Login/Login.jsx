import React, { useState } from "react";
import { Alert, Label, Radio, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AppButton from "../../../components/shared/appButton/AppButton";
import ValidationError from "../../../components/shared/validationError/ValidationError";
import { HiInformationCircle } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../../CounterContext/AuthContext";

const defaultValues = {
  email: "",
  password: "",
};

const schema = Z.object({
  email: Z.email({ message: "enter a valid email address" }),
  password: Z.string()
    .min(8, { message: "password must be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#\-.])[A-Za-z\d@$!%*?&_#\-.]{8,}$/,
      {
        message:
          "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special symbol",
      }
    ),
});

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  // (navigate) برمجيًا من غير ما تعمل refresh للمتصفح.

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  async function onSubmit(data) {
    try {
      const { data: response } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        data
      );

      if (response.message === "success") {
        setApiError(null);
        localStorage.setItem("token", response.token);
        // dh 34n lw 3mel 3wz efdl user hta lw 3ml refresh bnsgl bynat 3mel
        setToken(response.token);
        navigate("/");
      } else if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
      setApiError(error.response.data.error);
    }
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="max-w-md mx-auto shadow-lg dark:bg-gray-800 p-8">
          <h1 className="text-center">Login in</h1>
          {apiError && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span className="font-medium my-4">{apiError}</span>
            </Alert>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* *************** Email ************* */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@flowbite.com"
                {...register("email", { required: "Email is required" })}
              />
              <ValidationError error={errors.email?.message} />
            </div>

            {/* *************** Password ************* */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Password</Label>
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="**********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <ValidationError error={errors.password?.message} />
            </div>

            <AppButton isLoading={isSubmitting}>Sign in </AppButton>
          </form>
        </div>
      </div>
    </section>
  );
}
