import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomTabNav from "./BottomTabNav";
import { setLocale } from "@/lib/i18n";

const Layout = () => {
  useEffect(() => {
    // Set default locale to Farsi
    setLocale("fa");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className="pt-16 md:pr-64 pb-16 md:pb-6">
        <div className="container mx-auto p-4 md:p-6">
          <Outlet />
        </div>
      </main>
      {/* Bottom tab navigation - only visible on mobile */}
      <BottomTabNav />
    </div>
  );
};

export default Layout;
