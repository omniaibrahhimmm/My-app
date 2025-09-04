import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/AppRoutes";
import CounterContextProvider from "./CounterContext/CounterContext";
import AuthContextProvider from "./CounterContext/AuthContext";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const QueryClients = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={QueryClients}>
        <AuthContextProvider>
          <CounterContextProvider>
            <RouterProvider router={router} />
            <ToastContainer />

            <ReactQueryDevtools />
          </CounterContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      
      {/* بالتالي: أي صفحة أو كومبوننت في المشروع يقدر يستعمل:
من غير ما نبعت props يدوي لكل مستوى. */}
    </>
  );
}

export default App;
