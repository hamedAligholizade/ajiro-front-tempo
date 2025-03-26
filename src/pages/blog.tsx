import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "۵ راهکار برای افزایش فروش در کسب و کارهای کوچک",
      excerpt:
        "در این مقاله به بررسی راهکارهای مؤثر برای افزایش فروش در کسب و کارهای کوچک می‌پردازیم و نکات کاربردی برای رشد کسب و کار شما ارائه می‌دهیم.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      date: "۱۵ مرداد ۱۴۰۲",
      author: "علی محمدی",
      category: "فروش",
    },
    {
      id: 2,
      title: "چگونه برنامه وفاداری مشتریان را پیاده‌سازی کنیم؟",
      excerpt:
        "برنامه‌های وفاداری مشتریان یکی از مؤثرترین روش‌ها برای حفظ مشتریان فعلی و افزایش ارزش طول عمر مشتری است. در این مقاله به نحوه پیاده‌سازی یک برنامه وفاداری موفق می‌پردازیم.",
      image:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
      date: "۲ مرداد ۱۴۰۲",
      author: "مریم حسینی",
      category: "مشتریان",
    },
    {
      id: 3,
      title: "مدیریت موجودی هوشمند با استفاده از تکنولوژی",
      excerpt:
        "مدیریت موجودی یکی از چالش‌های اصلی کسب و کارهای خرده‌فروشی است. در این مقاله به بررسی روش‌های نوین مدیریت موجودی با استفاده از تکنولوژی می‌پردازیم.",
      image:
        "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
      date: "۲۵ تیر ۱۴۰۲",
      author: "رضا کریمی",
      category: "موجودی",
    },
    {
      id: 4,
      title: "اهمیت تحلیل داده‌ها در تصمیم‌گیری‌های کسب و کار",
      excerpt:
        "تحلیل داده‌ها به شما کمک می‌کند تا تصمیمات آگاهانه‌تری برای کسب و کار خود بگیرید. در این مقاله به اهمیت تحلیل داده‌ها و نحوه استفاده از آن در کسب و کارهای کوچک می‌پردازیم.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      date: "۱۰ تیر ۱۴۰۲",
      author: "سارا احمدی",
      category: "تحلیل داده",
    },
    {
      id: 5,
      title: "استراتژی‌های بازاریابی دیجیتال برای کسب و کارهای کوچک",
      excerpt:
        "بازاریابی دیجیتال یکی از مؤثرترین روش‌ها برای جذب مشتریان جدید است. در این مقاله به استراتژی‌های بازاریابی دیجیتال مناسب برای کسب و کارهای کوچک می‌پردازیم.",
      image:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
      date: "۵ تیر ۱۴۰۲",
      author: "محمد رضایی",
      category: "بازاریابی",
    },
    {
      id: 6,
      title: "چگونه بازخورد مشتریان را به بهبود محصول تبدیل کنیم؟",
      excerpt:
        "بازخورد مشتریان منبع ارزشمندی برای بهبود محصولات و خدمات است. در این مقاله به نحوه جمع‌آوری و استفاده از بازخورد مشتریان برای بهبود کسب و کار می‌پردازیم.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      date: "۲۸ خرداد ۱۴۰۲",
      author: "زهرا محمدی",
      category: "مشتریان",
    },
  ];

  // Categories
  const categories = [
    "همه",
    "فروش",
    "بازاریابی",
    "مشتریان",
    "موجودی",
    "تحلیل داده",
    "تکنولوژی",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold text-primary">آجیرو</h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link to="/" className="text-gray-600 hover:text-primary">
              خانه
            </Link>
            <Link to="/features" className="text-gray-600 hover:text-primary">
              ویژگی‌ها
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary">
              قیمت‌گذاری
            </Link>
            <Link
              to="/blog"
              className="text-gray-600 hover:text-primary font-bold"
            >
              وبلاگ
            </Link>
            <Link to="/faq" className="text-gray-600 hover:text-primary">
              سوالات متداول
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary">
              درباره ما
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary">
              تماس با ما
            </Link>
          </nav>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/login">
              <Button variant="outline" size="sm">
                ورود
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">ثبت نام</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Blog Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">وبلاگ آجیرو</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              آخرین مقالات، اخبار و نکات کاربردی برای مدیریت بهتر کسب و کار شما
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="md:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-primary font-medium mb-2">
                        {post.category}
                      </div>
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 ml-1" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 ml-1" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        ادامه مطلب
                        <ArrowRight className="mr-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2 space-x-reverse">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 bg-primary text-white"
                  >
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    3
                  </Button>
                  <span className="px-2">...</span>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    8
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rotate-180"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/4">
              {/* Search */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8">
                <h3 className="text-lg font-bold mb-4">جستجو</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="جستجو در مقالات..."
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8">
                <h3 className="text-lg font-bold mb-4">دسته‌بندی‌ها</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className={`block py-2 px-3 rounded-md ${index === 0 ? "bg-primary text-white" : "hover:bg-gray-100"}`}
                      >
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8">
                <h3 className="text-lg font-bold mb-4">محبوب‌ترین مقالات</h3>
                <ul className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <li key={post.id} className="flex items-start">
                      <div className="w-16 h-16 rounded overflow-hidden ml-3 flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium line-clamp-2 text-sm">
                          <a href="#" className="hover:text-primary">
                            {post.title}
                          </a>
                        </h4>
                        <p className="text-gray-500 text-xs mt-1">
                          {post.date}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-primary/5 p-6 rounded-lg shadow-md border border-primary/20">
                <h3 className="text-lg font-bold mb-4">عضویت در خبرنامه</h3>
                <p className="text-gray-600 text-sm mb-4">
                  برای دریافت آخرین مقالات و اخبار در خبرنامه ما عضو شوید.
                </p>
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button className="w-full">عضویت</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  <Link
                    to="/features"
                    className="text-gray-400 hover:text-white"
                  >
                    ویژگی‌ها
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-gray-400 hover:text-white"
                  >
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
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-400 hover:text-white"
                  >
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
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white"
                  >
                    حریم خصوصی
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white">
                    شرایط استفاده
                  </Link>
                </li>
                <li>
                  <Link
                    to="/security"
                    className="text-gray-400 hover:text-white"
                  >
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
    </div>
  );
};

export default Blog;
