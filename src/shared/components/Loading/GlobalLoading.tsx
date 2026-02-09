import { useLoadingStore } from "../../store/loading.store";
import { motion, AnimatePresence } from "framer-motion";
import icons from "../../../constant/icons";

export const GlobalLoading = () => {
   const { isLoading, message } = useLoadingStore();

   return (
      <AnimatePresence>
         {isLoading && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
               <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl max-w-md mx-4"
               >
                  <div className="flex flex-col items-center space-y-4">
                     <icons.Ri.RiLoader2Line className="h-12 w-12 text-primary animate-spin" />

                     {message ? (
                        <div className="text-center">
                           <p className="text-lg font-semibold text-gray-900 dark:text-white">{message}</p>
                           <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Por favor, espere...</p>
                        </div>
                     ) : (
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">Cargando...</p>
                     )}

                     {/* Progress bar opcional */}
                     <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                           className="h-full bg-primary"
                           initial={{ width: "0%" }}
                           animate={{ width: "30%" }}
                           transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              repeatType: "reverse"
                           }}
                        />
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};
