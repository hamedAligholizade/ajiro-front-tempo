import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { setLocale } from "@/lib/i18n";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // Set default locale to Farsi
    setLocale("fa");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className="pt-16 md:pr-64">
        <div className="container mx-auto p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
