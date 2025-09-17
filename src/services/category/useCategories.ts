import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Category, CategoryListResponse } from "@/types/category";
import { fetcherWithoutAuth, sendData } from "../api/fetcher";
import { ApiResponse } from "@/types/interface";

export const useCategories = (page: number = 1, search?: string, limit: number = 10) => {
  const queryKey = ["categories", page, search];

  return useQuery({
    queryKey,
    queryFn: () => {
      const params = new URLSearchParams();
      params.append("limit", String(limit));
      if (page) params.append("page", String(page));
      if (search) params.append("search", search);

      return fetcherWithoutAuth(`categories?${params.toString()}`) as Promise<CategoryListResponse>;
    },
    select: (response) => response.data,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetcherWithoutAuth(`categories/${id}`) as Promise<ApiResponse<Category>>,
    select: (response) => response.data,
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Category>) => sendData<Category, Partial<Category>>("categories", data, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Category>) => sendData<Category, Partial<Category>>(`categories/${id}`, data, "PUT"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", id] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sendData<void, {}>(`categories/${id}`, {}, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
