import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      {/* Pricing Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">قیمت‌گذاری ساده و شفاف</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              بدون هزینه‌های پنهان، انتخاب طرح مناسب کسب و کار شما
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Simple Plan */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:border-primary hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-2">ساده</h3>
              <div className="text-4xl font-bold mb-1">۱۹۹,۰۰۰</div>
              <p className="text-sm text-gray-600 mb-6">تومان / ماهانه</p>
              <p className="text-gray-600 mb-6">برای کسب و کارهای کوچک</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>صندوق فروش پایه</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>مدیریت تا ۵۰۰ محصول</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>گزارش‌های پایه</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>مدیریت مشتریان</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>پشتیبانی ایمیلی</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                انتخاب طرح
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-primary/5 p-8 rounded-lg shadow-md border border-primary relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-sm py-1 px-3 rounded-bl-lg rounded-tr-lg">
                پیشنهاد ویژه
              </div>
              <h3 className="text-xl font-bold mb-2">پریمیوم</h3>
              <div className="text-4xl font-bold mb-1">۳۴۹,۰۰۰</div>
              <p className="text-sm text-gray-600 mb-6">تومان / ماهانه</p>
              <p className="text-gray-600 mb-6">برای کسب و کارهای در حال رشد</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>تمام امکانات طرح ساده</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>مدیریت نامحدود محصول</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>برنامه وفاداری پیشرفته</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>گزارش‌های پیشرفته</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>مدیریت چند شعبه‌ای</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>API اختصاصی</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                  <span>پشتیبانی ۲۴/۷</span>
                </li>
              </ul>
              <Button className="w-full">انتخاب طرح</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">سوالات متداول</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              پاسخ به سوالات رایج شما درباره طرح‌های قیمت‌گذاری
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-2">
                آیا می‌توانم طرح خود را ارتقا دهم؟
              </h3>
              <p className="text-gray-600">
                بله، شما می‌توانید در هر زمان طرح خود را ارتقا دهید و به امکانات
                بیشتری دسترسی پیدا کنید.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-2">
                آیا می‌توانم آجیرو را به صورت رایگان امتحان کنم؟
              </h3>
              <p className="text-gray-600">
                بله، آجیرو یک دوره آزمایشی ۱۴ روزه رایگان ارائه می‌دهد که در آن
                می‌توانید به تمامی امکانات طرح ساده دسترسی داشته باشید.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-2">
                آیا برای استفاده از آجیرو نیاز به نصب نرم‌افزار خاصی دارم؟
              </h3>
              <p className="text-gray-600">
                خیر، آجیرو یک نرم‌افزار تحت وب است و برای استفاده از آن تنها به
                یک مرورگر وب و اتصال اینترنت نیاز دارید.
              </p>
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

      <LandingFooter />
    </div>
  );
};

export default Pricing;
