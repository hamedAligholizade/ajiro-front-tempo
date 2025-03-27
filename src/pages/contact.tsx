import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

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

      {/* Remote Work Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">شرکت دورکار</h2>
            <p className="text-gray-600 text-center mb-6">
              آجیرو یک شرکت کاملاً دورکار است. ما معتقدیم که کار با کیفیت نیازی
              به حضور فیزیکی ندارد و با استفاده از ابزارهای ارتباطی مدرن،
              می‌توانیم بهترین خدمات را به مشتریان خود ارائه دهیم.
            </p>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                alt="کار از راه دور"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Contact;
