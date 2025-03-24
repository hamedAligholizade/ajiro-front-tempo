import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { t } from "@/lib/i18n";
import { User, Store, Package, Bell, Shield, CreditCard } from "lucide-react";

const Settings = () => {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("common.settings")}</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
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
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                {t("settings.saveChanges")}
              </button>
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
                    defaultValue="آجیرو"
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
              <div className="mt-4">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                  {t("settings.saveChanges")}
                </button>
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
              <p className="text-muted-foreground">
                {t("settings.comingSoon")}
              </p>
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
              <p className="text-muted-foreground">
                {t("settings.comingSoon")}
              </p>
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
              <p className="text-muted-foreground">
                {t("settings.comingSoon")}
              </p>
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
              <p className="text-muted-foreground">
                {t("settings.comingSoon")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
