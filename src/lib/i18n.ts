type Locale = "en" | "fa";

export type Translation = {
  common: {
    dashboard: string;
    salesCounter: string;
    reports: string;
    customerFeedback: string;
    loyaltyProgram: string;
    settings: string;
    customers: string;
    campaigns: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    modules: string;
    quickStats: {
      todaySales: string;
      totalCustomers: string;
      activeOrders: string;
      revenue: string;
    };
  };
  salesCounter: {
    title: string;
    subtitle: string;
    productCatalog: string;
    searchProducts: string;
    shoppingCart: string;
    clear: string;
    cartEmpty: string;
    total: string;
    checkout: string;
    printReceipt: string;
  };
  reports: {
    title: string;
    subtitle: string;
    sales: string;
    inventory: string;
    customers: string;
    totalSales: string;
    transactions: string;
    averageSale: string;
    export: string;
  };
  customerFeedback: {
    title: string;
    subtitle: string;
    surveys: string;
    responses: string;
    qrCodes: string;
    createSurvey: string;
  };
  loyaltyProgram: {
    title: string;
    subtitle: string;
    customers: string;
    campaigns: string;
    rewards: string;
    addCustomer: string;
    searchCustomers: string;
  };
  customers: {
    title: string;
    subtitle: string;
    searchCustomers: string;
    addCustomer: string;
    rfmSegmentation: string;
    champions: string;
    loyalCustomers: string;
    potentialLoyalists: string;
    recentCustomers: string;
    promising: string;
    needsAttention: string;
    atRisk: string;
    cantLoseThem: string;
    hibernating: string;
    lost: string;
  };
  campaigns: {
    title: string;
    subtitle: string;
    createCampaign: string;
    targetAudience: string;
    message: string;
    schedule: string;
    send: string;
    active: string;
    draft: string;
    scheduled: string;
    completed: string;
  };
};

const en: Translation = {
  common: {
    dashboard: "Dashboard",
    salesCounter: "Sales Counter",
    reports: "Reports",
    customerFeedback: "Customer Feedback",
    loyaltyProgram: "Loyalty Program",
    settings: "Settings",
    customers: "Customers",
    campaigns: "Campaigns",
  },
  dashboard: {
    title: "Ajiro Dashboard",
    subtitle: "Small Business Management Suite",
    modules: "Modules",
    quickStats: {
      todaySales: "Today's Sales",
      totalCustomers: "Total Customers",
      activeOrders: "Active Orders",
      revenue: "Revenue (Monthly)",
    },
  },
  salesCounter: {
    title: "Sales Counter",
    subtitle: "Process transactions and checkout",
    productCatalog: "Product Catalog",
    searchProducts: "Search products...",
    shoppingCart: "Shopping Cart",
    clear: "Clear",
    cartEmpty: "Cart is empty",
    total: "Total:",
    checkout: "Checkout",
    printReceipt: "Print Receipt",
  },
  reports: {
    title: "Reports Dashboard",
    subtitle: "Analytics and business insights",
    sales: "Sales",
    inventory: "Inventory",
    customers: "Customers",
    totalSales: "Total Sales",
    transactions: "Transactions",
    averageSale: "Average Sale",
    export: "Export",
  },
  customerFeedback: {
    title: "Customer Feedback",
    subtitle: "Collect and analyze customer feedback",
    surveys: "Surveys",
    responses: "Responses",
    qrCodes: "QR Codes",
    createSurvey: "Create Survey",
  },
  loyaltyProgram: {
    title: "Loyalty Program",
    subtitle: "Manage customer loyalty and rewards",
    customers: "Customers",
    campaigns: "Campaigns",
    rewards: "Rewards",
    addCustomer: "Add Customer",
    searchCustomers: "Search customers...",
  },
  customers: {
    title: "Customers",
    subtitle: "Manage and analyze customer data",
    searchCustomers: "Search customers...",
    addCustomer: "Add Customer",
    rfmSegmentation: "RFM Segmentation",
    champions: "Champions",
    loyalCustomers: "Loyal Customers",
    potentialLoyalists: "Potential Loyalists",
    recentCustomers: "Recent Customers",
    promising: "Promising",
    needsAttention: "Needs Attention",
    atRisk: "At Risk",
    cantLoseThem: "Can't Lose Them",
    hibernating: "Hibernating",
    lost: "Lost",
  },
  campaigns: {
    title: "SMS Campaigns",
    subtitle: "Create and manage marketing campaigns",
    createCampaign: "Create Campaign",
    targetAudience: "Target Audience",
    message: "Message",
    schedule: "Schedule",
    send: "Send",
    active: "Active",
    draft: "Draft",
    scheduled: "Scheduled",
    completed: "Completed",
  },
};

