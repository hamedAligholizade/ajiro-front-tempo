import React from "react";
import QuickStats from "../components/dashboard/QuickStats";
import ModuleCards from "../components/dashboard/ModuleCards";
import { t } from "@/lib/i18n";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{t("dashboard.title")}</h1>
          <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
        </header>

        <QuickStats />

        <ModuleCards />
      </div>
    </div>
  );
}

export default Home;
