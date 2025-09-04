import * as z from "zod";

const max_upload_size = 4 * 1024 * 1024; // 4MB
const allowed_img_types = ["image/jpeg", "image/png", "image/jpg"];

export const profileImg = z.object({
  photo: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Please select one image")
    .refine(
      (files) => files[0]?.size <= max_upload_size,
      "File size must be less than 4MB"
    )
    .refine(
      (files) => allowed_img_types.includes(files[0]?.type),
      "Image must be JPEG, JPG, or PNG"
    ),
});
