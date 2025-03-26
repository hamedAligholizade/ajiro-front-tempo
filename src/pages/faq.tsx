import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FAQ = () => {
  // FAQ categories
  const categories = [
    "همه سوالات",
    "شروع کار",
    "حساب کاربری",
    "قیمت‌گذاری",
    "ویژگی‌ها",
    "پشتیبانی",
    "امنیت و حریم خصوصی",
  ];

  // FAQ items
  const faqItems = [
    {
      id: 1,
      question: "آجیرو چیست و چه کاربردی دارد؟",
      answer:
        "آجیرو یک پلتفرم جامع مدیریت کسب و کار برای فروشگاه‌ها و کسب و کارهای کوچک است. این پلتفرم امکان مدیریت فروش، موجودی، مشتریان، گزارش‌گیری و بسیاری از فرآیندهای دیگر را در یک سیستم یکپارچه فراهم می‌کند.",
      category: "شروع کار",
    },
    {
      id: 2,
      question: "آیا می‌توانم آجیرو را به صورت رایگان امتحان کنم؟",
      answer:
        "بله، آجیرو یک دوره آزمایشی ۱۴ روزه رایگان ارائه می‌دهد که در آن می‌توانید به تمامی امکانات نسخه استاندارد دسترسی داشته باشید. برای شروع دوره آزمایشی، کافی است در سایت ثبت نام کنید و هیچ اطلاعات پرداختی از شما دریافت نمی‌شود.",
      category: "قیمت‌گذاری",
    },
    {
      id: 3,
      question: "آیا برای استفاده از آجیرو نیاز به نصب نرم‌افزار خاصی دارم؟",
      answer:
        "خیر، آجیرو یک نرم‌افزار تحت وب است و برای استفاده از آن تنها به یک مرورگر وب و اتصال اینترنت نیاز دارید. این پلتفرم روی تمامی دستگاه‌ها از جمله کامپیوتر، تبلت و موبایل قابل استفاده است.",
      category: "شروع کار",
    },
    {
      id: 4,
      question: "آیا می‌توانم از آجیرو در چندین شعبه استفاده کنم؟",
      answer:
        "بله، در طرح حرفه‌ای آجیرو، امکان مدیریت چندین شعبه وجود دارد. شما می‌توانید موجودی، فروش و گزارش‌های هر شعبه را به صورت جداگانه و یکپارچه مدیریت کنید.",
      category: "ویژگی‌ها",
    },
    {
      id: 5,
      question: "آیا امکان تهیه نسخه پشتیبان از اطلاعات وجود دارد؟",
      answer:
        "بله، آجیرو به صورت خودکار از داده‌های شما نسخه پشتیبان تهیه می‌کند. همچنین، شما می‌توانید در هر زمان به صورت دستی نیز از اطلاعات خود نسخه پشتیبان تهیه کنید و آن را دانلود نمایید.",
      category: "امنیت و حریم خصوصی",
    },
    {
      id: 6,
      question: "آیا آجیرو با دستگاه‌های POS و بارکدخوان سازگار است؟",
      answer:
        "بله، آجیرو با اکثر دستگاه‌های POS، بارکدخوان و پرینترهای فیش رایج در بازار سازگار است. برای اطلاعات بیشتر در مورد دستگاه‌های سازگار، می‌توانید با پشتیبانی ما تماس بگیرید.",
      category: "ویژگی‌ها",
    },
    {
      id: 7,
      question: "هزینه استفاده از آجیرو چقدر است؟",
      answer:
        "آجیرو دارای سه طرح قیمتی است: رایگان، استاندارد و حرفه‌ای. طرح رایگان برای کسب و کارهای تازه شروع شده مناسب است. طرح استاندارد با قیمت ۱۹۹,۰۰۰ تومان ماهانه و طرح حرفه‌ای با قیمت ۳۴۹,۰۰۰ تومان ماهانه ارائه می‌شود. برای اطلاعات بیشتر به صفحه قیمت‌گذاری مراجعه کنید.",
      category: "قیمت‌گذاری",
    },
    {
      id: 8,
      question: "آیا می‌توانم طرح خود را ارتقا یا تغییر دهم؟",
      answer:
        "بله، شما می‌توانید در هر زمان طرح خود را ارتقا دهید و به امکانات بیشتری دسترسی پیدا کنید. همچنین، امکان تغییر طرح از حرفه‌ای به استاندارد نیز وجود دارد، اما توجه داشته باشید که در این صورت برخی از امکانات و داده‌ها ممکن است در دسترس نباشند.",
      category: "حساب کاربری",
    },
    {
      id: 9,
      question: "آیا آجیرو از زبان‌های مختلف پشتیبانی می‌کند؟",
      answer:
        "بله، آجیرو در حال حاضر از زبان‌های فارسی و انگلیسی پشتیبانی می‌کند و به زودی زبان‌های دیگر نیز اضافه خواهند شد.",
      category: "ویژگی‌ها",
    },
    {
      id: 10,
      question: "چگونه می‌توانم با پشتیبانی آجیرو تماس بگیرم؟",
      answer:
        "شما می‌توانید از طریق ایمیل support@ajiro.ir، چت آنلاین در سایت، یا تماس با شماره ۰۲۱-۸۸۶۶۷۷۵۵ با پشتیبانی ما در تماس باشید. پشتیبانی در طرح استاندارد به صورت ساعات اداری و در طرح حرفه‌ای به صورت ۲۴/۷ ارائه می‌شود.",
      category: "پشتیبانی",
    },
    {
      id: 11,
      question: "آیا امکان صدور فاکتور رسمی وجود دارد؟",
      answer:
        "بله، در آجیرو امکان صدور فاکتور رسمی مطابق با استانداردهای سازمان امور مالیاتی وجود دارد. همچنین، می‌توانید فاکتورهای خود را به صورت الکترونیکی برای مشتریان ارسال کنید.",
      category: "ویژگی‌ها",
    },
    {
      id: 12,
      question: "آیا می‌توانم گزارش‌های سفارشی ایجاد کنم؟",
      answer:
        "بله، در طرح‌های استاندارد و حرفه‌ای، امکان ایجاد گزارش‌های سفارشی بر اساس نیازهای خاص کسب و کار شما وجود دارد. همچنین، می‌توانید گزارش‌های خود را در قالب‌های مختلف مانند PDF و Excel خروجی بگیرید.",
      category: "ویژگی‌ها",
    },
    {
      id: 13,
      question: "آیا داده‌های من در آجیرو امن هستند؟",
      answer:
        "بله، امنیت داده‌های شما برای ما بسیار مهم است. آجیرو از پروتکل‌های امنیتی پیشرفته، رمزگذاری داده‌ها و سیستم‌های پشتیبان‌گیری منظم استفاده می‌کند تا از امنیت و محرمانگی اطلاعات شما اطمینان حاصل کند.",
      category: "امنیت و حریم خصوصی",
    },
    {
      id: 14,
      question: "آیا آجیرو با سیستم‌های حسابداری یکپارچه است؟",
      answer:
        "بله، آجیرو با برخی از سیستم‌های حسابداری رایج یکپارچه است و امکان انتقال اطلاعات فروش و موجودی به این سیستم‌ها وجود دارد. برای اطلاعات بیشتر در مورد سیستم‌های حسابداری سازگار، با پشتیبانی ما تماس بگیرید.",
      category: "ویژگی‌ها",
    },
    {
      id: 15,
      question: "آیا می‌توانم آجیرو را با فروشگاه آنلاین خود یکپارچه کنم؟",
      answer:
        "بله، در طرح حرفه‌ای، آجیرو API اختصاصی ارائه می‌دهد که به شما امکان یکپارچه‌سازی با فروشگاه آنلاین و سایر سیستم‌های مورد استفاده در کسب و کار را می‌دهد.",
      category: "ویژگی‌ها",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("همه سوالات");
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Filter FAQ items based on category and search term
  const filteredFAQs = faqItems.filter((item) => {
    const matchesCategory =
      activeCategory === "همه سوالات" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle FAQ item
  const toggleItem = (id: number) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((itemId) => itemId !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

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
            <Link
              to="/faq"
              className="text-gray-600 hover:text-primary font-bold"
            >
              سوالات متداول
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary">
              درباره ما
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary">
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

      {/* FAQ Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">سوالات متداول</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              پاسخ به سوالات رایج شما درباره آجیرو و نحوه استفاده از آن
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto mt-8 relative">
              <input
                type="text"
                placeholder="جستجو در سوالات متداول..."
                className="w-full border border-gray-300 rounded-lg py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Categories */}
            <div className="md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold mb-4">دسته‌بندی‌ها</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={`block w-full text-right py-2 px-3 rounded-md ${activeCategory === category ? "bg-primary text-white" : "hover:bg-gray-100"}`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="md:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">
                  {activeCategory === "همه سوالات"
                    ? "همه سوالات متداول"
                    : `سوالات متداول: ${activeCategory}`}
                </h2>

                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      هیچ نتیجه‌ای یافت نشد. لطفاً جستجوی دیگری را امتحان کنید.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFAQs.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          className="flex justify-between items-center w-full p-4 text-right bg-gray-50 hover:bg-gray-100 transition-colors"
                          onClick={() => toggleItem(item.id)}
                        >
                          <span className="font-medium text-lg">
                            {item.question}
                          </span>
                          {openItems.includes(item.id) ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        {openItems.includes(item.id) && (
                          <div className="p-4 bg-white">
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Still have questions */}
              <div className="bg-primary/5 p-8 rounded-lg shadow-md border border-primary/20 mt-8 text-center">
                <h3 className="text-xl font-bold mb-4">هنوز سوالی دارید؟</h3>
                <p className="text-gray-600 mb-6">
                  اگر پاسخ سوال خود را پیدا نکردید، می‌توانید با تیم پشتیبانی ما
                  تماس بگیرید.
                </p>
                <Link to="/contact">
                  <Button size="lg">تماس با ما</Button>
                </Link>
              </div>
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

export default FAQ;
