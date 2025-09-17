"use client";

import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createAuthSlice } from "./auth-slice";
import { Store } from "@/types/store";

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createAuthSlice(...a),
        }))
      ),
      {
        name: "local-storage",
      }
    )
  )
);
