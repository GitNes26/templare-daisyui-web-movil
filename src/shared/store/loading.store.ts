// shared/store/loading.store.ts
import { create } from "zustand";

interface LoadingState {
   isLoading: boolean;
   message: string | null;

   showLoading: (message?: string) => void;
   hideLoading: () => void;
   setMessage: (message: string) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
   isLoading: false,
   message: null,

   showLoading: (message?: string) => {
      set({ isLoading: true, message: message || null });
   },

   hideLoading: () => {
      set({ isLoading: false, message: null });
   },

   setMessage: (message: string) => {
      set({ message });
   }
}));
