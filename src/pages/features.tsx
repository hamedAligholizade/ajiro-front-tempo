import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  BarChart2,
  Users,
  MessageSquare,
  Package,
  ClipboardList,
  Send,
  Heart,
  Zap,
  Shield,
  Smartphone,
  Globe,
} from "lucide-react";
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ویژگی‌های آجیرو
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            تمام ابزارهای مورد نیاز برای مدیریت کسب و کار شما در یک پلتفرم
            یکپارچه
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <ShoppingCart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">صندوق فروش</h3>
              <p className="text-gray-600 mb-4">
                سیستم فروش ساده و کارآمد با امکان مدیریت محصولات، تخفیف‌ها و چاپ
                فاکتور
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>مدیریت آسان محصولات و قیمت‌ها</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>اعمال تخفیف‌های مختلف</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>چاپ و ارسال فاکتور</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <BarChart2 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">گزارش‌های تحلیلی</h3>
              <p className="text-gray-600 mb-4">
                گزارش‌های جامع از فروش، موجودی و عملکرد کسب و کار با نمودارهای
                تعاملی
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>تحلیل روند فروش</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>گزارش‌های موجودی</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>تحلیل رفتار مشتریان</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">مدیریت مشتریان</h3>
              <p className="text-gray-600 mb-4">
                ثبت اطلاعات مشتریان، برنامه وفاداری و ارسال پیامک‌های تبلیغاتی
                هدفمند
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>پایگاه داده مشتریان</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>سیستم امتیازدهی و وفاداری</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>بخش‌بندی مشتریان</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">بازخورد مشتریان</h3>
              <p className="text-gray-600 mb-4">
                جمع‌آوری و تحلیل نظرات مشتریان با فرم‌های نظرسنجی و کدهای QR
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>ایجاد فرم‌های نظرسنجی</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>تولید کدهای QR</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>تحلیل بازخوردها</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <Package className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">مدیریت موجودی</h3>
              <p className="text-gray-600 mb-4">
                کنترل دقیق موجودی، هشدار اتمام کالا و مدیریت تأمین‌کنندگان
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>ردیابی موجودی در لحظه</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>هشدارهای اتمام موجودی</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>مدیریت تأمین‌کنندگان</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                <Send className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">کمپین‌های بازاریابی</h3>
              <p className="text-gray-600 mb-4">
                ایجاد و مدیریت کمپین‌های بازاریابی پیامکی برای گروه‌های مختلف
                مشتریان
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>ارسال پیامک گروهی</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>زمان‌بندی کمپین‌ها</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>تحلیل نتایج کمپین</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">ویژگی‌های بیشتر</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              امکانات دیگری که آجیرو را متمایز می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">رابط کاربری ساده</h3>
              <p className="text-gray-600 text-sm">
                طراحی ساده و کاربرپسند برای استفاده آسان بدون نیاز به آموزش
                پیچیده
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">عملکرد سریع</h3>
              <p className="text-gray-600 text-sm">
                سرعت بالا در پردازش اطلاعات و عملیات روزانه کسب و کار
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">امنیت بالا</h3>
              <p className="text-gray-600 text-sm">
                حفاظت از داده‌های کسب و کار و مشتریان با استانداردهای امنیتی
                پیشرفته
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">طراحی واکنش‌گرا</h3>
              <p className="text-gray-600 text-sm">
                قابل استفاده روی تمامی دستگاه‌ها از جمله موبایل، تبلت و کامپیوتر
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            آماده استفاده از آجیرو هستید؟
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            همین امروز کسب و کار خود را با آجیرو متحول کنید و از ۱۴ روز استفاده
            رایگان بهره‌مند شوید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8">
                شروع رایگان
              </Button>
            </Link>
            <Link to="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white hover:bg-white/10"
              >
                مشاهده قیمت‌ها
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Features;
