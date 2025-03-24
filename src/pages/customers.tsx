import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { t } from "@/lib/i18n";
import { Users, Search, Plus, UserPlus, Download, Filter } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastPurchase: string;
  totalSpent: number;
  purchaseCount: number;
  segment: RFMSegment;
}

type RFMSegment =
  | "champions"
  | "loyalCustomers"
  | "potentialLoyalists"
  | "recentCustomers"
  | "promising"
  | "needsAttention"
  | "atRisk"
  | "cantLoseThem"
  | "hibernating"
  | "lost";

const Customers = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample customer data with RFM segments
  const customers: Customer[] = [
    {
      id: "1",
      name: "علی محمدی",
      phone: "+98 912 345 6789",
      email: "ali@example.com",
      lastPurchase: "2023-09-10",
      totalSpent: 1250000,
      purchaseCount: 24,
      segment: "champions",
    },
    {
      id: "2",
      name: "سارا احمدی",
      phone: "+98 912 987 6543",
      email: "sara@example.com",
      lastPurchase: "2023-09-12",
      totalSpent: 2340000,
      purchaseCount: 35,
      segment: "loyalCustomers",
    },
    {
      id: "3",
      name: "محمد رضایی",
      phone: "+98 912 456 7890",
      email: "mohammad@example.com",
      lastPurchase: "2023-03-10",
      totalSpent: 450000,
      purchaseCount: 8,
      segment: "needsAttention",
    },
    {
      id: "4",
      name: "الهام کریمی",
      phone: "+98 912 789 0123",
      email: "elham@example.com",
      lastPurchase: "2023-09-11",
      totalSpent: 3750000,
      purchaseCount: 42,
      segment: "champions",
    },
    {
      id: "5",
      name: "داوود حسینی",
      phone: "+98 912 234 5678",
      email: "davood@example.com",
      lastPurchase: "2022-05-18",
      totalSpent: 980000,
      purchaseCount: 15,
      segment: "atRisk",
    },
    {
      id: "6",
      name: "مریم نوری",
      phone: "+98 912 345 6780",
      email: "maryam@example.com",
      lastPurchase: "2023-09-05",
      totalSpent: 1650000,
      purchaseCount: 28,
      segment: "loyalCustomers",
    },
    {
      id: "7",
      name: "حسین مرادی",
      phone: "+98 912 678 9012",
      email: "hossein@example.com",
      lastPurchase: "2023-08-20",
      totalSpent: 750000,
      purchaseCount: 12,
      segment: "potentialLoyalists",
    },
    {
      id: "8",
      name: "زهرا صادقی",
      phone: "+98 912 901 2345",
      email: "zahra@example.com",
      lastPurchase: "2023-09-01",
      totalSpent: 320000,
      purchaseCount: 5,
      segment: "recentCustomers",
    },
    {
      id: "9",
      name: "رضا جعفری",
      phone: "+98 912 123 4567",
      email: "reza@example.com",
      lastPurchase: "2022-10-15",
      totalSpent: 180000,
      purchaseCount: 3,
      segment: "hibernating",
    },
    {
      id: "10",
      name: "فاطمه حیدری",
      phone: "+98 912 890 1234",
      email: "fateme@example.com",
      lastPurchase: "2023-09-08",
      totalSpent: 2100000,
      purchaseCount: 31,
      segment: "loyalCustomers",
    },
  ];

  const getSegmentColor = (segment: RFMSegment) => {
    switch (segment) {
      case "champions":
        return "bg-green-100 text-green-800";
      case "loyalCustomers":
        return "bg-blue-100 text-blue-800";
      case "potentialLoyalists":
        return "bg-indigo-100 text-indigo-800";
      case "recentCustomers":
        return "bg-purple-100 text-purple-800";
      case "promising":
        return "bg-pink-100 text-pink-800";
      case "needsAttention":
        return "bg-yellow-100 text-yellow-800";
      case "atRisk":
        return "bg-orange-100 text-orange-800";
      case "cantLoseThem":
        return "bg-red-100 text-red-800";
      case "hibernating":
        return "bg-gray-100 text-gray-800";
      case "lost":
        return "bg-gray-100 text-gray-500";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSegmentName = (segment: RFMSegment) => {
    return t(`customers.${segment}`);
  };

  const filteredCustomers = searchTerm
    ? customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm),
      )
    : customers;

  const segmentedCustomers =
    activeTab === "all"
      ? filteredCustomers
      : filteredCustomers.filter((customer) => customer.segment === activeTab);

  const segments: RFMSegment[] = [
    "champions",
    "loyalCustomers",
    "potentialLoyalists",
    "recentCustomers",
    "promising",
    "needsAttention",
    "atRisk",
    "cantLoseThem",
    "hibernating",
    "lost",
  ];

  const segmentCounts = segments.reduce(
    (acc, segment) => {
      acc[segment] = customers.filter((c) => c.segment === segment).length;
      return acc;
    },
    {} as Record<RFMSegment, number>,
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{t("customers.title")}</h1>
          <p className="text-muted-foreground">{t("customers.subtitle")}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {t("customers.champions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {segmentCounts.champions || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                RFM: 555, 554, 544, 545, 454
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {t("customers.loyalCustomers")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {segmentCounts.loyalCustomers || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                RFM: 543, 444, 435, 355
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {t("customers.atRisk")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {segmentCounts.atRisk || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                RFM: 252, 253, 352, 353
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {t("customers.lost")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {segmentCounts.lost || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                RFM: 111, 112, 121, 122, 123, 132, 211
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold">
            {t("customers.rfmSegmentation")}
          </h2>
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("customers.searchCustomers")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={() => alert("Adding new customer")}>
              <UserPlus className="mr-2 h-4 w-4" /> {t("customers.addCustomer")}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            <TabsTrigger value="all" className="flex items-center">
              <Users className="mr-2 h-4 w-4" /> {t("common.customers")}
            </TabsTrigger>
            {segments.map((segment) => (
              <TabsTrigger
                key={segment}
                value={segment}
                className="flex items-center"
              >
                {getSegmentName(segment)} ({segmentCounts[segment] || 0})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>
                  {activeTab === "all"
                    ? t("common.customers")
                    : getSegmentName(activeTab as RFMSegment)}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" /> {t("reports.export")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-right">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">{t("common.customers")}</th>
                        <th className="px-4 py-3">Contact</th>
                        <th className="px-4 py-3">Last Purchase</th>
                        <th className="px-4 py-3">Total Spent</th>
                        <th className="px-4 py-3">Purchases</th>
                        <th className="px-4 py-3">Segment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {segmentedCustomers.map((customer) => (
                        <tr key={customer.id} className="border-b">
                          <td className="px-4 py-3">{customer.id}</td>
                          <td className="px-4 py-3 font-medium">
                            {customer.name}
                          </td>
                          <td className="px-4 py-3">
                            <div>{customer.phone}</div>
                            <div className="text-xs text-muted-foreground">
                              {customer.email}
                            </div>
                          </td>
                          <td className="px-4 py-3">{customer.lastPurchase}</td>
                          <td className="px-4 py-3">
                            {customer.totalSpent.toLocaleString()} تومان
                          </td>
                          <td className="px-4 py-3">
                            {customer.purchaseCount}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSegmentColor(customer.segment)}`}
                            >
                              {getSegmentName(customer.segment)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Customers;
