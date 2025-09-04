import React from "react";
import { Outlet } from "react-router-dom";
import AppFooter from "./Footer/Footer";
import AppNav from "./NavBar/NavBar";
import { Offline, Online } from "react-detect-offline";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export default function Layout() {
  return (
    <>
      <main className="dark:bg-gray-900 dark:text-gray-100">
        <AppNav />
        <div>
          <Online>
            <Toast className="fixed top-24 right-10 z-50" >
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                Only shown when you're online
              </div>
              <ToastToggle />
            </Toast>
          </Online>
          <Offline>
            <Toast className="fixed top-24 right-10 z-50">
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <HiX className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                Only shown offline (surprise!)
              </div>
              <ToastToggle />
            </Toast>
          </Offline>
        </div>
        <div className="min-h-screen">
          <Outlet />
        </div>
        <AppFooter />
      </main>
    </>
  );
}
