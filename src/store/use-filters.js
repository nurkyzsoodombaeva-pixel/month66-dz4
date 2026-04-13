import { create } from "zustand";

export const useFiltersStore = create((set, get) => ({
  search: "",
  setSearch: (search) => set({ search }),

  categoryId: null,
  setCategoryId: (categoryId) => set({ categoryId }),

  resetFilters: () => set({ search: "", categoryId: null }),
}));
