import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Article, ArticleListResponse } from "@/types/article";
import { ApiResponse } from "@/types/interface";
import { fetcherWithoutAuth, sendData } from "../api/fetcher";

export const useArticles = (
  page: number = 1,
  status?: string,
  categoryId?: string,
  search?: string,
  isHot?: string
) => {
  const queryKey = ["articles", page, status, categoryId, search, isHot];

  return useQuery({
    queryKey,
    queryFn: () => {
      const params = new URLSearchParams();
      params.append("limit", "10");
      if (page) params.append("page", String(page));
      if (status) params.append("status", status);
      if (categoryId) params.append("categoryId", categoryId);
      if (search) params.append("search", search);
      if (isHot) params.append("isHot", isHot);

      return fetcherWithoutAuth(`articles?${params.toString()}`) as Promise<ArticleListResponse>;
    },
    select: (response) => response.data,
  });
};

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetcherWithoutAuth(`articles/${slug}`) as Promise<ApiResponse<Article>>,
    select: (response) => response.data,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => sendData<Article, FormData>("articles", data, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useUpdateArticle = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => sendData<Article, FormData>(`articles/${id}`, data, "PUT"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", id] });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sendData<void, {}>(`articles/${id}`, {}, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useToggleHotArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sendData<Article, {}>(`articles/${id}`, { isHot: true }, "PATCH"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["article", "slug", slug],
    queryFn: () => fetcherWithoutAuth(`articles/slug/${slug}`) as Promise<ApiResponse<Article>>,
    select: (response) => response.data,
    enabled: !!slug,
  });
};
