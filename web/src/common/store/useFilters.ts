import create from "zustand";

interface FiltersStoreState {
  values: {
    sort?: string;
    direction?: string;
  };
}

interface FiltersStoreActions {
  setNewest: () => void;
  setOldest: () => void;
}

type FiltersStore = FiltersStoreState & FiltersStoreActions;

export const useFilters = create<FiltersStore>((set) => ({
  values: {
    sort: "createdAt",
    direction: "asc",
  },
  setNewest: () => set({ values: { sort: "createdAt", direction: "asc" } }),
  setOldest: () => set({ values: { sort: "createdAt", direction: "desc" } }),
}));
