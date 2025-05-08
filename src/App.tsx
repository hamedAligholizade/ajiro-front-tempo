import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import SalesCounter from "./pages/sales-counter";
import Reports from "./pages/reports";
import CustomerFeedback from "./pages/customer-feedback";
import LoyaltyProgram from "./pages/loyalty-program";
import Customers from "./pages/customers";
import Campaigns from "./pages/campaigns";
import Settings from "./pages/settings";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/login";
import routes from "tempo-routes";
import { setLocale } from "./lib/i18n";
import InventoryManagement from "./pages/inventory-management";
import OrderManagement from "./pages/order-management";
import Landing from "./pages/landing";
import About from "./pages/about";
import Contact from "./pages/contact";
import Pricing from "./pages/pricing";
import Features from "./pages/features";
import Blog from "./pages/blog";
import FAQ from "./pages/faq";
import Register from "./pages/auth/register";
import TestAuth from "./pages/auth/test-auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ShopSelector from "./pages/shop/selector";
import PreSale from "./pages/pre";
import AdminUsers from "@/pages/admin/users";

function App() {
  useEffect(() => {
    // Set default locale to Farsi
    setLocale("fa");

    // Set RTL direction
    document.documentElement.dir = "rtl";
    document.documentElement.classList.add("rtl");
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
        <Routes>
        {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
        
        {/* Auth Routes */}
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="test" element={<TestAuth />} />
        </Route>
        
        {/* Shop Routes (requires authentication) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/shop">
            <Route path="select" element={<ShopSelector />} />
          </Route>
        </Route>
        
        {/* Protected Routes (requires authentication and shop selection) */}
        <Route element={<ProtectedRoute requireShop={true} />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/sales-counter" element={<SalesCounter />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/customer-feedback" element={<CustomerFeedback />} />
            <Route path="/loyalty-program" element={<LoyaltyProgram />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/inventory-management" element={<InventoryManagement />} />
            <Route path="/order-management" element={<OrderManagement />} />
            
            {/* Admin Only Routes */}
            <Route element={<ProtectedRoute requiredRoles={["admin", "manager"]} />}>
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>
        
        {/* Pre-sale Route */}
        <Route path="/pre" element={<PreSale />} />
        
        {/* Admin Users Route */}
        <Route path="/admin/users" element={<AdminUsers />} />
        
        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

export default App;
