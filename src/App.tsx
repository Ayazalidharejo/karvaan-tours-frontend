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
// import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Contact from "./pages/Contact";
import TourGuide from "./pages/TourGuide";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import BlogDetail from "./pages/BlogDetail";
import ShortFormDetail from "./components/ShortFormDetail";
import BlogList from "./pages/Home";
import ToursList from "./pages/ToursList";
import TourDetail from "./pages/TourDetail";
import AdminTours from "./pages/Think";
import TourForm from "./pages/TourForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />   {/* 👈 Added here */}
        <Routes>
            <Route path="/tours" element={<ToursList />} />
        <Route path="/tours/:id" element={<TourDetail />} />

        {/* admin */}
        <Route path="/admin/tours" element={<AdminTours />} />
        <Route path="/admin/tours/new" element={<TourForm />} />
        <Route path="/admin/tours/edit/:id" element={<TourForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
           <Route path="/detail/:id" element={<BlogDetail />} />
          <Route path="/tours" element={<Tours />} />
           <Route path="/short-form/:id" element={<ShortFormDetail />} />
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
