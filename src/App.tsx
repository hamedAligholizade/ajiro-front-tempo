import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SalesCounter from "./pages/sales-counter";
import Reports from "./pages/reports";
import CustomerFeedback from "./pages/customer-feedback";
import LoyaltyProgram from "./pages/loyalty-program";
import Customers from "./pages/customers";
import Campaigns from "./pages/campaigns";
import Settings from "./pages/settings";
import CustomerAcquisition from "./pages/acquisition";
import Layout from "./components/layout/Layout";
import routes from "tempo-routes";
import { setLocale } from "./lib/i18n";
import InventoryManagement from "./pages/inventory-management";
import OrderManagement from "./pages/order-management";

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
      <>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/sales-counter"
            element={
              <Layout>
                <SalesCounter />
              </Layout>
            }
          />
          <Route
            path="/reports"
            element={
              <Layout>
                <Reports />
              </Layout>
            }
          />
          <Route
            path="/customer-feedback"
            element={
              <Layout>
                <CustomerFeedback />
              </Layout>
            }
          />
          <Route
            path="/loyalty-program"
            element={
              <Layout>
                <LoyaltyProgram />
              </Layout>
            }
          />
          <Route
            path="/customers"
            element={
              <Layout>
                <Customers />
              </Layout>
            }
          />
          <Route
            path="/campaigns"
            element={
              <Layout>
                <Campaigns />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />
          <Route
            path="/acquisition"
            element={
              <Layout>
                <CustomerAcquisition />
              </Layout>
            }
          />
          <Route
            path="/inventory-management"
            element={
              <Layout>
                <InventoryManagement />
              </Layout>
            }
          />
          <Route
            path="/order-management"
            element={
              <Layout>
                <OrderManagement />
              </Layout>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
