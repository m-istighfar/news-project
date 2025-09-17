"use client";

import { showErrorToast, showSuccessToast } from "@/lib/utils/swal";
import Cookies from "js-cookie";

export const fetcher = (url: string) => {
  const token = Cookies.get("token");
  return fetch(`/api/${url}`, {
    headers: {
      method: "GET",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const fetcherWithoutAuth = async (url: string) => {
  try {
    const response = await fetch(`/api/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const hasFile = (data: object): boolean => {
  return Object.values(data).some((value) => {
    if (Array.isArray(value)) {
      return value.some((item) => item instanceof File);
    }
    return value instanceof File;
  });
};

export const sendData = async <T, D extends object>(
  url: string,
  data: D,
  method: "POST" | "PUT" | "DELETE" | "PATCH"
): Promise<T> => {
  const token = Cookies.get("token");
  const isFormData = data instanceof FormData;
  const shouldUseFormData = isFormData || hasFile(data);

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };

  if (!shouldUseFormData) {
    headers["Content-Type"] = "application/json";
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== "DELETE") {
    options.body = isFormData ? (data as FormData) : shouldUseFormData ? convertToFormData(data) : JSON.stringify(data);
  }

  const response = await fetch(`/api/${url}`, options);
  const responseData = await response.json();

  if (!response.ok) {
    showErrorToast(responseData.message || "Terjadi kesalahan pada server");
    throw responseData;
  }

  if (responseData.message) {
    showSuccessToast(responseData.message);
  }

  return responseData as Promise<T>;
};

const convertToFormData = <D extends object>(data: D): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item as string | Blob));
    } else {
      formData.append(key, value as string | Blob);
    }
  });

  return formData;
};
