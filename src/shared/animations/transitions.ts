// shared/animations/transitions.ts
import { motion, AnimatePresence } from 'framer-motion';

// Transiciones de página
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

// Componente envolvente para páginas
export const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div 
      // initial="initial"
      // animate="animate"
      // exit="exit"
      variants={pageTransition}
      className="flex-1"
    >
      {children}
    </motion.div>
  );
};

// Hook para View Transitions API (navegador nativo)
export const useViewTransition = () => {
  const navigateWithTransition = (navigate: Function, to: string) => {
    if ('startViewTransition' in document) {
      // @ts-ignore
      document.startViewTransition(() => {
        navigate(to);
      });
    } else {
      navigate(to);
    }
  };
  
  return { navigateWithTransition };
};