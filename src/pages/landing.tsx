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
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";
import { Card } from "@/components/ui/card";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                مدیریت هوشمند کسب و کار با آجیرو
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                راهکار جامع مدیریت فروشگاه، مشتریان و موجودی برای کسب و کارها
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8" onClick={() => window.location.href = "https://ajiro.ir/pre"}>
                  شروع رایگان
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
                {/* <Button variant="outline" size="lg">
                  نمایش دمو
                </Button> */}
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
      <section className="py-20 bg-white" id="features">
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
      <section className="py-20 bg-gray-50" id="testimonials">
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
      <section className="py-20 bg-white" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">اشتراک‌ها</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">اشتراک رایگان</h3>
              <p className="text-gray-600 mb-4">
                دسترسی به تمام امکانات اصلی با محدودیت‌های مشخص شده
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  مدیریت موجودی 
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                   سفارشات (حداکثر ۱۰۰ سفارش در ماه)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  صندوق فروش (حداکثر ۲ کاربر)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  مدیریت مشتریان (حداکثر ۱۰۰ مشتری)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  گزارش‌های پایه فروش
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  اتصال به اینستاگرام(آزمایشی) و تلگرام
                </li>
              </ul>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">توجه:</span> در صورت نیاز به افزایش محدودیت‌ها، می‌توانید به اشتراک حرفه‌ای ارتقا دهید.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 relative overflow-hidden">
              <div className="absolute top-5 right-0 bg-red-500 text-white px-4 py-1 text-sm font-bold transform rotate-45 translate-x-8 -translate-y-2 w-32">
                پیش‌فروش
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">اشتراک حرفه‌ای</h3>
              <p className="text-gray-600 mb-4">
                دسترسی نامحدود به تمام امکانات با پشتیبانی اختصاصی
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  مدیریت موجودی 
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  سفارشات نامحدود
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  کاربران نامحدود
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  مشتریان نامحدود
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  گزارش‌های پیشرفته
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  اتصال به اینستاگرام(آزمایشی) و تلگرام
                </li>
              </ul>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <p className="text-2xl font-bold text-primary">۹۹۸ هزار تومان</p>
                  <span className="text-sm text-gray-500 line-through">۲۳ میلیون تومان</span>
                </div>
                <p className="text-sm text-green-600 font-semibold mb-2">۹۵٪ تخفیف پیش‌فروش</p>
                <p className="text-sm text-gray-500 mb-4">برای دو سال</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">فقط ۵۰ نفر اول:</span> قیمت پیش‌فروش + ۳ ماه رایگان
                  </p>
                </div>
                <Button className="w-full" onClick={() => window.location.href = "https://zarinp.al/705541"}>ثبت نام و خرید</Button>
                <p className="text-xs text-gray-500 mt-2">پیش‌فروش تا ۱۵ خرداد ۱۴۰۴</p>
              </div>
            </Card>
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

      <LandingFooter />
    </div>
  );
};

export default Landing;
