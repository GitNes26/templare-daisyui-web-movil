// app/App.tsx
import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
// import { ThemeProvider } from "@mui/material/styles";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";

// Providers

// Components
// import { ErrorBoundary } from "@/shared/components/Error/ErrorBoundary";

// Routers
import { AppRouter } from "./routers/AppRouter";
import { AuthRouter } from "./routers/AuthRouter";

// Styles
// import "@/shared/styles/globals.css";
import { TransitionProvider } from "./shared/providers/TransitionProvider";
import { AuthProvider } from "./shared/providers/AuthProvider";
import { GlobalLoading } from "./shared/components/Loading/GlobalLoading";
// import { muiTheme } from '@/shared/styles/theme';
import { motion } from 'framer-motion';

// Configuración dayjs
dayjs.locale("es");

export const App = () => {
   // Configurar listeners globales para notificaciones
   useEffect(() => {
      const handleOnline = () => {
         // Notificar reconexión
         if ("enqueueSnackbar" in window) {
            // @ts-ignore
            window.enqueueSnackbar("Conexión restablecida", {
               variant: "success",
               autoHideDuration: 3000
            });
         }
      };

      const handleOffline = () => {
         // Notificar pérdida de conexión
         if ("enqueueSnackbar" in window) {
            // @ts-ignore
            window.enqueueSnackbar("Sin conexión a internet", {
               variant: "warning",
               persist: true
            });
         }
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
         window.removeEventListener("online", handleOnline);
         window.removeEventListener("offline", handleOffline);
      };
   }, []);

   return (
      <>
         {/* <ErrorBoundary> */}
         {/* <ThemeProvider /* theme={muiTheme} * /> */}
         {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es"> */}
         <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "right"
            }}
            Components={{
               success: CustomSnackbar,
               error: CustomSnackbar,
               warning: CustomSnackbar,
               info: CustomSnackbar
            }}
         >
            <AuthProvider>
               <BrowserRouter>
                  <TransitionProvider>
                     <Suspense fallback={<GlobalLoading />}>
                        <GlobalLoading />

                        <Routes>
                           {/* Redirigir raíz a dashboard o login según autenticación */}
                           <Route path="/" element={<Navigate to="/dashboard" replace />} />

                           {/* Rutas de autenticación */}
                           <Route path="/*" element={<AuthRouter />} />

                           {/* Rutas de la aplicación */}
                           <Route path="/app/*" element={<AppRouter />} />

                           {/* Error 404 global */}
                           <Route path="*" element={<Navigate to="/app" replace />} />
                        </Routes>
                     </Suspense>
                  </TransitionProvider>
               </BrowserRouter>
            </AuthProvider>
         </SnackbarProvider>
         {/* </LocalizationProvider> */}
         {/* </ThemeProvider> */}
         {/* </ErrorBoundary> */}
      </>
   );
};

// Componente personalizado para Snackbar
const CustomSnackbar = ({ id, message, variant }: any) => {
   const variants = {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500"
   };

   const icons = {
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️"
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 50, scale: 0.3 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
         className={`${variants[variant]} text-white rounded-lg shadow-lg p-4 mb-2 max-w-md`}
      >
         <div className="flex items-center">
            <span className="mr-3 text-xl">{icons[variant]}</span>
            <span className="flex-1">{message}</span>
         </div>
      </motion.div>
   );
};
