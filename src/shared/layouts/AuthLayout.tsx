// shared/layouts/AuthLayout.tsx
import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { motion } from "framer-motion";

export const AuthLayout = () => {
   const { isAuthenticated } = useAuthStore();

   // Si ya está autenticado, redirigir al dashboard
   if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col md:flex-row">
         {/* Panel izquierdo - Branding */}
         <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2 p-8 flex flex-col justify-center items-center bg-white md:bg-transparent"
         >
            <div className="max-w-md w-full">
               <Link to="/" className="inline-block mb-8">
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">A</span>
                     </div>
                     <span className="text-2xl font-bold text-gray-900">MiApp</span>
                  </div>
               </Link>

               <div className="mb-10">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Bienvenido de vuelta</h1>
                  <p className="text-gray-600">Accede a tu cuenta para gestionar todas tus operaciones</p>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600">✓</span>
                     </div>
                     <div>
                        <h3 className="font-semibold">Seguridad garantizada</h3>
                        <p className="text-sm text-gray-500">Tus datos están protegidos</p>
                     </div>
                  </div>

                  <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600">⚡</span>
                     </div>
                     <div>
                        <h3 className="font-semibold">Rápido y eficiente</h3>
                        <p className="text-sm text-gray-500">Interfaz optimizada</p>
                     </div>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* Panel derecho - Formulario */}
         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:w-1/2 p-8 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
               <Outlet />
            </div>
         </motion.div>
      </div>
   );
};
