// app/routers/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardPage } from "@/modules/dashboard/presentation/pages/DashboardPage";
import { UserPage } from "@/modules/user/presentation/pages/UserPage";
import { SettingsPage } from "@/modules/settings/presentation/pages/SettingsPage";
import { NotFoundPage } from "@/shared/pages/NotFoundPage";
import { AppLayout } from "../shared/layouts/AppLayout";

export const AppRouter = () => {
   return (
      <Routes>
         <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
               <Route index path="/dashboard" element={<DashboardPage />} />
               <Route path="/users" element={<UserPage />} />
               <Route path="/settings" element={<SettingsPage />} />
               {/* Otras rutas protegidas */}

               {/* Ruta de error 404 dentro del layout */}
               <Route path="*" element={<NotFoundPage />} />
            </Route>
         </Route>
      </Routes>
   );
};
