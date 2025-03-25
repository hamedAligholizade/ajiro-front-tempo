import React, { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  BarChart2,
  Minus,
} from "lucide-react";
import { t } from "@/lib/i18n";
import AddProductModal from "@/components/inventory/AddProductModal";
import AdjustStockModal from "@/components/inventory/AdjustStockModal";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stockLevel: number;
  reorderPoint: number;
  supplier: string;
  location: string;
  lastRestocked: string;
  description?: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAdjustStockModal, setShowAdjustStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sample product data
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "قهوه اسپرسو",
      sku: "COF001",
      category: "Beverages",
      price: 45000,
      cost: 25000,
      stockLevel: 120,
      reorderPoint: 20,
      supplier: "تامین کننده قهوه ایران",
      location: "قفسه A1",
      lastRestocked: "2023-09-01",
      description: "قهوه اسپرسو با کیفیت عالی",
      status: "in-stock",
    },
    {
      id: "2",
      name: "چای سبز",
      sku: "TEA002",
      category: "Beverages",
      price: 35000,
      cost: 18000,
      stockLevel: 85,
      reorderPoint: 15,
      supplier: "چای مازندران",
      location: "قفسه A2",
      lastRestocked: "2023-09-05",
      status: "in-stock",
    },
    {
      id: "3",
      name: "ساندویچ مرغ",
      sku: "FOOD001",
      category: "Food",
      price: 85000,
      cost: 45000,
      stockLevel: 12,
      reorderPoint: 10,
      supplier: "آشپزخانه مرکزی",
      location: "یخچال B1",
      lastRestocked: "2023-09-10",
      status: "low-stock",
    },
    {
      id: "4",
      name: "سالاد سزار",
      sku: "FOOD002",
      category: "Food",
      price: 75000,
      cost: 40000,
      stockLevel: 8,
      reorderPoint: 5,
      supplier: "آشپزخانه مرکزی",
      location: "یخچال B2",
      lastRestocked: "2023-09-10",
      status: "low-stock",
    },
    {
      id: "5",
      name: "دفترچه یادداشت",
      sku: "STAT001",
      category: "Stationery",
      price: 25000,
      cost: 12000,
      stockLevel: 45,
      reorderPoint: 10,
      supplier: "لوازم التحریر تهران",
      location: "قفسه C1",
      lastRestocked: "2023-08-15",
      status: "in-stock",
    },
    {
      id: "6",
      name: "خودکار",
      sku: "STAT002",
      category: "Stationery",
      price: 8000,
      cost: 3000,
      stockLevel: 200,
      reorderPoint: 50,
      supplier: "لوازم التحریر تهران",
      location: "قفسه C2",
      lastRestocked: "2023-08-15",
      status: "in-stock",
    },
    {
      id: "7",
      name: "بطری آب",
      sku: "BEV003",
      category: "Beverages",
      price: 10000,
      cost: 5000,
      stockLevel: 75,
      reorderPoint: 20,
      supplier: "آب معدنی دماوند",
      location: "قفسه A3",
      lastRestocked: "2023-09-08",
      status: "in-stock",
    },
    {
      id: "8",
      name: "کیک شکلاتی",
      sku: "FOOD003",
      category: "Food",
      price: 30000,
      cost: 15000,
      stockLevel: 0,
      reorderPoint: 10,
      supplier: "شیرینی سرای تهران",
      location: "یخچال B3",
      lastRestocked: "2023-09-01",
      status: "out-of-stock",
    },
  ]);

  // Get unique categories from products
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter(
      (product) =>
        categoryFilter === "all" || product.category === categoryFilter,
    )
    .sort((a, b) => {
      const aValue =
        sortBy === "name"
          ? a.name
          : sortBy === "price"
            ? a.price
            : sortBy === "stock"
              ? a.stockLevel
              : a.name;
      const bValue =
        sortBy === "name"
          ? b.name
          : sortBy === "price"
            ? b.price
            : sortBy === "stock"
              ? b.stockLevel
              : b.name;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const handleAdjustStock = (
    productId: string,
    newStockLevel: number,
    reason: string,
  ) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const status =
            newStockLevel <= 0
              ? "out-of-stock"
              : newStockLevel <= product.reorderPoint
                ? "low-stock"
                : "in-stock";
          return { ...product, stockLevel: newStockLevel, status };
        }
        return product;
      }),
    );
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("آیا از حذف این محصول اطمینان دارید؟")) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  const handleQuickStockAdjust = (productId: string, increment: boolean) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const newStockLevel = increment
            ? product.stockLevel + 1
            : Math.max(0, product.stockLevel - 1);
          const status =
            newStockLevel <= 0
              ? "out-of-stock"
              : newStockLevel <= product.reorderPoint
                ? "low-stock"
                : "in-stock";
          return { ...product, stockLevel: newStockLevel, status };
        }
        return product;
      }),
    );
  };

  const getStatusBadge = (status: Product["status"]) => {
    const statusClasses = {
      "in-stock": "bg-green-100 text-green-800",
      "low-stock": "bg-amber-100 text-amber-800",
      "out-of-stock": "bg-red-100 text-red-800",
    };

    const statusIcons = {
      "in-stock": <CheckCircle className="h-3 w-3 mr-1" />,
      "low-stock": <AlertTriangle className="h-3 w-3 mr-1" />,
      "out-of-stock": <XCircle className="h-3 w-3 mr-1" />,
    };

    const statusText = {
      "in-stock": "موجود",
      "low-stock": "موجودی کم",
      "out-of-stock": "ناموجود",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusClasses[status]
        }`}
      >
        {statusIcons[status]}
        {statusText[status]}
      </span>
    );
  };

  const getInventoryStats = () => {
    return {
      totalProducts: products.length,
      totalItems: products.reduce(
        (sum, product) => sum + product.stockLevel,
        0,
      ),
      lowStock: products.filter((p) => p.status === "low-stock").length,
      outOfStock: products.filter((p) => p.status === "out-of-stock").length,
      inventoryValue: products.reduce(
        (sum, product) => sum + product.price * product.stockLevel,
        0,
      ),
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR", {
      style: "currency",
      currency: "IRR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("IRR", "تومان");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{t("inventory.title")}</h1>
          <p className="text-muted-foreground">{t("inventory.subtitle")}</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            <TabsTrigger value="products" className="flex items-center">
              <Package className="mr-2 h-4 w-4" /> {t("inventory.products")}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4" /> {t("inventory.analytics")}
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("inventory.searchProducts")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder={t("inventory.allCategories")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all"
                          ? t("inventory.allCategories")
                          : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1">
                  <span className="text-sm">{t("inventory.sortBy")}:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">نام</SelectItem>
                      <SelectItem value="price">قیمت</SelectItem>
                      <SelectItem value="stock">موجودی</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button onClick={() => setShowAddProductModal(true)}>
                <Plus className="mr-2 h-4 w-4" /> {t("inventory.addProduct")}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{t("inventory.allProducts")}</CardTitle>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">
                        {filteredProducts.length}{" "}
                        {filteredProducts.length === 1 ? "محصول" : "محصول"}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-right">
                      <thead className="text-xs uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-3">محصول</th>
                          <th className="px-4 py-3">دسته‌بندی</th>
                          <th className="px-4 py-3">قیمت</th>
                          <th className="px-4 py-3">موجودی</th>
                          <th className="px-4 py-3">وضعیت</th>
                          <th className="px-4 py-3">عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b">
                            <td className="px-4 py-3">
                              <div className="font-medium">{product.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {product.sku}
                              </div>
                            </td>
                            <td className="px-4 py-3">{product.category}</td>
                            <td className="px-4 py-3">
                              {formatCurrency(product.price)}
                            </td>
                            <td className="px-4 py-3">{product.stockLevel}</td>
                            <td className="px-4 py-3">
                              {getStatusBadge(product.status)}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleQuickStockAdjust(product.id, true)
                                  }
                                  title={t("inventory.increaseStock")}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleQuickStockAdjust(product.id, false)
                                  }
                                  title={t("inventory.decreaseStock")}
                                  disabled={product.stockLevel <= 0}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedProduct(product);
                                    setShowAdjustStockModal(true);
                                  }}
                                  title={t("inventory.adjustStock")}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleDeleteProduct(product.id)
                                  }
                                  className="text-red-500 hover:text-red-700"
                                  title="حذف محصول"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("inventory.totalProducts")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {getInventoryStats().totalProducts}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getInventoryStats().totalItems} واحد در انبار
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("inventory.lowStock")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-500">
                    {getInventoryStats().lowStock}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    نیاز به سفارش مجدد
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("inventory.outOfStock")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">
                    {getInventoryStats().outOfStock}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    محصولات ناموجود
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("inventory.inventoryValue")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(getInventoryStats().inventoryValue)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ارزش کل موجودی
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("inventory.inventoryStatus")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">
                          {t("inventory.inStock")}
                        </span>
                        <span className="text-sm font-medium">
                          {
                            products.filter((p) => p.status === "in-stock")
                              .length
                          }
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: `${(products.filter((p) => p.status === "in-stock").length / products.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">
                          {t("inventory.lowStock")}
                        </span>
                        <span className="text-sm font-medium">
                          {
                            products.filter((p) => p.status === "low-stock")
                              .length
                          }
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{
                            width: `${(products.filter((p) => p.status === "low-stock").length / products.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">
                          {t("inventory.outOfStock")}
                        </span>
                        <span className="text-sm font-medium">
                          {
                            products.filter((p) => p.status === "out-of-stock")
                              .length
                          }
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{
                            width: `${(products.filter((p) => p.status === "out-of-stock").length / products.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("inventory.categoryBreakdown")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories
                      .filter((category) => category !== "all")
                      .map((category) => {
                        const count = products.filter(
                          (p) => p.category === category,
                        ).length;
                        const percentage = (count / products.length) * 100;
                        return (
                          <div key={category}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{category}</span>
                              <span className="text-sm font-medium">
                                {count} ({percentage.toFixed(0)}%)
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("inventory.lowStockAlert")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {products
                      .filter(
                        (p) =>
                          p.status === "low-stock" ||
                          p.status === "out-of-stock",
                      )
                      .map((product) => (
                        <div
                          key={product.id}
                          className="flex justify-between items-center p-2 border rounded-md"
                        >
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {product.stockLevel} در انبار (حداقل:{" "}
                              {product.reorderPoint})
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(product.status)}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowAdjustStockModal(true);
                              }}
                            >
                              {t("inventory.orderMore")}
                            </Button>
                          </div>
                        </div>
                      ))}
                    {products.filter(
                      (p) =>
                        p.status === "low-stock" || p.status === "out-of-stock",
                    ).length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        همه محصولات موجودی کافی دارند
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("inventory.stockHistory")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    تاریخچه موجودی به زودی اضافه خواهد شد
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        open={showAddProductModal}
        onOpenChange={setShowAddProductModal}
        onAddProduct={handleAddProduct}
      />

      {/* Adjust Stock Modal */}
      <AdjustStockModal
        open={showAdjustStockModal}
        onOpenChange={setShowAdjustStockModal}
        product={selectedProduct}
        onAdjustStock={handleAdjustStock}
      />
    </div>
  );
};

export default InventoryManagement;
