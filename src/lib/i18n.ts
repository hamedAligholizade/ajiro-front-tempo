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
    acquisition: string;
    inventory: string;
    orders: string;
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
  settings: {
    profile: string;
    store: string;
    products: string;
    notifications: string;
    security: string;
    billing: string;
    profileSettings: string;
    profileSettingsDescription: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    admin: string;
    manager: string;
    staff: string;
    saveChanges: string;
    storeSettings: string;
    storeSettingsDescription: string;
    storeName: string;
    storeAddress: string;
    businessType: string;
    retail: string;
    restaurant: string;
    service: string;
    currency: string;
    productSettings: string;
    productSettingsDescription: string;
    notificationSettings: string;
    notificationSettingsDescription: string;
    securitySettings: string;
    securitySettingsDescription: string;
    billingSettings: string;
    billingSettingsDescription: string;
    comingSoon: string;
  };
  acquisition: {
    title: string;
    subtitle: string;
    luckyWheel: string;
    luckyWheelDescription: string;
    spinWheel: string;
    prizes: string;
    congratulations: string;
    tryAgain: string;
    enterPhone: string;
    phoneRequired: string;
    submit: string;
    termsAndConditions: string;
    shareWithFriends: string;
    inviteFriends: string;
    referralCode: string;
    copyCode: string;
    shareOnSocialMedia: string;
  };
  inventory: {
    title: string;
    subtitle: string;
    addProduct: string;
    searchProducts: string;
    totalProducts: string;
    lowStock: string;
    outOfStock: string;
    allCategories: string;
    sortBy: string;
    products: string;
    allProducts: string;
    analytics: string;
    lowStockAlert: string;
    stockHistory: string;
    productDetails: string;
    price: string;
    cost: string;
    stock: string;
    supplier: string;
    lastRestocked: string;
    reorderPoint: string;
    category: string;
    storageLocation: string;
    increaseStock: string;
    decreaseStock: string;
    inStock: string;
    orderMore: string;
    orderNow: string;
    inventoryValue: string;
    inventoryStatus: string;
    categoryBreakdown: string;
    edit: string;
    adjustStock: string;
  };
  orders: {
    title: string;
    subtitle: string;
    createOrder: string;
    pending: string;
    processing: string;
    shipped: string;
    delivered: string;
    cancelled: string;
    allOrders: string;
    pendingOrders: string;
    processingOrders: string;
    shippedOrders: string;
    deliveredOrders: string;
    cancelledOrders: string;
    filterByDate: string;
    status: string;
    payment: string;
    items: string;
    total: string;
    changeStatus: string;
    orderInformation: string;
    customer: string;
    orderTimeline: string;
    orderItems: string;
    orderNumber: string;
    date: string;
    shippingAddress: string;
    notes: string;
    product: string;
    price: string;
    quantity: string;
    subtotal: string;
    tax: string;
    shipping: string;
    grandTotal: string;
    orderPlaced: string;
    orderProcessing: string;
    updateStatus: string;
    updatePayment: string;
    markAsPaid: string;
    markAsUnpaid: string;
    refund: string;
    paid: string;
    unpaid: string;
    refunded: string;
    print: string;
    email: string;
    searchOrders: string;
    filter: string;
    dateRange: string;
  };
  subtotal: string;
  discount: string;
  loyaltyDiscount: string;
  tax: string;
  each: string;
  off: string;
  stock: string;
  missing_information: string;
  enter_name_required: string;
  customer_created: string;
  customer_added_successfully: string;
  error_creating_customer: string;
  problem_adding_customer: string;
  tier_bronze: string;
  tier_silver: string;
  tier_gold: string;
  tier_platinum: string;
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
    acquisition: "Customer Acquisition",
    inventory: "Inventory Management",
    orders: "Order Management",
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
    subtitle: "Process sales and manage transactions",
    productCatalog: "Product Catalog",
    searchProducts: "Search products...",
    shoppingCart: "Shopping Cart",
    cartEmpty: "Your cart is empty",
    checkout: "Checkout",
    printReceipt: "Print Receipt",
    clear: "Clear",
    total: "Total",
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
  settings: {
    profile: "Profile",
    store: "Store",
    products: "Products",
    notifications: "Notifications",
    security: "Security",
    billing: "Billing",
    profileSettings: "Profile Settings",
    profileSettingsDescription:
      "Manage your personal information and account settings",
    name: "Name",
    email: "Email",
    phone: "Phone",
    role: "Role",
    admin: "Administrator",
    manager: "Manager",
    staff: "Staff",
    saveChanges: "Save Changes",
    storeSettings: "Store Settings",
    storeSettingsDescription: "Manage your store information and preferences",
    storeName: "Store Name",
    storeAddress: "Store Address",
    businessType: "Business Type",
    retail: "Retail",
    restaurant: "Restaurant",
    service: "Service",
    currency: "Currency",
    productSettings: "Product Settings",
    productSettingsDescription: "Manage your product catalog and inventory",
    notificationSettings: "Notification Settings",
    notificationSettingsDescription: "Manage your notification preferences",
    securitySettings: "Security Settings",
    securitySettingsDescription: "Manage your security and privacy settings",
    billingSettings: "Billing Settings",
    billingSettingsDescription:
      "Manage your billing information and subscription",
    comingSoon: "Coming Soon",
  },
  acquisition: {
    title: "Customer Acquisition",
    subtitle: "Tools to attract new customers to your business",
    luckyWheel: "Lucky Wheel",
    luckyWheelDescription: "Spin the wheel for a chance to win exciting prizes",
    spinWheel: "Spin the Wheel",
    prizes: "Prizes",
    congratulations: "Congratulations!",
    tryAgain: "Try Again",
    enterPhone: "Enter your phone number to claim your prize",
    phoneRequired: "Phone number is required",
    submit: "Submit",
    termsAndConditions: "Terms and Conditions",
    shareWithFriends: "Share with Friends",
    inviteFriends: "Invite Friends",
    referralCode: "Referral Code",
    copyCode: "Copy Code",
    shareOnSocialMedia: "Share on Social Media",
  },
  inventory: {
    title: "Inventory Management",
    subtitle: "Manage your products, stock levels, and suppliers",
    addProduct: "Add Product",
    searchProducts: "Search products...",
    totalProducts: "Total Products",
    lowStock: "Low Stock",
    outOfStock: "Out of Stock",
    allCategories: "All Categories",
    sortBy: "Sort By",
    products: "Products",
    allProducts: "All Products",
    analytics: "Analytics",
    lowStockAlert: "Low Stock Alert",
    stockHistory: "Stock History",
    productDetails: "Product Details",
    price: "Price",
    cost: "Cost",
    stock: "Stock",
    supplier: "Supplier",
    lastRestocked: "Last Restocked",
    reorderPoint: "Reorder Point",
    category: "Category",
    storageLocation: "Storage Location",
    increaseStock: "Increase Stock +1",
    decreaseStock: "Decrease Stock -1",
    inStock: "In Stock",
    orderMore: "Order More",
    orderNow: "Order Now",
    inventoryValue: "Inventory Value",
    inventoryStatus: "Inventory Status",
    categoryBreakdown: "Category Breakdown",
    edit: "Edit",
    adjustStock: "Adjust Stock",
  },
  orders: {
    title: "Order Management",
    subtitle: "View and manage customer orders",
    createOrder: "Create Order",
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    allOrders: "All Orders",
    pendingOrders: "Pending Orders",
    processingOrders: "Processing Orders",
    shippedOrders: "Shipped Orders",
    deliveredOrders: "Delivered Orders",
    cancelledOrders: "Cancelled Orders",
    filterByDate: "Filter by date",
    status: "Status",
    payment: "Payment",
    items: "Items",
    total: "Total",
    changeStatus: "Change Status:",
    orderInformation: "Order Information",
    customer: "Customer",
    orderTimeline: "Order Timeline",
    orderItems: "Order Items",
    orderNumber: "Order Number",
    date: "Date",
    shippingAddress: "Shipping Address",
    notes: "Notes",
    product: "Product",
    price: "Price",
    quantity: "Quantity",
    subtotal: "Subtotal",
    tax: "Tax",
    shipping: "Shipping",
    grandTotal: "Total",
    orderPlaced: "Order Placed",
    orderProcessing: "Order Processing",
    updateStatus: "Update Status",
    updatePayment: "Update Payment",
    markAsPaid: "Mark as Paid",
    markAsUnpaid: "Mark as Unpaid",
    refund: "Refund",
    paid: "Paid",
    unpaid: "Unpaid",
    refunded: "Refunded",
    print: "Print",
    email: "Email",
    searchOrders: "Search orders...",
    filter: "Filter",
    dateRange: "Date Range",
  },
  subtotal: "Subtotal",
  discount: "Discount",
  loyaltyDiscount: "Loyalty Discount",
  tax: "Tax",
  each: "each",
  off: "off",
  stock: "Stock",
  missing_information: "Missing information",
  enter_name_required: "Please enter at least first and last name",
  customer_created: "Customer created",
  customer_added_successfully: "{{name}} has been added successfully",
  error_creating_customer: "Error creating customer",
  problem_adding_customer: "There was a problem adding the new customer",
  tier_bronze: "Bronze",
  tier_silver: "Silver",
  tier_gold: "Gold",
  tier_platinum: "Platinum",
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
    acquisition: "جذب مشتری",
    inventory: "مدیریت موجودی",
    orders: "مدیریت سفارشات",
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
    subtitle: "پردازش فروش و مدیریت تراکنش‌ها",
    productCatalog: "کاتالوگ محصولات",
    searchProducts: "جستجوی محصولات...",
    shoppingCart: "سبد خرید",
    cartEmpty: "سبد خرید شما خالی است",
    checkout: "تسویه حساب",
    printReceipt: "چاپ رسید",
    clear: "پاک کردن",
    total: "جمع کل",
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
  settings: {
    profile: "پروفایل",
    store: "فروشگاه",
    products: "محصولات",
    notifications: "اعلان‌ها",
    security: "امنیت",
    billing: "صورتحساب",
    profileSettings: "تنظیمات پروفایل",
    profileSettingsDescription: "مدیریت اطلاعات شخصی و تنظیمات حساب کاربری",
    name: "نام",
    email: "ایمیل",
    phone: "تلفن",
    role: "نقش",
    admin: "مدیر",
    manager: "مدیر اجرایی",
    staff: "کارمند",
    saveChanges: "ذخیره تغییرات",
    storeSettings: "تنظیمات فروشگاه",
    storeSettingsDescription: "مدیریت اطلاعات و تنظیمات فروشگاه",
    storeName: "نام فروشگاه",
    storeAddress: "آدرس فروشگاه",
    businessType: "نوع کسب و کار",
    retail: "خرده‌فروشی",
    restaurant: "رستوران",
    service: "خدمات",
    currency: "واحد پول",
    productSettings: "تنظیمات محصولات",
    productSettingsDescription: "مدیریت کاتالوگ محصولات و موجودی",
    notificationSettings: "تنظیمات اعلان‌ها",
    notificationSettingsDescription: "مدیریت تنظیمات اعلان‌ها",
    securitySettings: "تنظیمات امنیتی",
    securitySettingsDescription: "مدیریت تنظیمات امنیتی و حریم خصوصی",
    billingSettings: "تنظیمات صورتحساب",
    billingSettingsDescription: "مدیریت اطلاعات صورتحساب و اشتراک",
    comingSoon: "به زودی",
  },
  acquisition: {
    title: "جذب مشتری",
    subtitle: "ابزارهایی برای جذب مشتریان جدید به کسب و کار شما",
    luckyWheel: "چرخ شانس",
    luckyWheelDescription:
      "چرخ را بچرخانید و شانس خود را برای بردن جوایز هیجان‌انگیز امتحان کنید",
    spinWheel: "چرخاندن چرخ",
    prizes: "جوایز",
    congratulations: "تبریک!",
    tryAgain: "دوباره امتحان کنید",
    enterPhone: "برای دریافت جایزه خود، شماره تلفن خود را وارد کنید",
    phoneRequired: "شماره تلفن الزامی است",
    submit: "ارسال",
    termsAndConditions: "شرایط و ضوابط",
    shareWithFriends: "اشتراک‌گذاری با دوستان",
    inviteFriends: "دعوت از دوستان",
    referralCode: "کد معرف",
    copyCode: "کپی کد",
    shareOnSocialMedia: "اشتراک‌گذاری در شبکه‌های اجتماعی",
  },
  inventory: {
    title: "مدیریت موجودی",
    subtitle: "مدیریت محصولات، سطوح موجودی و تأمین کنندگان",
    addProduct: "افزودن محصول",
    searchProducts: "جستجوی محصولات...",
    totalProducts: "کل محصولات",
    lowStock: "موجودی کم",
    outOfStock: "اتمام موجودی",
    allCategories: "همه دسته‌ها",
    sortBy: "مرتب‌سازی بر اساس",
    products: "محصولات",
    allProducts: "همه محصولات",
    analytics: "تحلیل‌ها",
    lowStockAlert: "هشدار موجودی کم",
    stockHistory: "تاریخچه موجودی",
    productDetails: "جزئیات محصول",
    price: "قیمت",
    cost: "هزینه",
    stock: "موجودی",
    supplier: "تأمین کننده",
    lastRestocked: "آخرین بازپرسازی",
    reorderPoint: "نقطه سفارش مجدد",
    category: "دسته‌بندی",
    storageLocation: "محل نگهداری",
    increaseStock: "افزایش موجودی +1",
    decreaseStock: "کاهش موجودی -1",
    inStock: "موجود",
    orderMore: "سفارش بیشتر",
    orderNow: "سفارش الان",
    inventoryValue: "ارزش موجودی",
    inventoryStatus: "وضعیت موجودی",
    categoryBreakdown: "تفکیک دسته‌بندی",
    edit: "ویرایش",
    adjustStock: "تنظیم موجودی",
  },
  orders: {
    title: "مدیریت سفارشات",
    subtitle: "مشاهده و مدیریت سفارشات مشتریان",
    createOrder: "ایجاد سفارش",
    pending: "در انتظار",
    processing: "در حال پردازش",
    shipped: "ارسال شده",
    delivered: "تحویل داده شده",
    cancelled: "لغو شده",
    allOrders: "همه سفارشات",
    pendingOrders: "سفارشات در انتظار",
    processingOrders: "سفارشات در حال پردازش",
    shippedOrders: "سفارشات ارسال شده",
    deliveredOrders: "سفارشات تحویل داده شده",
    cancelledOrders: "سفارشات لغو شده",
    filterByDate: "فیلتر بر اساس تاریخ",
    status: "وضعیت",
    payment: "پرداخت",
    items: "اقلام",
    total: "مجموع",
    changeStatus: "تغییر وضعیت:",
    orderInformation: "اطلاعات سفارش",
    customer: "مشتری",
    orderTimeline: "جدول زمانی سفارش",
    orderItems: "اقلام سفارش",
    orderNumber: "شماره سفارش",
    date: "تاریخ",
    shippingAddress: "آدرس ارسال",
    notes: "یادداشت‌ها",
    product: "محصول",
    price: "قیمت",
    quantity: "تعداد",
    subtotal: "جمع جزء",
    tax: "مالیات",
    shipping: "هزینه ارسال",
    grandTotal: "جمع کل",
    orderPlaced: "سفارش ثبت شد",
    orderProcessing: "سفارش در حال پردازش",
    updateStatus: "بروزرسانی وضعیت",
    updatePayment: "بروزرسانی پرداخت",
    markAsPaid: "علامت به عنوان پرداخت شده",
    markAsUnpaid: "علامت به عنوان پرداخت نشده",
    refund: "بازپرداخت",
    paid: "پرداخت شده",
    unpaid: "پرداخت نشده",
    refunded: "بازپرداخت شده",
    print: "چاپ",
    email: "ایمیل",
    searchOrders: "جستجوی سفارشات...",
    filter: "فیلتر",
    dateRange: "بازه زمانی",
  },
  subtotal: "جمع جزء",
  discount: "تخفیف",
  loyaltyDiscount: "تخفیف وفاداری",
  tax: "مالیات",
  each: "هر کدام",
  off: "تخفیف",
  stock: "موجودی",
  missing_information: "اطلاعات ناقص",
  enter_name_required: "لطفاً حداقل نام و نام خانوادگی را وارد کنید",
  customer_created: "مشتری ایجاد شد",
  customer_added_successfully: "{{name}} با موفقیت اضافه شد",
  error_creating_customer: "خطا در ایجاد مشتری",
  problem_adding_customer: "مشکلی در افزودن مشتری جدید وجود داشت",
  tier_bronze: "برنزی",
  tier_silver: "نقره‌ای",
  tier_gold: "طلایی",
  tier_platinum: "پلاتینیوم",
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
