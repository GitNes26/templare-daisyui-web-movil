// app/routers/AuthRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "@/shared/layouts/AuthLayout";
import { LoginPage } from "@/modules/auth/presentation/pages/LoginPage";
import { RegisterPage } from "@/modules/auth/presentation/pages/RegisterPage";
import { ForgotPasswordPage } from "@/modules/auth/presentation/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "@/modules/auth/presentation/pages/ResetPasswordPage";

export const AuthRouter = () => {
   return (
      <Routes>
         <Route element={<AuthLayout />}>
            <Route index path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
         </Route>
      </Routes>
   );
};
