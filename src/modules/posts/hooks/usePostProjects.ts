// posts/api/useProjects.ts
import { fetchProjects } from "@/modules/posts/api/get";
import { useQuery } from "@tanstack/react-query";
import { App } from "@/shared/types/app";

export const useProjects = (tag: number) => {
  return useQuery<App.WpPost[]>({
    queryKey: [tag],
    queryFn: fetchProjects,
    enabled: !!tag,
  });
};
