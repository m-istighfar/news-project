import { useMutation } from "@tanstack/react-query";
import { ApiResponse, DataObject, LoginData, RegisterData } from "@/types";
import { sendData } from "../api/fetcher";
import { LoginInput, RegisterInput } from "@/lib/validations/auth";

import Cookies from "js-cookie";
import { useStore } from "@/store/store";

export const useLoginMutation = () => {
  return useMutation<ApiResponse<DataObject<LoginData>>, Error, LoginInput>({
    mutationFn: async (payload: LoginInput) => {
      return await sendData("auth/login", payload, "POST");
    },
    onSuccess: (data) => {
      if (data.data) {
        Cookies.set("token", data.data.token);

        const { setUser, setIsAuthenticated } = useStore.getState();
        setUser(data.data.user);
        setIsAuthenticated(true);
      }
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation<ApiResponse<DataObject<RegisterData>>, Error, RegisterInput>({
    mutationFn: async (payload: RegisterInput) => {
      return await sendData("auth/register", payload, "POST");
    },
  });
};
