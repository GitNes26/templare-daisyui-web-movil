// shared/providers/TransitionProvider.tsx
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AnimatedPage } from "../animations/transitions";

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
   const location = useLocation();

   return (
      <AnimatePresence mode="wait">
         <AnimatedPage key={location.pathname}>{children}</AnimatedPage>
      </AnimatePresence>
   );
};
