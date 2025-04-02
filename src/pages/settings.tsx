import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { t } from "@/lib/i18n";
import { User, Store, Package, Bell, Shield, CreditCard, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import shopService, { ShopUser } from "@/api/services/shopService";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const { shop } = useAppSelector(state => state.auth);
  const [shopUsers, setShopUsers] = useState<ShopUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    role: 'cashier'
  });

  // Fetch shop users when component mounts
  useEffect(() => {
    if (shop) {
      const fetchShopUsers = async () => {
        setIsLoading(true);
        try {
          const response = await shopService.getShopUsers(shop.id);
          setShopUsers(response);
        } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to load shop users');
        } finally {
          setIsLoading(false);
        }
      };

      fetchShopUsers();
    }
  }, [shop]);

  const handleAddUser = async () => {
    if (!newUser.email) {
      setError('لطفاً ایمیل کاربر را وارد کنید');
      return;
    }

    try {
      setIsLoading(true);
      await shopService.addUserToShop(shop!.id, newUser);
      
      // Refresh user list
      const response = await shopService.getShopUsers(shop!.id);
      setShopUsers(response);
      
      // Reset and close modal
      setNewUser({ email: '', role: 'cashier' });
      setShowAddUserModal(false);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در افزودن کاربر');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("common.settings")}</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {t("settings.profile")}
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            {t("settings.store")}
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            {t("settings.products")}
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            {t("settings.notifications")}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t("settings.security")}
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            {t("settings.billing")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.profileSettings")}</CardTitle>
              <CardDescription>
                {t("settings.profileSettingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("settings.name")}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    defaultValue="مدیر سیستم"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("settings.email")}
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-md"
                    defaultValue="admin@ajiro.ir"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("settings.phone")}
                  </label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded-md"
                    defaultValue="+98 912 345 6789"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("settings.role")}
                  </label>
                  <select className="w-full p-2 border rounded-md">
                    <option>{t("settings.admin")}</option>
                    <option>{t("settings.manager")}</option>
                    <option>{t("settings.staff")}</option>
                  </select>
                </div>
              </div>
              <Button type="button">{t("settings.saveChanges")}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.storeSettings")}</CardTitle>
              <CardDescription>
                {t("settings.storeSettingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("settings.storeName")}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    defaultValue={shop?.name || ""}
                    placeholder="نام فروشگاه خود را وارد کنید"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("settings.storeAddress")}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    defaultValue="تهران، خیابان ولیعصر"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("settings.businessType")}
                  </label>
                  <select className="w-full p-2 border rounded-md">
                    <option>{t("settings.retail")}</option>
                    <option>{t("settings.restaurant")}</option>
                    <option>{t("settings.service")}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("settings.currency")}
                  </label>
                  <select className="w-full p-2 border rounded-md">
                    <option>تومان</option>
                    <option>ریال</option>
                  </select>
                </div>
              </div>
              
              {/* Shop Users Section */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">کاربران فروشگاه</h3>
                <div className="border rounded-md">
                  <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
                    <div className="font-medium">لیست کاربران</div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAddUserModal(true)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      افزودن کاربر
                    </Button>
                  </div>
                  
                  {isLoading ? (
                    <div className="p-8 text-center">
                      <p>در حال بارگذاری...</p>
                    </div>
                  ) : error ? (
                    <div className="p-4 text-center text-red-600">
                      <p>{error}</p>
                    </div>
                  ) : shopUsers.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <p>هیچ کاربری برای این فروشگاه یافت نشد</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {shopUsers.map(user => (
                        <div key={user.id} className="p-3 flex justify-between items-center">
                          <div>
                            <div className="font-medium">{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                            <div className="text-xs text-primary">{user.role}</div>
                          </div>
                          <div className="flex space-x-2 space-x-reverse">
                            <Button variant="ghost" size="sm">ویرایش</Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500"
                              onClick={() => {
                                if (confirm(`آیا از حذف ${user.firstName} ${user.lastName} اطمینان دارید؟`)) {
                                  // TODO: Implement removeUserFromShop
                                  shopService.removeUserFromShop(shop.id, user.id)
                                    .then(() => {
                                      // Remove user from state
                                      setShopUsers(shopUsers.filter(u => u.id !== user.id));
                                    })
                                    .catch(err => {
                                      setError(err.response?.data?.message || 'خطا در حذف کاربر');
                                    });
                                }
                              }}
                            >
                              حذف
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <Button type="button">{t("settings.saveChanges")}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.productSettings")}</CardTitle>
              <CardDescription>
                {t("settings.productSettingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      دسته‌بندی محصولات
                    </label>
                    <div className="border rounded-md p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span>نوشیدنی‌ها</span>
                        <button className="text-red-500 hover:text-red-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>غذاها</span>
                        <button className="text-red-500 hover:text-red-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>لوازم التحریر</span>
                        <button className="text-red-500 hover:text-red-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex mt-2">
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded-r-none rounded-md"
                        placeholder="دسته‌بندی جدید"
                      />
                      <button className="bg-primary text-primary-foreground p-2 rounded-l-md">
                        افزودن
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      واحدهای اندازه‌گیری
                    </label>
                    <div className="border rounded-md p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span>عدد</span>
                        <button className="text-red-500 hover:text-red-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>کیلوگرم</span>
                        <button className="text-red-500 hover:text-red-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>لیتر</span>
                        <button className="text-red-500 hover:text-red-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex mt-2">
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded-r-none rounded-md"
                        placeholder="واحد جدید"
                      />
                      <button className="bg-primary text-primary-foreground p-2 rounded-l-md">
                        افزودن
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium">تنظیمات مالیات</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">
                        نرخ مالیات بر ارزش افزوده
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          className="w-full p-2 border rounded-md"
                          defaultValue="9"
                        />
                        <span className="mr-2">%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        className="rounded"
                        id="tax-enabled"
                        defaultChecked
                      />
                      <label htmlFor="tax-enabled">فعال‌سازی مالیات</label>
                    </div>
                  </div>
                </div>

                <Button type="button" className="mt-4">
                  {t("settings.saveChanges")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.notificationSettings")}</CardTitle>
              <CardDescription>
                {t("settings.notificationSettingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    اعلان‌های ایمیلی
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <p className="font-medium">سفارش‌های جدید</p>
                        <p className="text-sm text-muted-foreground">
                          دریافت ایمیل هنگام ثبت سفارش جدید
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <p className="font-medium">موجودی کم</p>
                        <p className="text-sm text-muted-foreground">
                          دریافت ایمیل هنگام کم شدن موجودی محصولات
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <p className="font-medium">بازخورد مشتریان</p>
                        <p className="text-sm text-muted-foreground">
                          دریافت ایمیل هنگام ثبت بازخورد جدید
                        </p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium">
                    اعلان‌های پیامکی
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <p className="font-medium">سفارش‌های جدید</p>
                        <p className="text-sm text-muted-foreground">
                          دریافت پیامک هنگام ثبت سفارش جدید
                        </p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <p className="font-medium">تغییر وضعیت سفارش</p>
                        <p className="text-sm text-muted-foreground">
                          دریافت پیامک هنگام تغییر وضعیت سفارش
                        </p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>

                <Button type="button" className="mt-4">
                  {t("settings.saveChanges")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.securitySettings")}</CardTitle>
              <CardDescription>
                {t("settings.securitySettingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">تغییر رمز عبور</label>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">
                        رمز عبور فعلی
                      </label>
                      <input
                        type="password"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        رمز عبور جدید
                      </label>
                      <input
                        type="password"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        تکرار رمز عبور جدید
                      </label>
                      <input
                        type="password"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium">
                    تنظیمات احراز هویت دو مرحله‌ای
                  </label>
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">احراز هویت دو مرحله‌ای</p>
                        <p className="text-sm text-muted-foreground">
                          افزایش امنیت حساب کاربری با استفاده از کد تأیید
                        </p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium">
                    مدیریت دسترسی‌ها
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <p className="font-medium">مدیر (Admin)</p>
                        <p className="text-sm text-muted-foreground">
                          دسترسی کامل به تمام بخش‌ها
                        </p>
                      </div>
                      <button className="text-primary hover:underline">
                        ویرایش
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <p className="font-medium">مدیر اجرایی (Manager)</p>
                        <p className="text-sm text-muted-foreground">
                          دسترسی به بخش‌های فروش، مشتریان و گزارش‌ها
                        </p>
                      </div>
                      <button className="text-primary hover:underline">
                        ویرایش
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <p className="font-medium">کارمند (Staff)</p>
                        <p className="text-sm text-muted-foreground">
                          دسترسی محدود به بخش فروش
                        </p>
                      </div>
                      <button className="text-primary hover:underline">
                        ویرایش
                      </button>
                    </div>
                  </div>
                </div>

                <Button type="button" className="mt-4">
                  {t("settings.saveChanges")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.billingSettings")}</CardTitle>
              <CardDescription>
                {t("settings.billingSettingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">اطلاعات پرداخت</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">
                        نام صاحب حساب
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        defaultValue="شرکت آجیرو"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">
                        شماره شبا
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        defaultValue="IR123456789012345678901234"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium">اشتراک فعلی</label>
                  <div className="p-4 border rounded-md bg-primary/5">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">اشتراک حرفه‌ای</p>
                        <p className="text-sm text-muted-foreground">
                          تاریخ انقضا: ۱۴۰۳/۰۶/۳۱
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        فعال
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm">ویژگی‌های اشتراک:</p>
                      <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                        <li>پشتیبانی از تمام ماژول‌ها</li>
                        <li>گزارش‌های پیشرفته</li>
                        <li>پشتیبانی ۲۴/۷</li>
                        <li>تعداد نامحدود محصول</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium">ارتقا اشتراک</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-md hover:border-primary cursor-pointer">
                      <p className="font-medium">پایه</p>
                      <p className="text-2xl font-bold mt-2">
                        ۱۰۰,۰۰۰{" "}
                        <span className="text-sm font-normal">تومان / ماه</span>
                      </p>
                      <ul className="text-sm mt-4 space-y-1">
                        <li>۱۰۰ محصول</li>
                        <li>گزارش‌های پایه</li>
                        <li>پشتیبانی ایمیلی</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-md hover:border-primary cursor-pointer relative">
                      <div className="absolute top-0 right-0 left-0 bg-primary text-primary-foreground text-center text-xs py-1">
                        محبوب‌ترین
                      </div>
                      <p className="font-medium mt-6">حرفه‌ای</p>
                      <p className="text-2xl font-bold mt-2">
                        ۲۵۰,۰۰۰{" "}
                        <span className="text-sm font-normal">تومان / ماه</span>
                      </p>
                      <ul className="text-sm mt-4 space-y-1">
                        <li>محصولات نامحدود</li>
                        <li>گزارش‌های پیشرفته</li>
                        <li>پشتیبانی ۲۴/۷</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-md hover:border-primary cursor-pointer">
                      <p className="font-medium">سازمانی</p>
                      <p className="text-2xl font-bold mt-2">
                        ۵۰۰,۰۰۰{" "}
                        <span className="text-sm font-normal">تومان / ماه</span>
                      </p>
                      <ul className="text-sm mt-4 space-y-1">
                        <li>تمام ویژگی‌های حرفه‌ای</li>
                        <li>API اختصاصی</li>
                        <li>مدیر اختصاصی حساب</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button type="button" className="mt-4">
                  {t("settings.saveChanges")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Modal */}
      <Dialog open={showAddUserModal} onOpenChange={setShowAddUserModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>افزودن کاربر به فروشگاه</DialogTitle>
            <DialogDescription>
              ایمیل کاربر و نقش او را وارد کنید. اگر کاربر در سیستم وجود نداشته باشد، یک دعوتنامه برای او ارسال خواهد شد.
            </DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                ایمیل
              </Label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                نقش
              </Label>
              <select 
                id="role"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="manager">مدیر</option>
                <option value="cashier">صندوقدار</option>
                <option value="inventory">انباردار</option>
                <option value="staff">کارمند</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setError(null);
                setShowAddUserModal(false);
              }}
            >
              انصراف
            </Button>
            <Button onClick={handleAddUser} disabled={isLoading}>
              {isLoading ? 'در حال افزودن...' : 'افزودن'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
