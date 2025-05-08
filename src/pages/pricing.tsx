import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      {/* Pricing Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">اشتراک‌ها</h2>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
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
                  سفارشات (حداکثر ۳۰۰ سفارش در ماه)
                  <div className="relative group mr-2">
                    <span className="text-gray-400 cursor-help">ⓘ</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      پس از ۳۰۰ سفارش در ماه، برای هر سفارش اضافی مبلغ ۵۰۰ تومان محاسبه می‌شود. این هزینه به صورت خودکار از اعتبار حساب شما کسر می‌شود.
                    </div>
                  </div>
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

      <LandingFooter />
    </div>
  );
};

export default Pricing;
