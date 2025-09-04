import PostItem from "./PostItem";
import Add from "./Add";
import Loading from "../../Pages/Loader/Loading";
import { AuthContext } from "../../CounterContext/AuthContext";
import { useContext, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function PostsList({ isHome = true }) {
  const { userData } = useContext(AuthContext);

  // 🟢 لو Home → useInfiniteQuery
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["all-posts"],
    queryFn: ({ pageParam = 1 }) =>
      axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts?sort=-createdAt&page=${pageParam}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      ),
    getNextPageParam: (lastPage) => {
      const { currentPage, nextPage } = lastPage.data.paginationInfo;
      return currentPage < nextPage ? nextPage : undefined;
    },
    enabled: isHome, // ✅ يشتغل بس لو الصفحة الرئيسية
  });

  // 🟢 لو User Profile → useQuery عادي (من غير pagination)
  const {
    data: userPosts,
    isLoading: userLoading,
    isError: userError,
    error: userErrorObj,
  } = useQuery({
    queryKey: ["user-posts", userData?._id],
    queryFn: () =>
      axios.get(
`${import.meta.env.VITE_BASE_URL}/users/${userData?._id}/posts`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      ),
    enabled: !isHome && !!userData?._id,
  });

  // 🟢 Scroll event (للـ home بس)
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50;

      if (bottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section className="p-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-6 ">
          {/* 🟢 Loading states */}
          {(isLoading || userLoading) && <Loading />}

          {/* 🟢 Error states */}
          {(isError || userError) && (
            <div className="text-center text-4xl">
              {error?.message || userErrorObj?.message}
            </div>
          )}

          {/* 🟢 Home posts (paginated) */}
          {isHome &&
            data?.pages.map((page, i) =>
              page.data.posts.map((post) => (
                <PostItem key={post._id + i} post={post} />
              ))
            )}

          {/* 🟢 User posts (single fetch) */}
          {!isHome &&
            userPosts?.data?.posts?.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}

          {/* 🟢 Infinite scroll feedback */}
          {isHome && isFetchingNextPage && (
            <p className="text-center">Loading more...</p>
          )}
          {isHome && !hasNextPage && (
            <p className="text-center text-gray-500">No more posts</p>
          )}
        </div>
      </div>
    </section>
  );
}
