import { Suspense, useEffect, useState } from "react";
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
import Register from "./pages/register";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Set default locale to Farsi
    setLocale("fa");

    // Set RTL direction
    document.documentElement.dir = "rtl";
    document.documentElement.classList.add("rtl");

    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Layout>
                  <Home />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/sales-counter"
            element={
              isAuthenticated ? (
                <Layout>
                  <SalesCounter />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/reports"
            element={
              isAuthenticated ? (
                <Layout>
                  <Reports />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/customer-feedback"
            element={
              isAuthenticated ? (
                <Layout>
                  <CustomerFeedback />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/loyalty-program"
            element={
              isAuthenticated ? (
                <Layout>
                  <LoyaltyProgram />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/customers"
            element={
              isAuthenticated ? (
                <Layout>
                  <Customers />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/campaigns"
            element={
              isAuthenticated ? (
                <Layout>
                  <Campaigns />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? (
                <Layout>
                  <Settings />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/inventory-management"
            element={
              isAuthenticated ? (
                <Layout>
                  <InventoryManagement />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/order-management"
            element={
              isAuthenticated ? (
                <Layout>
                  <OrderManagement />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
