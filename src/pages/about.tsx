import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  Target,
  Clock,
  Heart,
  Shield,
} from "lucide-react";

const About = () => {
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
            <Link to="/about" className="text-primary font-medium">
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
              <Button size="sm">
                ثبت نام
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">درباره آجیرو</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            ما به کسب و کارهای کوچک کمک می‌کنیم تا با ابزارهای هوشمند، رشد کنند و موفق شوند
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="تیم آجیرو"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">داستان ما</h2>
              <p className="text-gray-700 mb-4">
                آجیرو در سال ۱۳۹۸ با هدف ارائه راهکارهای نوآورانه برای مدیریت کسب و کارهای کوچک تأسیس شد. بنیانگذاران ما، گروهی از متخصصان فناوری و کارآفرینان با تجربه در صنعت خرده‌فروشی بودند که چالش‌های مدیریت کسب و کارهای کوچک را به خوبی درک می‌کردند.
              </p>
              <p className="text-gray-700 mb-4">
                ما متوجه شدیم که بسیاری از کسب و کارهای کوچک در ایران از نرم‌افزارهای پیچیده و گران قیمت استفاده می‌کنند یا هنوز به روش‌های سنتی کار می‌کنند. هدف ما ایجاد یک پلتفرم ساده، مقرون به صرفه و در عین حال قدرتمند بود که تمام نیازهای یک کسب و کار کوچک را پوشش دهد.
              </p>
              <p className="text-gray-700">
                امروز، آجیرو به بیش از ۵۰۰۰ کسب و کار کوچک در سراسر ایران خدمات ارائه می‌دهد و به آنها کمک می‌کند تا فرآیندهای خود را بهینه کنند، مشتریان خود را بهتر بشناسند و فروش خود را افزایش دهند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">مأموریت و ارزش‌های ما</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ما با تعهد به اصول و ارزش‌های خود، به دنبال ایجاد تحول در مدیریت کسب و کارهای کوچک هستیم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-primary/10 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">مأموریت</h3>
              <p className="text-gray-700">
                توانمندسازی کسب و کارهای کوچک با ابزارهای هوشمند و کاربرپسند برای رشد و موفقیت در بازار رقابتی امروز
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-primary/10 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">چشم‌انداز</h3>
              <p className="text-gray-700">
                تبدیل شدن به برترین پلتفرم مدیریت کسب و کار کوچک در خاورمیانه و کمک به رشد اقتصادی از طریق توانمندسازی کارآفرینان
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-primary/10 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">ارزش‌ها</h3>
              <p className="text-gray-700">
                سادگی، نوآوری، پاسخگویی، شفافیت و تعهد به موفقیت مشتریان، اصول اساسی ما در ارائه خدمات هستند
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">تیم ما</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              گروهی از متخصصان با تجربه که با اشتیاق برای موفقیت شما کار می‌کنند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=ceo"
                  alt="مدیرعامل"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">محمد احمدی</h3>
              <p className="text-gray-600">مدیرعامل و بنیانگذار</p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=cto"
                  alt="مدیر فنی"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">سارا رضایی</h3>
              <p className="text-gray-600">مدیر فنی</p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=cmo"
                  alt="مدیر بازاریابی"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">علی کریمی</h3>
              <p className="text-gray-600">مدیر بازاریابی</p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=cpo"
                  alt="مدیر محصول"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">مریم نوری</h3>
              <p className="text-gray-600">مدیر محصول</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">۵,۰۰۰+</div>
              <p className="text-xl">کسب و کار</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">۲۵+</div>
              <p className="text-xl">استان</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">۹۸٪</div>
              <p className="text-xl">رضایت مشتریان</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">۴</div>
              <p className="text-xl">سال فعالیت</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">تماس با ما</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              سوالی دارید؟ تیم ما آماده پاسخگویی به شماست
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg shadow-md border border-gray-100">
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">پشتیبانی</h3>
              <p className="text-gray-600 mb-4">برای سوالات فنی و پشتیبانی</p>
              <p className="text-primary font-medium">support@ajiro.ir</p>
            </div>

            <div className="text-center p-6 rounded-lg shadow-md border border-gray-100">
