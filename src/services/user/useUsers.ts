import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/auth";
import { fetcher, sendData } from "../api/fetcher";
import { ApiResponse } from "@/types/interface";

interface UserListResponse {
  data: {
    items: User[];
    total_items: number;
    page: number;
    total_pages: number;
    links: {
      prev: string | null;
      next: string | null;
    };
  };
}

export const useUsers = (page: number = 1, search?: string, limit: number = 10) => {
  const queryKey = ["users", page, search];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("limit", String(limit));
      if (page) params.append("page", String(page));
      if (search) params.append("search", search);

      return fetcher(`users?${params.toString()}`) as Promise<UserListResponse>;
    },
    select: (response) => response.data,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetcher(`users/${id}`) as Promise<ApiResponse<User>>,
    select: (response) => response.data,
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => sendData<User, Partial<User>>("users", data, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => sendData<User, Partial<User>>(`users/${id}`, data, "PUT"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sendData<void, {}>(`users/${id}`, {}, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
