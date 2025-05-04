import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
// import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PreSale = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    instagramId: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/pre-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // toast.success("اطلاعات شما با موفقیت ثبت شد");
      navigate("/success");
    } catch (error) {
      // toast.error("متاسفانه قادر به ثبت کردن اطلاعات نبودیم. اتصال اینترنتتون رو بررسی کنید و دوباره سعی کنید");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">اشتراک‌ها</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
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
          <div className="mt-12 text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">اولین نفر باش!</h1>
          <p className="text-lg text-gray-600">
            با ثبت نام در پیش‌فروش، از تخفیف ویژه و امکانات اختصاصی بهره‌مند شوید
          </p>
        </div>
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  نام و نام خانوادگی
                </label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  disabled={isLoading}
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  ایمیل
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  شماره تلفن
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  disabled={isLoading}
                  placeholder="09xxxxxxxxx"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="instagramId" className="block text-sm font-medium text-gray-700">
                  آیدی اینستاگرام
                </label>
                <Input
                  id="instagramId"
                  value={formData.instagramId}
                  onChange={(e) => setFormData({ ...formData, instagramId: e.target.value })}
                  required
                  disabled={isLoading}
                  placeholder="instagram.com/your_id"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "در حال ثبت..." : "ارسال درخواست رایگان"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PreSale; 