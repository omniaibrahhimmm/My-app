import PostItem from "../../components/posts/PostItem";
import Loading from "../Loader/Loading";
import { useParams } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../CounterContext/AuthContext";

export default function PostDetails() {
    const { userData } = useContext (AuthContext);

  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetch(
    ["details-post", id],
    `posts/${id}`,
userData,
  );
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["details-post", id],
  //   queryFn: getAllPosts,
  // });
  // async function getAllPosts() {
  //   return axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
  //     headers: {
  //       token: localStorage.getItem("token"),
  //     },
  //   });
  // }
  return (
    <>
      <section className="p-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-6 ">
            {isLoading && <Loading />}
            {isError && <div className="text-center text-4xl">{error.message}</div>}
            {data && <PostItem post={data.post} showAllComments={true} />}
          </div>
        </div>
      </section>
    </>
  );
}
