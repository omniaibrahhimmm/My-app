import React, { useState } from "react";
import { Alert, Datepicker, Label, Radio, TextInput } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../../../components/shared/validationError/ValidationError";
import AppButton from "../../../components/shared/appButton/AppButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const defaultValues = {
  email: "",
  password: "",
  name: "",
  rePassword: "",
  gender: "",
  dateOfBirth: "",
};

// mhtag object 34n a create shkl l hb3to
const schema = Z.object({
  email: Z.email({ message: "enter a valid email address" }),
  name: Z.string({ message: "name is required" }).min(2, {
    message: "name is must be at least 2 characters",
  }),

  password: Z.string()
    .min(8, { message: "password must be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#\-.])[A-Za-z\d@$!%*?&_#\-.]{8,}$/,
      {
        message:
          "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special symbol",
      }
    ),

  rePassword: Z.string()
    .min(8, { message: "password must be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#\-.])[A-Za-z\d@$!%*?&_#\-.]{8,}$/,
      {
        message:
          "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special symbol",
      }
    ),
  dateOfBirth: Z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Enter a valid date (DD-MM-YYYY)",
  }),
  // or .literal
  gender: Z.enum(["male", "female"], { message: "must select a gender" }),
}).refine((data) => data.password === data.rePassword, {
  message: "passwords dont match ",
  path: ["rePassword"],
  // dh m3nah en message htzhr tht repassword w 3mlna refine 3nd object kber 34n ekon shyf repassword w password lw gwa  password msh heshof repassword
});
export default function Register() {
  const navigate = useNavigate();
  // form state error 34n azhr en fyh error w b7ot tht fi p

  const [apiError, setAppiError] = useState(null);
  useState();
  // 3ndy alread account f3wza ezhr message backend b3thaly  mn 5las useState(render) w 3wza client eshofhs

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  async function onSubmit(data) {
    try {
      const { data: response } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        data
      );

      if (response.message === "success") {
        setAppiError(null);
        // fyh condition sccuess btkon b null
        navigate("/Login");
      } else if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
      setAppiError(error.response.data.error);

      // dh message already mwgoda fi log error gwa response gwa data wlzm aroh a3rdha ry return b condition lw fy errir
    }
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="max-w-md mx-auto shadow-lg dark:bg-gray-800 p-8">
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
                type="text"
                placeholder="name@flowbite.com"
                {...register("email", { required: "Email is required" })}
              />
              <p className="text-red-600 text-sm">{errors.email?.message}</p>
            </div>

            {/* *************** Name ************* */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Your name</Label>
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Omnia Ibrahim"
                {...register("name", { required: "Name is required" })}
              />
              <p className="text-red-600 text-sm">{errors.name?.message}</p>
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

            {/* *************** Confirm Password ************* */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rePassword">Confirm password</Label>
              </div>
              <TextInput
                id="rePassword"
                type="password"
                placeholder="**********"
                {...register("rePassword")}
              />

              <p className="text-red-600 text-sm">
                {errors.rePassword?.message}
              </p>
            </div>

            {/* *************** Date of Birth ************* */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dateOfBirth">Date of birth</Label>
              </div>

              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Datepicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date?.toISOString().split("T")[0])
                    }
                    dateFormat="dd-MM-yyyy"
                  />
                )}
              />

              <p className="text-red-600 text-sm">
                {errors.dateOfBirth?.message}
              </p>
            </div>

            {/* *************** Gender ************* */}
            <div>
              <div className="mb-2 block">
                <Label>Gender</Label>
              </div>
              <div className="flex max-w-md flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Radio id="female" {...register("gender")} value="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="male" {...register("gender")} value="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
              </div>

              <p className="text-red-600 text-sm">{errors.gender?.message}</p>
            </div>
            {/* <AppButton/> */}
            {/* is loading dh props w  */}

            <AppButton disabled={!isValid} isLoading={isSubmitting}>
              register
            </AppButton>
            {/* dh afdl 34n a2dr agher esm l button lw 3ndy kza button w ab3t hnak children  */}
          </form>
        </div>
      </div>
    </section>
  );
}
