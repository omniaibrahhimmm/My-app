import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetch(queryKey, endPoint) {
  async function getAllPosts() {
    console.log("TOKEN:", localStorage.getItem("token"));

    return axios.get(`${import.meta.env.VITE_BASE_URL}/${endPoint}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey, endPoint],
    queryFn: getAllPosts,
    select: (data) => data.data,
  });

  return { data, isLoading, isError, error };
}
