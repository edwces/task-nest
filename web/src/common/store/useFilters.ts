import create from "zustand";
import { Sorting } from "../../modules/todo/enums/sorting.enum";

interface FiltersStoreState {
  values: {
    sort?: string;
    direction?: string;
  };
}

interface FiltersStoreActions {
  dispatch: (action: Sorting) => void;
}

type FiltersStore = FiltersStoreState & FiltersStoreActions;

const reduce = (state: FiltersStore, action: Sorting) => {
  switch (action) {
    case Sorting.NEWEST:
      return { values: { sort: "createdAt", direction: "asc" } };
    case Sorting.OLDEST:
      return { values: { sort: "createdAt", direction: "desc" } };
    default:
      return state;
  }
};

export const useFilters = create<FiltersStore>((set) => ({
  values: {
    sort: "createdAt",
    direction: "asc",
  },
  dispatch: (action) => set((state) => reduce(state, action)),
}));
