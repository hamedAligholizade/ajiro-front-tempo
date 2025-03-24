import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";
import {
  BarChart2,
  Home,
  MessageSquare,
  Settings,
  ShoppingCart,
  Users,
  MessageCircle,
  Send,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: t("common.dashboard"),
      icon: <Home className="h-5 w-5" />,
      path: "/",
    },
    {
      name: t("common.salesCounter"),
      icon: <ShoppingCart className="h-5 w-5" />,
      path: "/sales-counter",
    },
    {
      name: t("common.reports"),
      icon: <BarChart2 className="h-5 w-5" />,
      path: "/reports",
    },
    {
      name: t("common.customers"),
      icon: <Users className="h-5 w-5" />,
      path: "/customers",
    },
    {
      name: t("common.campaigns"),
      icon: <Send className="h-5 w-5" />,
      path: "/campaigns",
    },
    {
      name: t("common.customerFeedback"),
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/customer-feedback",
    },
    {
      name: t("common.loyaltyProgram"),
      icon: <MessageCircle className="h-5 w-5" />,
      path: "/loyalty-program",
    },
    {
      name: t("common.settings"),
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  return (
    <div className="h-screen w-64 bg-background border-l border-border flex flex-col fixed right-0 top-0 z-10">
      <div className="p-6">
        <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-1 w-10 h-10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">آجیرو</p>
            <p className="text-xs text-muted-foreground">مدیر سیستم</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
