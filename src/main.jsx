import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/core.scss";
import "./i18n.js";
import LoadingPage from "./pages/loadingPage/LoadingPage.jsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingPage />}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </BrowserRouter>
);
