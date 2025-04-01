// posts/api/usePosts.ts
import { fetchPosts } from "@/modules/posts/api/get";
import { App } from "@/shared/types/app";
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
  return useQuery<App.PostsResult>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
  });
};
