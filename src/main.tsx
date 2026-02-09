import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
// import { GlobalContextProvider } from "./context/GlobalContext.jsx";
// import AuthContextProvider from "./context/AuthContext.jsx";
// import MenuContextProvider from "./context/MenuContext.jsx";
dayjs.extend(isBetween);

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <App />
   </StrictMode>
);
