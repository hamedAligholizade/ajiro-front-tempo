import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle registration here
    // For now, just redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link to="/">
            <h1 className="text-3xl font-bold text-primary">آجیرو</h1>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            ثبت نام در آجیرو
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            حساب کاربری دارید؟{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/90"
            >
              ورود به حساب
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    نام
                  </label>
                  <div className="mt-1">
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    نام خانوادگی
                  </label>
                  <div className="mt-1">
                    <Input id="lastName" name="lastName" type="text" required />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium text-gray-700"
                >
                  نام کسب و کار
                </label>
                <div className="mt-1">
                  <Input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  ایمیل
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  شماره موبایل
                </label>
                <div className="mt-1">
                  <Input id="phone" name="phone" type="tel" required />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  رمز عبور
                </label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  تکرار رمز عبور
                </label>
                <div className="mt-1">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="mr-2 text-sm text-gray-600">
                  با{" "}
                  <Link
                    to="/terms"
                    className="text-primary hover:text-primary/90"
                  >
                    قوانین و مقررات
                  </Link>{" "}
                  و{" "}
                  <Link
                    to="/privacy"
                    className="text-primary hover:text-primary/90"
                  >
                    سیاست حریم خصوصی
                  </Link>{" "}
                  آجیرو موافقم.
                </label>
              </div>

              <div>
                <Button type="submit" className="w-full flex justify-center">
                  ثبت نام
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    یا ثبت نام با
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <Button variant="outline" className="w-full">
                    <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    گوگل
                  </Button>
                </div>

                <div>
                  <Button variant="outline" className="w-full">
                    <svg
                      className="h-5 w-5 ml-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                        clipRule="evenodd"
                      />
                    </svg>
                    گیت‌هاب
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-bold text-center mb-6">
          مزایای ثبت نام در آجیرو
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-primary/10 p-2 ml-3">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-bold">۱۴ روز رایگان</h4>
            </div>
            <p className="text-gray-600 text-sm">
              پس از ثبت نام، به مدت ۱۴ روز می‌توانید از تمامی امکانات نسخه
              استاندارد به صورت رایگان استفاده کنید.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-primary/10 p-2 ml-3">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-bold">بدون نیاز به کارت اعتباری</h4>
            </div>
            <p className="text-gray-600 text-sm">
              برای شروع دوره آزمایشی نیازی به وارد کردن اطلاعات کارت اعتباری
              نیست و می‌توانید بدون نگرانی ثبت نام کنید.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-primary/10 p-2 ml-3">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-bold">پشتیبانی رایگان</h4>
            </div>
            <p className="text-gray-600 text-sm">
              در طول دوره آزمایشی، از پشتیبانی کامل تیم ما بهره‌مند خواهید شد تا
              بتوانید به راحتی با سیستم آشنا شوید.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} آجیرو. تمامی حقوق محفوظ است.
        </p>
        <div className="mt-2 flex justify-center space-x-6 space-x-reverse text-sm">
          <Link to="/privacy" className="text-gray-500 hover:text-gray-900">
            حریم خصوصی
          </Link>
          <Link to="/terms" className="text-gray-500 hover:text-gray-900">
            شرایط استفاده
          </Link>
          <Link to="/contact" className="text-gray-500 hover:text-gray-900">
            تماس با ما
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
