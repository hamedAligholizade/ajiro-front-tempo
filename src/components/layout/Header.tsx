import React from "react";
import { Button } from "@/components/ui/button";
import { setLocale, getLocale } from "@/lib/i18n";
import { Bell, Sun, Moon } from "lucide-react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [currentLocale, setCurrentLocale] = React.useState(getLocale());

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleLocale = () => {
    const newLocale = currentLocale === "fa" ? "en" : "fa";
    setLocale(newLocale);
    setCurrentLocale(newLocale);
  };

  return (
    <header className="h-16 border-b border-border bg-background fixed top-0 left-0 md:right-64 right-0 z-20">
      <div className="h-full flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleLocale}>
            {currentLocale === "fa" ? "English" : "فارسی"}
          </Button>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            خروج
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
