import { skbEndpoint } from "@/shared/api/wp-client";
import { SKBKit } from "@/shared/types/app";

export const fetchNews = async <T = SKBKit.News[]>(params?: {
  count?: number;
  offset?: number;
}): Promise<SKBKit.ApiResponse<T>> => {
  const url = new URL(`${skbEndpoint}skbkit/v1/getnews`);

  if (params) {
    if (params.count) url.searchParams.set("count", params.count.toString());
    if (params.offset) url.searchParams.set("offset", params.offset.toString());
  }

  const response = await fetch(url.toString());
  const data: T = await response.json();

  return {
    data,
    headers: {
      "x-wp-total": response.headers.get("x-wp-total") || "0",
      "x-wp-totalpages": response.headers.get("x-wp-totalpages") || "0",
    },
    status: response.status,
    statusText: response.statusText,
  };
};
