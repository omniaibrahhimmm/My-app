import React from "react";
import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900">
      <HashLoader color="white" cssOverride={{}} loading size={50} />
      <p className="mt-4 text-white text-lg font-medium">
        Loading, please wait...
      </p>
    </div>
  );
}
