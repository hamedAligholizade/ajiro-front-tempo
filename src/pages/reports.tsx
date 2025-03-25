import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  LineChart,
  PieChart,
  Download,
  Calendar,
} from "lucide-react";
import { t } from "@/lib/i18n";

const Reports = () => {
  const [timeRange, setTimeRange] = useState("week");

  // Sample data for charts
  const salesData = {
    daily: [
      { date: "Mon", amount: 1200 },
      { date: "Tue", amount: 1800 },
      { date: "Wed", amount: 1400 },
      { date: "Thu", amount: 2000 },
      { date: "Fri", amount: 2400 },
      { date: "Sat", amount: 1800 },
      { date: "Sun", amount: 1200 },
    ],
    weekly: [
      { date: "Week 1", amount: 8800 },
      { date: "Week 2", amount: 9200 },
      { date: "Week 3", amount: 10400 },
      { date: "Week 4", amount: 9600 },
    ],
    monthly: [
      { date: "Jan", amount: 38000 },
      { date: "Feb", amount: 42000 },
      { date: "Mar", amount: 45000 },
      { date: "Apr", amount: 41000 },
      { date: "May", amount: 44000 },
      { date: "Jun", amount: 48000 },
    ],
  };

  const inventoryData = [
    { name: "Coffee", stock: 120, reorderLevel: 20 },
    { name: "Tea", stock: 85, reorderLevel: 15 },
    { name: "Sandwich", stock: 25, reorderLevel: 10 },
    { name: "Salad", stock: 18, reorderLevel: 5 },
    { name: "Notebook", stock: 45, reorderLevel: 10 },
    { name: "Pen", stock: 200, reorderLevel: 50 },
    { name: "Water Bottle", stock: 75, reorderLevel: 20 },
    { name: "Muffin", stock: 8, reorderLevel: 10 },
  ];

  const customerData = {
    newCustomers: 24,
    returningCustomers: 68,
    totalCustomers: 92,
    averagePurchase: 42.5,
    topProducts: [
      { name: "Coffee", sales: 145 },
      { name: "Sandwich", sales: 87 },
      { name: "Tea", sales: 76 },
      { name: "Notebook", sales: 54 },
      { name: "Muffin", sales: 43 },
    ],
  };

  const handleExport = (reportType: string) => {
    alert(`Exporting ${reportType} report as CSV...`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{t("reports.title")}</h1>
          <p className="text-muted-foreground">{t("reports.subtitle")}</p>
        </header>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            <TabsTrigger value="sales" className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4" /> {t("reports.sales")}
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center">
              <LineChart className="mr-2 h-4 w-4" /> {t("reports.inventory")}
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center">
              <PieChart className="mr-2 h-4 w-4" /> {t("reports.customers")}
            </TabsTrigger>
          </TabsList>

          {/* Sales Report Tab */}
          <TabsContent value="sales" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("reports.totalSales")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,345</div>
                  <p className="text-xs text-muted-foreground">
                    +15% from previous period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("reports.transactions")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">432</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from previous period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("reports.averageSale")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$28.57</div>
                  <p className="text-xs text-muted-foreground">
                    +5% from previous period
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Sales Trend</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("sales")}
                >
                  <Download className="mr-2 h-4 w-4" /> {t("reports.export")}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-end justify-between gap-2">
                  {salesData.daily.map((item, index) => (
                    <div
                      key={index}
                      className="relative h-full flex flex-col justify-end items-center"
                    >
                      <div
                        className="w-12 bg-primary rounded-t-md"
                        style={{ height: `${(item.amount / 2400) * 100}%` }}
                      />
                      <span className="text-xs mt-2">{item.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerData.topProducts.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span>{product.name}</span>
                        <div className="flex items-center">
                          <span className="font-medium">
                            {product.sales} units
                          </span>
                          <div className="w-24 h-2 bg-gray-100 rounded-full ml-2">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width: `${(product.sales / customerData.topProducts[0].sales) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Sales by Time of Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full flex items-end justify-between gap-2">
                    {[
                      { time: "Morning", percentage: 35 },
                      { time: "Afternoon", percentage: 45 },
                      { time: "Evening", percentage: 20 },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="relative h-full flex flex-col justify-end items-center flex-1"
                      >
                        <div
                          className="w-full bg-primary/80 rounded-t-md"
                          style={{ height: `${item.percentage}%` }}
                        />
                        <span className="text-xs mt-2">{item.time}</span>
                        <span className="text-xs font-medium">
                          {item.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inventory Report Tab */}
          <TabsContent value="inventory" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">576</div>
                  <p className="text-xs text-muted-foreground">
                    8 different products
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Low Stock Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-500">2</div>
                  <p className="text-xs text-muted-foreground">
                    Below reorder level
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Out of Stock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">0</div>
                  <p className="text-xs text-muted-foreground">
                    All items in stock
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Inventory Status</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("inventory")}
                >
                  <Download className="mr-2 h-4 w-4" /> {t("reports.export")}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Current Stock</th>
                        <th className="px-4 py-3">Reorder Level</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryData.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-3 font-medium">{item.name}</td>
                          <td className="px-4 py-3">{item.stock}</td>
                          <td className="px-4 py-3">{item.reorderLevel}</td>
                          <td className="px-4 py-3">
                            {item.stock <= item.reorderLevel ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                Low Stock
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                In Stock
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Report Tab */}
          <TabsContent value="customers" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {customerData.totalCustomers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active this period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    New Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {customerData.newCustomers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(
                      (customerData.newCustomers /
                        customerData.totalCustomers) *
                        100,
                    )}
                    % of total
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Returning Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {customerData.returningCustomers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(
                      (customerData.returningCustomers /
                        customerData.totalCustomers) *
                        100,
                    )}
                    % of total
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Purchase
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${customerData.averagePurchase.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Per transaction
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Customer Segments</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport("customers")}
                  >
                    <Download className="mr-2 h-4 w-4" /> {t("reports.export")}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="relative h-40 w-40 rounded-full border-8 border-primary flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="absolute bg-primary/20 h-full"
                          style={{
                            width: "100%",
                            height: "100%",
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(Math.PI * 2 * (customerData.returningCustomers / customerData.totalCustomers))}% ${50 - 50 * Math.sin(Math.PI * 2 * (customerData.returningCustomers / customerData.totalCustomers))}%, 50% 50%)`,
                          }}
                        />
                        <div
                          className="absolute bg-primary/40 h-full"
                          style={{
                            width: "100%",
                            height: "100%",
                            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(Math.PI * 2 * (customerData.returningCustomers / customerData.totalCustomers))}% ${50 - 50 * Math.sin(Math.PI * 2 * (customerData.returningCustomers / customerData.totalCustomers))}%, 100% 50%, 50% 50%)`,
                          }}
                        />
                        <div
                          className="absolute bg-primary/60 h-full"
                          style={{
                            width: "100%",
                            height: "100%",
                            clipPath: `polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%, 50% 50%)`,
                          }}
                        />
                        <div
                          className="absolute bg-primary/80 h-full"
                          style={{
                            width: "100%",
                            height: "100%",
                            clipPath: `polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%, 50% 50%)`,
                          }}
                        />
                      </div>
                      <div className="z-10 text-center">
                        <span className="text-xs font-medium">Total</span>
                        <div className="text-lg font-bold">
                          {customerData.totalCustomers}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary/20 mr-2" />
                      <span className="text-sm">
                        New ({customerData.newCustomers})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary/40 mr-2" />
                      <span className="text-sm">
                        Returning ({customerData.returningCustomers})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary/60 mr-2" />
                      <span className="text-sm">Loyal (34)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary/80 mr-2" />
                      <span className="text-sm">VIP (12)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Customer Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Repeat Purchase Rate</span>
                        <span className="text-sm font-medium">74%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: "74%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">
                          Loyalty Program Enrollment
                        </span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: "68%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Feedback Response Rate</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: "42%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">SMS Campaign Open Rate</span>
                        <span className="text-sm font-medium">89%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: "89%" }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