const fa: Translation = {
  common: {
    dashboard: "داشبورد",
    salesCounter: "صندوق فروش",
    reports: "گزارش‌ها",
    customerFeedback: "بازخورد مشتری",
    loyaltyProgram: "برنامه وفاداری",
    settings: "تنظیمات",
    customers: "مشتریان",
    campaigns: "کمپین‌ها",
  },
  dashboard: {
    title: "داشبورد آجیرو",
    subtitle: "سوئیت مدیریت کسب و کار کوچک",
    modules: "ماژول‌ها",
    quickStats: {
      todaySales: "فروش امروز",
      totalCustomers: "کل مشتریان",
      activeOrders: "سفارشات فعال",
      revenue: "درآمد (ماهانه)",
    },
  },
  salesCounter: {
    title: "صندوق فروش",
    subtitle: "پردازش تراکنش‌ها و تسویه حساب",
    productCatalog: "کاتالوگ محصولات",
    searchProducts: "جستجوی محصولات...",
    shoppingCart: "سبد خرید",
    clear: "پاک کردن",
    cartEmpty: "سبد خرید خالی است",
    total: "مجموع:",
    checkout: "پرداخت",
    printReceipt: "چاپ رسید",
  },
  reports: {
    title: "داشبورد گزارش‌ها",
    subtitle: "تحلیل و بینش‌های کسب و کار",
    sales: "فروش",
    inventory: "موجودی",
    customers: "مشتریان",
    totalSales: "کل فروش",
    transactions: "تراکنش‌ها",
    averageSale: "میانگین فروش",
    export: "خروجی",
  },
  customerFeedback: {
    title: "بازخورد مشتری",
    subtitle: "جمع‌آوری و تحلیل بازخورد مشتری",
    surveys: "نظرسنجی‌ها",
    responses: "پاسخ‌ها",
    qrCodes: "کدهای QR",
    createSurvey: "ایجاد نظرسنجی",
  },
  loyaltyProgram: {
    title: "برنامه وفاداری",
    subtitle: "مدیریت وفاداری مشتری و پاداش‌ها",
    customers: "مشتریان",
    campaigns: "کمپین‌ها",
    rewards: "پاداش‌ها",
    addCustomer: "افزودن مشتری",
    searchCustomers: "جستجوی مشتریان...",
  },
  customers: {
    title: "مشتریان",
    subtitle: "مدیریت و تحلیل داده‌های مشتریان",
    searchCustomers: "جستجوی مشتریان...",
    addCustomer: "افزودن مشتری",
    rfmSegmentation: "بخش‌بندی RFM",
    champions: "قهرمانان",
    loyalCustomers: "مشتریان وفادار",
    potentialLoyalists: "وفاداران بالقوه",
    recentCustomers: "مشتریان جدید",
    promising: "امیدوارکننده",
    needsAttention: "نیازمند توجه",
    atRisk: "در خطر",
    cantLoseThem: "غیرقابل از دست دادن",
    hibernating: "غیرفعال",
    lost: "از دست رفته",
  },
  campaigns: {
    title: "کمپین‌های پیامکی",
    subtitle: "ایجاد و مدیریت کمپین‌های بازاریابی",
    createCampaign: "ایجاد کمپین",
    targetAudience: "مخاطبان هدف",
    message: "پیام",
    schedule: "زمان‌بندی",
    send: "ارسال",
    active: "فعال",
    draft: "پیش‌نویس",
    scheduled: "زمان‌بندی شده",
    completed: "تکمیل شده",
  },
};

export const translations: Record<Locale, Translation> = {
  en,
  fa,
};

let currentLocale: Locale = "fa";

export const getLocale = (): Locale => currentLocale;

export const setLocale = (locale: Locale): void => {
  currentLocale = locale;
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  document.documentElement.classList.remove("ltr", "rtl");
  document.documentElement.classList.add(locale === "fa" ? "rtl" : "ltr");
};

export const t = (key: string): string => {
  const keys = key.split(".");
  let result: any = translations[currentLocale];

  for (const k of keys) {
    if (result[k] === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    result = result[k];
  }

  return result;
};
