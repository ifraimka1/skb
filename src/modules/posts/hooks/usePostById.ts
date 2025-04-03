// posts/api/usePostById.ts
import { fetchPostById } from "@/modules/posts/api/get";
import { useQuery } from "@tanstack/react-query";
import { App } from "@/shared/types/app";

export const usePostById = (id: number) => {
  return useQuery<App.WpPost>({
    queryKey: [id],
    queryFn: fetchPostById,
    enabled: !!id,
  });
};
