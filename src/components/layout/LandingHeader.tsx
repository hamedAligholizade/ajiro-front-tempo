import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const header = document.getElementById("landing-header");
      if (isMenuOpen && header && !header.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      id="landing-header"
      className="bg-white border-b border-gray-200 fixed w-full z-10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold text-primary">آجیرو</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link
              to="/"
              className={`${isActive("/") ? "text-primary font-medium" : "text-gray-600 hover:text-primary"}`}
            >
              خانه
            </Link>
            <Link
              to="/features"
              className={`${isActive("/features") ? "text-primary font-medium" : "text-gray-600 hover:text-primary"}`}
            >
              ویژگی‌ها
            </Link>
            <Link
              to="/pricing"
              className={`${isActive("/pricing") ? "text-primary font-medium" : "text-gray-600 hover:text-primary"}`}
            >
              قیمت‌گذاری
            </Link>
            {/* <Link
              to="/blog"
              className={`${isActive("/blog") ? "text-primary font-medium" : "text-gray-600 hover:text-primary"}`}
            >
              وبلاگ
            </Link>
            <Link
              to="/faq"
              className={`${isActive("/faq") ? "text-primary font-medium" : "text-gray-600 hover:text-primary"}`}
            >
              سوالات متداول
            </Link> */}
            <Link
              to="/about"
              className={`${isActive("/about") ? "text-primary font-medium" : "text-gray-600 hover:text-primary"}`}
            >
              درباره ما
            </Link>
            <Link
              to="/contact"
              className={`${isActive("/contact") ? "text-primary font-medium" : "text-gray-600 hover:text-primary"}`}
            >
              تماس با ما
            </Link>
          </nav>

          <div className="flex items-center space-x-4 space-x-reverse">
            {/* <Link to="/auth/login" className="hidden md:block">
              <Button variant="outline" size="sm">
                ورود
              </Button>
            </Link>
            <Link to="/auth/register" className="hidden md:block">
              <Button size="sm">ثبت نام</Button>
            </Link>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button> */}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`${isActive("/") ? "text-primary font-medium" : "text-gray-600"}`}
              >
                خانه
              </Link>
              <Link
                to="/features"
                className={`${isActive("/features") ? "text-primary font-medium" : "text-gray-600"}`}
              >
                ویژگی‌ها
              </Link>
              <Link
                to="/pricing"
                className={`${isActive("/pricing") ? "text-primary font-medium" : "text-gray-600"}`}
              >
                قیمت‌گذاری
              </Link>
              {/* <Link
                to="/blog"
                className={`${isActive("/blog") ? "text-primary font-medium" : "text-gray-600"}`}
              >
                وبلاگ
              </Link>
              <Link
                to="/faq"
                className={`${isActive("/faq") ? "text-primary font-medium" : "text-gray-600"}`}
              >
                سوالات متداول
              </Link> */}
              <Link
                to="/about"
                className={`${isActive("/about") ? "text-primary font-medium" : "text-gray-600"}`}
              >
                درباره ما
              </Link>
              <Link
                to="/contact"
                className={`${isActive("/contact") ? "text-primary font-medium" : "text-gray-600"}`}
              >
                تماس با ما
              </Link>
              <div className="flex space-x-4 space-x-reverse pt-2">
                {/* <Link to="/auth/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    ورود
                  </Button>
                </Link>
                <Link to="/auth/register" className="flex-1">
                  <Button size="sm" className="w-full">
                    ثبت نام
                  </Button>
                </Link> */}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
