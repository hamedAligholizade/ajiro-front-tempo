import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  ShoppingCart,
  BarChart2,
  Users,
  MessageSquare,
  Package,
  ClipboardList,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">آجیرو</h1>
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
            <Link to="/about" className="text-gray-600 hover:text-primary">
              درباره ما
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                مدیریت هوشمند کسب و کار کوچک با آجیرو
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                راهکار جامع مدیریت فروشگاه، مشتریان و موجودی برای کسب و کارهای
                کوچک
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8">
                  شروع رایگان
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  نمایش دمو
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                alt="آجیرو داشبورد"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">ویژگی‌های برتر</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              آجیرو تمام ابزارهای مورد نیاز برای مدیریت کسب و کار شما را در یک
              پلتفرم یکپارچه ارائه می‌دهد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <ShoppingCart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">صندوق فروش</h3>
              <p className="text-gray-600">
                سیستم فروش ساده و کارآمد با امکان مدیریت محصولات، تخفیف‌ها و چاپ
                فاکتور
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <BarChart2 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">گزارش‌های تحلیلی</h3>
              <p className="text-gray-600">
                گزارش‌های جامع از فروش، موجودی و عملکرد کسب و کار با نمودارهای
                تعاملی
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">مدیریت مشتریان</h3>
              <p className="text-gray-600">
                ثبت اطلاعات مشتریان، برنامه وفاداری و ارسال پیامک‌های تبلیغاتی
                هدفمند
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">بازخورد مشتریان</h3>
              <p className="text-gray-600">
                جمع‌آوری و تحلیل نظرات مشتریان با فرم‌های نظرسنجی و کدهای QR
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <Package className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">مدیریت موجودی</h3>
              <p className="text-gray-600">
                کنترل دقیق موجودی، هشدار اتمام کالا و مدیریت تأمین‌کنندگان
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <ClipboardList className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">مدیریت سفارشات</h3>
              <p className="text-gray-600">
                پیگیری سفارشات، وضعیت ارسال و مدیریت فرآیند تحویل به مشتریان
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">مشتریان ما چه می‌گویند</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              صاحبان کسب و کارهای موفق که با استفاده از آجیرو رشد کرده‌اند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1"
                    alt="تصویر کاربر"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">علی محمدی</h4>
                  <p className="text-gray-600 text-sm">کافه بوک</p>
                </div>
              </div>
              <p className="text-gray-700">
                "با استفاده از آجیرو توانستیم فرآیند فروش و مدیریت موجودی کافه
                را به شکل چشمگیری بهبود دهیم. برنامه وفاداری مشتریان باعث افزایش
                ۳۰ درصدی بازگشت مشتریان شده است."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2"
                    alt="تصویر کاربر"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">مریم حسینی</h4>
                  <p className="text-gray-600 text-sm">بوتیک لباس ونوس</p>
                </div>
              </div>
              <p className="text-gray-700">
                "گزارش‌های تحلیلی آجیرو به ما کمک کرد تا الگوهای خرید مشتریان را
                بهتر درک کنیم و موجودی فروشگاه را بر اساس نیاز واقعی تنظیم کنیم.
                نتیجه آن کاهش ۲۵ درصدی هزینه‌های انبارداری بود."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=user3"
                    alt="تصویر کاربر"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">رضا کریمی</h4>
                  <p className="text-gray-600 text-sm">رستوران سنتی ایران</p>
                </div>
              </div>
              <p className="text-gray-700">
                "سیستم سفارش‌گیری و صندوق آجیرو بسیار ساده و کاربردی است.
                کارکنان ما خیلی سریع با آن آشنا شدند و زمان انتظار مشتریان برای
                پرداخت به نصف کاهش یافته است."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">قیمت‌گذاری ساده و شفاف</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              بدون هزینه‌های پنهان، انتخاب طرح مناسب کسب و کار شما
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:border-primary hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-2">پایه</h3>
              <div className="text-4xl font-bold mb-6">رایگان</div>
              <p className="text-gray-600 mb-6">
                برای کسب و کارهای تازه شروع شده
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>صندوق فروش پایه</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>مدیریت تا ۱۰۰ محصول</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>گزارش‌های پایه</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>پشتیبانی ایمیلی</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                شروع رایگان
              </Button>
            </div>

            <div className="bg-primary/5 p-8 rounded-lg shadow-md border border-primary relative transform scale-105">
              <div className="absolute top-0 right-0 bg-primary text-white text-sm py-1 px-3 rounded-bl-lg rounded-tr-lg">
                محبوب‌ترین
              </div>
              <h3 className="text-xl font-bold mb-2">استاندارد</h3>
              <div className="text-4xl font-bold mb-1">۱۹۹,۰۰۰</div>
              <p className="text-sm text-gray-600 mb-6">تومان / ماهانه</p>
              <p className="text-gray-600 mb-6">برای کسب و کارهای در حال رشد</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>تمام امکانات پایه</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>مدیریت نامحدود محصول</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>برنامه وفاداری مشتریان</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>گزارش‌های پیشرفته</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>پشتیبانی تلفنی</span>
                </li>
              </ul>
              <Button className="w-full">انتخاب طرح</Button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:border-primary hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-2">حرفه‌ای</h3>
              <div className="text-4xl font-bold mb-1">۳۴۹,۰۰۰</div>
              <p className="text-sm text-gray-600 mb-6">تومان / ماهانه</p>
              <p className="text-gray-600 mb-6">برای کسب و کارهای بزرگ</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>تمام امکانات استاندارد</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>چند شعبه‌ای</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>API اختصاصی</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>مدیریت کارکنان پیشرفته</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>پشتیبانی ۲۴/۷</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                انتخاب طرح
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">آماده شروع هستید؟</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            همین امروز کسب و کار خود را با آجیرو متحول کنید و از ۱۴ روز استفاده
            رایگان بهره‌مند شوید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              شروع رایگان
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white hover:bg-white/10"
            >
              درخواست دمو
            </Button>
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

export default Landing;
