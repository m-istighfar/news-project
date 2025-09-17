import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/interface";
import { fetcherWithoutAuth } from "../api/fetcher";

interface HotArticle {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export const useHotArticles = () => {
  return useQuery({
    queryKey: ["hotArticles"],
    queryFn: () => fetcherWithoutAuth("articles/hot") as Promise<ApiResponse<HotArticle[]>>,
    select: (response) => response.data,
  });
};
