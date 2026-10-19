// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// import isBetween from "dayjs/plugin/isBetween";
// import dayjs from "dayjs";
// // import { GlobalContextProvider } from "./context/GlobalContext.jsx";
// // import AuthContextProvider from "./context/AuthContext.jsx";
// // import MenuContextProvider from "./context/MenuContext.jsx";
// dayjs.extend(isBetween);

// createRoot(document.getElementById("root")!).render(
//    <StrictMode>
//       <App />
//    </StrictMode>
// );

// app/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

// Configuración para View Transitions API
if ("startViewTransition" in document) {
   // @ts-ignore - Polyfill opcional para navegadores que no soportan View Transitions
   document.startViewTransition = (callback: () => void) => {
      callback();
      return {
         ready: Promise.resolve(),
         updateCallbackDone: Promise.resolve(),
         finished: Promise.resolve()
      };
   };
}

// Configurar React Query si lo usas
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000, // 5 minutos
//       gcTime: 10 * 60 * 1000, // 10 minutos
//       retry: 1,
//       refetchOnWindowFocus: false
//     }
//   }
// });

// Inicializar Sentry o herramientas de monitoreo
if (import.meta.env.PROD) {
   // Sentry.init({ dsn: '...' });
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
   <React.StrictMode>
      {/* <QueryClientProvider client={queryClient}> */}
      <App />
      {/* {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider> */}
   </React.StrictMode>
);

// Configurar PWA si es necesario
if ("serviceWorker" in navigator && import.meta.env.PROD) {
   window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
         console.error("Service Worker registration failed:", error);
      });
   });
}

// Manejar errores no capturados
window.addEventListener("error", (event) => {
   console.error("Error no capturado:", event.error);
   // Enviar a servicio de monitoreo
});

window.addEventListener("unhandledrejection", (event) => {
   console.error("Promesa rechazada no manejada:", event.reason);
   // Enviar a servicio de monitoreo
});
