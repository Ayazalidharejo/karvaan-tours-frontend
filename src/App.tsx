// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Tours from "./pages/Tours";
// import Destinations from "./pages/Destinations";
// import DestinationDetail from "./pages/DestinationDetail";
// import Contact from "./pages/Contact";
// import TourGuide from "./pages/TourGuide";
// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/tours" element={<Tours />} />
//           {/* <Route path="/destinations" element={<Destinations />} /> */}
//           <Route path="/destinations/:id" element={<DestinationDetail />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/guide" element={<TourGuide />} />
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header"; // 👈 import here
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Contact from "./pages/Contact";
import TourGuide from "./pages/TourGuide";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />   {/* 👈 Added here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          {/* <Route path="/destinations" element={<Destinations />} /> */}
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guide" element={<TourGuide />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
