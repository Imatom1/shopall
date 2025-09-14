import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Compare from "./pages/Compare";
import CompareIntro from "./pages/CompareIntro";
import Quiz from "./pages/Quiz";
import QuizIntro from "./pages/QuizIntro";
import PerfumeMixer from "./pages/PerfumeMixer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      const atTop = window.scrollY === 0;
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        window.parent?.postMessage({ scroll: e.deltaY }, "*");
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/fragrances" replace />} />
          <Route path="/fragrances" element={<Index />} />
          <Route path="/compare-intro" element={<CompareIntro />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/quiz-intro" element={<QuizIntro />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/mixer" element={<PerfumeMixer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
