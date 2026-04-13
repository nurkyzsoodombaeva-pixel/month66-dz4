import { create } from "zustand";

import { isZodErrorLike, fromError } from "zod-validation-error";
import { classicApi } from "../api/axios";

export const useProductsStore = create((set, get) => ({
  data: [],
  loading: false,
  error: null,

  fetchProducts: async (searchText, categoryId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await classicApi.get(`/qwe`, {
        // params: {
        //   //   name: `*${searchText}`,
        //   // //   category_id: categoryId,
        //   // ...(searchText && { name: `*${searchText}` }),
        //   //  ...(categoryId && { category_id: Number(categoryId) }),

        // },
        params: {
          ...(searchText && { name: searchText }),
          ...(categoryId && { categorie_id: categoryId }),
          
        },
      });
      set({ data });
    } catch (error) {
      const errorMessage = isZodErrorLike(error)
        ? fromError(error).toString()
        : error.response?.data?.message ||
          error.message ||
          "Something went wrong";

      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
}));
