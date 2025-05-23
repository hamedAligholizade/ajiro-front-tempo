import React, { useState, useEffect } from "react";
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
  Package,
  ClipboardList,
  Store,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import ShopSelector from "../shop/ShopSelector";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, shop } = useAppSelector((state) => state.auth);

  // Close sidebar when route changes on mobile or when clicking outside
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const sidebar = document.querySelector(".sidebar-container");
        const toggleButton = document.getElementById("mobile-menu-toggle");
        if (
          sidebar &&
          !sidebar.contains(event.target as Node) &&
          toggleButton &&
          !toggleButton.contains(event.target as Node)
        ) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Add toggle button to header for mobile
  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      const existingButton = document.getElementById("mobile-menu-toggle");
      if (!existingButton) {
        const button = document.createElement("button");
        button.id = "mobile-menu-toggle";
        button.className =
          "md:hidden flex items-center justify-center p-2 mr-2";
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        button.onclick = () => setIsMobileMenuOpen(!isMobileMenuOpen);

        const firstChild = header.firstChild;
        if (firstChild) {
          header.insertBefore(button, firstChild);
        } else {
          header.appendChild(button);
        }
      }
    }

    return () => {
      const button = document.getElementById("mobile-menu-toggle");
      if (button) button.remove();
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Separate navigation items into primary (shown in bottom nav on mobile) and secondary
  const primaryNavItems = [
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

  // Secondary navigation items (those not in the bottom nav)
  const secondaryNavItems = [
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
      name: t("common.orders"),
      icon: <ClipboardList className="h-5 w-5" />,
      path: "/order-management",
    },
    {
      name: t("common.settings"),
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  return (
    <>
      {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      <div
        className={`sidebar-container h-screen w-64 bg-background border-l border-border flex flex-col fixed right-0 top-0 z-50 transform transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
            <button 
              className="p-1 rounded-full hover:bg-muted md:hidden" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2">
            <ShopSelector />
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 pb-4">
          {/* Primary Navigation - show on desktop only, handled by bottom tab on mobile */}
          <div className="pb-4 md:block hidden">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider py-2 px-3">
              {t("common.mainMenu")}
            </div>
            <ul className="space-y-1">
              {primaryNavItems.map((item) => (
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
          </div>
          
          {/* Secondary Navigation - shown on both mobile and desktop */}
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider py-2 px-3">
              {t("common.additionalFeatures")}
            </div>
            <ul className="space-y-1">
              {secondaryNavItems.map((item) => (
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
          </div>
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-1 w-10 h-10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              {user ? (
                <>
                  <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium">آجیرو</p>
                  <p className="text-xs text-muted-foreground">مدیر سیستم</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
