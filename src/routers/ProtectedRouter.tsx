// app/routers/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { notification } from "@/shared/services/notification.service";
import { useEffect, useState } from "react";
import { useAuthStore } from "../shared/store/auth.store";
import { useLoadingStore } from "../shared/store/loading.store";

export const ProtectedRoute = () => {
   const { isAuthenticated, isLoading, refreshToken } = useAuthStore();
   const { showLoading, hideLoading } = useLoadingStore();
   const location = useLocation();
   const [isCheckingAuth, setIsCheckingAuth] = useState(true);

   useEffect(() => {
      const checkAuthentication = async () => {
         showLoading("Verificando sesión...");

         try {
            // Verificar si hay token y es válido
            const token = localStorage.getItem("auth-token");

            if (token) {
               // Intentar refrescar el token si es necesario
               await refreshToken();
            }
         } catch (error) {
            console.error("Error verificando autenticación:", error);
         } finally {
            setIsCheckingAuth(false);
            hideLoading();
         }
      };

      checkAuthentication();
   }, [location.pathname]);

   // Mostrar loading mientras se verifica
   if (isLoading || isCheckingAuth) {
      return null; // El GlobalLoading se mostrará por el store
   }

   // Si no está autenticado, redirigir al login
   if (!isAuthenticated) {
      notification.toast("Por favor inicia sesión para continuar", "warning");
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   // Si está autenticado, renderizar las rutas hijas
   return <Outlet />;
};
