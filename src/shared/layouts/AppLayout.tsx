// shared/layouts/AppLayout.tsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Navigation/Sidebar";
import Header from "../components/Navigation/Header";
import { useAuthStore } from "../store/auth.store";

export const AppLayout = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const { user } = useAuthStore();

   return (
      <div className="min-h-screen bg-gray-50 flex">
         {/* Sidebar - Mobile overlay */}
         {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

         {/* Sidebar */}
         <motion.aside
            initial={false}
            animate={{
               x: isSidebarOpen ? 0 : -280,
               width: isSidebarOpen ? 280 : 0
            }}
            className="fixed lg:sticky top-0 left-0 h-screen z-50 lg:z-auto bg-white shadow-xl lg:shadow-none"
         >
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} user={user} />
         </motion.aside>

         {/* Main Content */}
         <div className="flex-1 flex flex-col min-h-screen">
            {/* Header */}
            <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} user={user} />

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-6 overflow-auto">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Outlet />
               </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t bg-white py-4 px-6">
               <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                  <p>© {new Date().getFullYear()} MiApp. Todos los derechos reservados.</p>
                  <div className="flex items-center space-x-4 mt-2 md:mt-0">
                     <a href="#" className="hover:text-primary">
                        Términos
                     </a>
                     <a href="#" className="hover:text-primary">
                        Privacidad
                     </a>
                     <a href="#" className="hover:text-primary">
                        Soporte
                     </a>
                  </div>
               </div>
            </footer>
         </div>
      </div>
   );
};
