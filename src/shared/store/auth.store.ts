// shared/store/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
   id: string;
   email: string;
   name: string;
   role: string;
   avatar?: string;
}

interface AuthState {
   user: User | null;
   token: string | null;
   isAuthenticated: boolean;
   isLoading: boolean;

   // Actions
   login: (email: string, password: string) => Promise<void>;
   logout: () => void;
   register: (userData: any) => Promise<void>;
   refreshToken: () => Promise<void>;
   setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
   persist(
      (set, get) => ({
         user: null,
         token: null,
         isAuthenticated: false,
         isLoading: false,

         login: async (email: string, password: string) => {
            set({ isLoading: true });
            try {
               // Simulación de login
               const response = await fetch("/api/auth/login", {
                  method: "POST",
                  body: JSON.stringify({ email, password })
               });

               const data = await response.json();

               set({
                  user: data.user,
                  token: data.token,
                  isAuthenticated: true,
                  isLoading: false
               });
            } catch (error) {
               set({ isLoading: false });
               throw error;
            }
         },

         logout: () => {
            set({
               user: null,
               token: null,
               isAuthenticated: false
            });
            // Limpiar localStorage, etc.
         },

         register: async (userData: any) => {
            // Implementación similar a login
         },

         refreshToken: async () => {
            // Lógica para refrescar token
         },

         setLoading: (loading: boolean) => {
            set({ isLoading: loading });
         }
      }),
      {
         name: "auth-storage",
         partialize: (state) => ({
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated
         })
      }
   )
);
