import { fetchMedia } from "@/modules/media/api/get";
import { useQuery } from "@tanstack/react-query";

export const useMedia = () => {
  return useQuery({
    queryKey: ["media"],
    queryFn: fetchMedia,
    staleTime: 1000 * 60 * 5, // 5 минут
  });
};
