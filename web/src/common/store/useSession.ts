import create from "zustand";
import { SessionUser } from "../types/session-user.type";

type Nullable<T> = { [K in keyof T]: T | null };

interface SessionStoreState {
  user: Nullable<SessionUser> | SessionUser;
  status: "idle" | "signIn" | "signOut";
  token: string | null;
}

interface SessionStoreActions {
  setSignedIn: (data: SessionUser, token: string) => void;
  setSignedOut: () => void;
}

export type SessionStore = SessionStoreState & SessionStoreActions;

export const useSession = create<SessionStore>((set) => ({
  user: {
    id: null,
    email: null,
    name: null,
  },

  status: "idle",
  token: null,
  setSignedIn: (data, token) => set({ status: "signIn", user: data, token }),
  setSignedOut: () =>
    set({
      user: { id: null, email: null, name: null },
      status: "signOut",
      token: null,
    }),
}));
