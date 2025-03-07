import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/queryClient.ts";
import { ThemeProvider } from "./contexts/theme.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom"
          buttonPosition="bottom-right"
        />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
