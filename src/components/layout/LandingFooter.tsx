import React from "react";
import { Link } from "react-router-dom";

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">آجیرو</h3>
            <p className="text-gray-400">راهکار جامع مدیریت کسب و کار کوچک</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">محصول</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white">
                  ویژگی‌ها
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white">
                  قیمت‌گذاری
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="text-gray-400 hover:text-white"
                >
                  نظرات مشتریان
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">شرکت</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white">
                  فرصت‌های شغلی
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white">
                  وبلاگ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">قانونی</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  شرایط استفاده
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-gray-400 hover:text-white">
                  امنیت
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} آجیرو. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
