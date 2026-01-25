import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AdminContextProvider } from "./context/AdminContext.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";
import { DoctorContextProvider } from "./context/DoctorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <DoctorContextProvider>
      <AdminContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AdminContextProvider>
    </DoctorContextProvider>
  </AppContextProvider>,
);
