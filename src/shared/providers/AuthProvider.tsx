// shared/providers/AuthProvider.tsx
import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../store/auth.store";
import { useLoadingStore } from "../store/loading.store";

interface AuthProviderProps {
   children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
   const { isAuthenticated, refreshToken, setLoading } = useAuthStore();
   const { showLoading, hideLoading } = useLoadingStore();

   useEffect(() => {
      const initializeAuth = async () => {
         const token = localStorage.getItem("auth-token");

         if (token && !isAuthenticated) {
            showLoading("Restaurando sesión...");
            setLoading(true);

            try {
               await refreshToken();
            } catch (error) {
               console.error("Error restoring session:", error);
               localStorage.removeItem("auth-token");
            } finally {
               setLoading(false);
               hideLoading();
            }
         }
      };

      initializeAuth();
   }, []);

   // Interceptor para agregar token a las peticiones
   useEffect(() => {
      const { fetch: originalFetch } = window;

      window.fetch = async (...args) => {
         const [resource, config = {}] = args;
         const token = localStorage.getItem("auth-token");

         const newConfig = {
            ...config,
            headers: {
               ...config.headers,
               ...(token && { Authorization: `Bearer ${token}` }),
               "Content-Type": "application/json"
            }
         };

         return originalFetch(resource, newConfig);
      };

      return () => {
         window.fetch = originalFetch;
      };
   }, []);

   return <>{children}</>;
};
