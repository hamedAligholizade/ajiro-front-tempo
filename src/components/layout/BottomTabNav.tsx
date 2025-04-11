import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";
import {
  Home,
  ShoppingCart,
  Users,
  Package,
  BarChart2,
} from "lucide-react";

const BottomTabNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Primary navigation items for mobile (4-5 most important)
  const navItems = [
    {
      name: t("common.dashboard"),
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      name: t("common.salesCounter"),
      icon: <ShoppingCart className="h-5 w-5" />,
      path: "/sales-counter",
    },
    {
      name: t("common.inventory"),
      icon: <Package className="h-5 w-5" />,
      path: "/inventory-management",
    },
    {
      name: t("common.customers"),
      icon: <Users className="h-5 w-5" />,
      path: "/customers",
    },
    {
      name: t("common.reports"),
      icon: <BarChart2 className="h-5 w-5" />,
      path: "/reports",
    },
  ];

  return (
    <div className="fixed bottom-0 right-0 left-0 z-40 md:hidden bg-background border-t border-border">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full px-1",
              isActive(item.path)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn(
              "flex items-center justify-center w-8 h-8 mb-1 rounded-full",
              isActive(item.path) ? "bg-primary/10" : ""
            )}>
              {item.icon}
            </div>
            <span className="text-xs font-medium truncate">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomTabNav; 