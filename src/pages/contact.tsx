import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
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
            <Link to="/blog" className="text-gray-600 hover:text-primary">
              وبلاگ
            </Link>
            <Link to="/faq" className="text-gray-600 hover:text-primary">
              سوالات متداول
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary">
              درباره ما
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-primary font-bold"
            >
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

      {/* Contact Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">تماس با ما</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ما آماده پاسخگویی به سوالات شما هستیم. با ما در تماس باشید.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-6">با ما در ارتباط باشید</h2>
              <p className="text-gray-600 mb-8">
                تیم پشتیبانی ما آماده پاسخگویی به سوالات شما در مورد محصولات،
                قیمت‌گذاری، یا هر موضوع دیگری است.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-3 ml-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">آدرس دفتر مرکزی</h3>
                    <p className="text-gray-600">
                      تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج آجیرو، طبقه
                      ۱۲
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-3 ml-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">ایمیل</h3>
                    <p className="text-gray-600">info@ajiro.ir</p>
                    <p className="text-gray-600">support@ajiro.ir</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-3 ml-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">تلفن تماس</h3>
                    <p className="text-gray-600">۰۲۱-۸۸۶۶۷۷۵۵</p>
                    <p className="text-gray-600">۰۲۱-۸۸۶۶۷۷۵۶</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-bold mb-4">ساعات کاری</h3>
                <p className="text-gray-600">
                  شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر
                </p>
                <p className="text-gray-600">پنجشنبه: ۹ صبح تا ۱ بعد از ظهر</p>
                <p className="text-gray-600">جمعه: تعطیل</p>
              </div>
            </div>

            <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">ارسال پیام</h2>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      نام و نام خانوادگی
                    </label>
                    <Input
                      id="name"
                      placeholder="نام و نام خانوادگی خود را وارد کنید"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      ایمیل
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ایمیل خود را وارد کنید"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    موضوع
                  </label>
                  <Input
                    id="subject"
                    placeholder="موضوع پیام خود را وارد کنید"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    پیام
                  </label>
                  <Textarea
                    id="message"
                    placeholder="پیام خود را وارد کنید"
                    rows={5}
                    className="resize-none"
                  />
                </div>

                <Button className="w-full">
                  ارسال پیام
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=1200&q=80"
                alt="نقشه دفتر آجیرو"
                className="w-full h-full object-cover"
              />
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

export default Contact;
