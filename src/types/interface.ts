import { AllowedValue } from "./types";

export interface debounceInterface {
  value: string;
  delay: number;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T; // Data can be any structure
}

// Format 1: Paginated data
export interface DataPaginate<T> {
  items: T[];
  total_items: number;
  page: number;
  total_pages: number;
  links: {
    prev: string | null;
    next: string | null;
  };
  meta?: Record<string, any>;
}

export interface LoginPayload extends Record<string, AllowedValue> {
  email: string;
  password: string;
}

export interface LoginData {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterData {
  id: string;
  name: string;
  email: string;
}

export interface UserFormValues {
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  education: string;
  password: string;
  photo?: File;
}
