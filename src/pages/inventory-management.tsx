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
  AlertTriangle,
  Filter,
  BarChart2,
  Download,
  ShoppingBag,
} from "lucide-react";
import { t } from "@/lib/i18n";

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
  status: "in-stock" | "low-stock" | "out-of-stock";
}

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState("all-products");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sample product data
  const products: Product[] = [
    {
      id: "1",
      name: "Premium Coffee Beans",
      sku: "COF-001",
      category: "Beverages",
      price: 24.99,
      cost: 15.50,
      stockLevel: 48,
      reorderPoint: 20,
      supplier: "Global Coffee Imports",
      location: "Shelf A1",
      lastRestocked: "2023-09-15",
      status: "in-stock",
    },
    {
      id: "2",
      name: "Ceramic Mug - White",
      sku: "MUG-101",
      category: "Merchandise",
      price: 12.99,
      cost: 5.25,
      stockLevel: 35,
      reorderPoint: 15,
      supplier: "HomeStyle Products",
      location: "Shelf B3",
      lastRestocked: "2023-09-12",
      status: "in-stock",
    },
    {
      id: "3",
      name: "Espresso Machine Filter",
      sku: "FIL-202",
      category: "Equipment",
      price: 8.50,
      cost: 3.15,
      stockLevel: 12,
      reorderPoint: 15,
      supplier: "Barista Supplies Co.",
      location: "Drawer C2",
      lastRestocked: "2023-09-05",
      status: "low-stock",
    },
    {
      id: "4",
      name: "Vanilla Syrup",
      sku: "SYR-301",
      category: "Beverages",
      price: 6.99,
      cost: 2.85,
      stockLevel: 0,
      reorderPoint: 10,
      supplier: "Flavor Essentials",
      location: "Shelf D4",
      lastRestocked: "2023-08-28",
      status: "out-of-stock",
    },
    {
      id: "5",
      name: "Coffee Grinder - Professional",
      sku: "EQP-501",
      category: "Equipment",
      price: 129.99,
      cost: 78.50,
      stockLevel: 5,
      reorderPoint: 3,
      supplier: "Barista Supplies Co.",
      location: "Storage E1",
      lastRestocked: "2023-09-10",
      status: "in-stock",
    },
  ];

  const handleAddProduct = () => {
    alert("Opening product creation form...");
  };

  const handleEditProduct = (product: Product) => {
    alert(`Editing product: ${product.name}`);
  };

  const handleDeleteProduct = (product: Product) => {
    alert(`Deleting product: ${product.name}`);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab("view-product");
  };

  const handleAdjustStock = (product: Product, amount: number) => {
    alert(`Adjusting stock for ${product.name} by ${amount}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStockStatusBadge = (status: string) => {
    const statusClasses = {
      "in-stock": "bg-green-100 text-green-800",
      "low-stock": "bg-yellow-100 text-yellow-800",
      "out-of-stock": "bg-red-100 text-red-800",
    };
    
    const statusText = {
      "in-stock": "In Stock",
      "low-stock": "Low Stock",
      "out-of-stock": "Out of Stock",
    };
    
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusClasses[status as keyof typeof statusClasses]
        }`}
      >
        {statusText[status as keyof typeof statusText]}
      </span>
    );
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
            <TabsTrigger value="all-products" className="flex items-center">
              <Package className="mr-2 h-4 w-4" /> All Products
            </TabsTrigger>
            <TabsTrigger value="low-stock" className="flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" /> Low Stock
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4" /> Analytics
            </TabsTrigger>
          </TabsList>

          {/* All Products Tab */}
          <TabsContent value="all-products" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-10 w-[250px]"
                    placeholder="Search products..."
                  />
                </div>
                <Button variant="outline" className="ml-2">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </div>
              <Button onClick={handleAddProduct}>
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-lg">
                            {product.name}
                          </h3>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            SKU: {product.sku}
                          </span>
          </div>
                        <p className="text-sm text-muted-foreground">
                          {product.category}
                        </p>
          </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewProduct(product)}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
          </div>
        </div>
        
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Price
                        </div>
                        <div className="font-medium">
                          {formatCurrency(product.price)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Cost
                        </div>
                        <div className="font-medium">
                          {formatCurrency(product.cost)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Stock
                        </div>
                        <div className="font-medium flex items-center">
                          {product.stockLevel} 
                          <div className="ml-2">
                            {getStockStatusBadge(product.status)}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Supplier
                        </div>
                        <div className="font-medium">{product.supplier}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Last Restocked
                        </div>
                        <div className="font-medium">
                          {product.lastRestocked}
                        </div>
                      </div>
      </div>
      
                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAdjustStock(product, 1)}
                      >
                        Increase Stock +1
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAdjustStock(product, -1)}
                        disabled={product.stockLevel <= 0}
                      >
                        Decrease Stock -1
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Low Stock Tab */}
          <TabsContent value="low-stock" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alert</CardTitle>
                <CardDescription>
                  Products that need to be restocked soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products
                    .filter(
                      (p) =>
                        p.stockLevel <= p.reorderPoint && p.stockLevel > 0
                    )
                    .map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {product.sku} • {product.category}
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">
                            Current Stock
                          </div>
                          <div className="font-medium text-amber-600">
                            {product.stockLevel}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">
                            Reorder Point
                          </div>
                          <div className="font-medium">{product.reorderPoint}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">
                            Supplier
                          </div>
                          <div className="font-medium">{product.supplier}</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Order More
                        </Button>
                      </div>
                    ))}

                  {products
                    .filter((p) => p.stockLevel === 0)
                    .map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {product.sku} • {product.category}
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">
                            Current Stock
                          </div>
                          <div className="font-medium text-red-600">
                            {product.stockLevel}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">
                            Reorder Point
                          </div>
                          <div className="font-medium">{product.reorderPoint}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">
                            Supplier
                          </div>
                          <div className="font-medium">{product.supplier}</div>
                        </div>
                        <Button size="sm">Order Now</Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Value</CardTitle>
                  <CardDescription>
                    Total value of current inventory
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">
                    {formatCurrency(
                      products.reduce(
                        (total, p) => total + p.price * p.stockLevel,
                        0
                      )
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Cost: {formatCurrency(
                      products.reduce(
                        (total, p) => total + p.cost * p.stockLevel,
                        0
                      )
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Potential profit: {formatCurrency(
                      products.reduce(
                        (total, p) => total + (p.price - p.cost) * p.stockLevel,
                        0
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>
                    Overview of current stock levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>In Stock</span>
                        <span>
                          {products.filter(p => p.status === "in-stock").length} items
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{
                            width: `${(products.filter(p => p.status === "in-stock").length / products.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Low Stock</span>
                        <span>
                          {products.filter(p => p.status === "low-stock").length} items
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-yellow-500 h-2.5 rounded-full"
                          style={{
                            width: `${(products.filter(p => p.status === "low-stock").length / products.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Out of Stock</span>
                        <span>
                          {products.filter(p => p.status === "out-of-stock").length} items
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-red-600 h-2.5 rounded-full"
                          style={{
                            width: `${(products.filter(p => p.status === "out-of-stock").length / products.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>
                    Products by category and stock status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Array.from(
                      new Set(products.map((p) => p.category))
                    ).map((category) => {
                      const categoryProducts = products.filter(
                        (p) => p.category === category
                      );
                      const totalItems = categoryProducts.length;
                      const inStock = categoryProducts.filter(
                        (p) => p.status === "in-stock"
                      ).length;
                      const lowStock = categoryProducts.filter(
                        (p) => p.status === "low-stock"
                      ).length;
                      const outOfStock = categoryProducts.filter(
                        (p) => p.status === "out-of-stock"
                      ).length;

                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{category}</h3>
                            <span className="text-sm text-muted-foreground">
                              {totalItems} items
                            </span>
                          </div>
                          <div className="flex h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-green-500"
                              style={{
                                width: `${(inStock / totalItems) * 100}%`,
                              }}
                            ></div>
                            <div
                              className="bg-yellow-500"
                              style={{
                                width: `${(lowStock / totalItems) * 100}%`,
                              }}
                            ></div>
                            <div
                              className="bg-red-500"
                              style={{
                                width: `${(outOfStock / totalItems) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex text-xs gap-4">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                              <span>In Stock ({inStock})</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                              <span>Low Stock ({lowStock})</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                              <span>Out of Stock ({outOfStock})</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* View Product Tab */}
          {selectedProduct && (
            <TabsContent value="view-product" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveTab("all-products")}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {selectedProduct.name}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEditProduct(selectedProduct)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAdjustStock(selectedProduct, 0)}
                  >
                    <Package className="mr-2 h-4 w-4" /> Adjust Stock
            </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Information about this product
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Product Name
                          </div>
                          <div className="font-medium">
                            {selectedProduct.name}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            SKU
                          </div>
                          <div className="font-medium">{selectedProduct.sku}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Category
                          </div>
                          <div className="font-medium">
                            {selectedProduct.category}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Price
                          </div>
                          <div className="font-medium">
                            {formatCurrency(selectedProduct.price)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Cost
                          </div>
                          <div className="font-medium">
                            {formatCurrency(selectedProduct.cost)}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Current Stock
                          </div>
                          <div className="font-medium flex items-center">
                            {selectedProduct.stockLevel}
                            <div className="ml-2">
                              {getStockStatusBadge(selectedProduct.status)}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Reorder Point
                          </div>
                          <div className="font-medium">
                            {selectedProduct.reorderPoint}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Supplier
                          </div>
                          <div className="font-medium">
                            {selectedProduct.supplier}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Storage Location
                          </div>
                          <div className="font-medium">
                            {selectedProduct.location}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Last Restocked
                          </div>
                          <div className="font-medium">
                            {selectedProduct.lastRestocked}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stock History</CardTitle>
                    <CardDescription>
                      Recent stock adjustments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b pb-2">
                        <div className="text-sm text-muted-foreground">
                          2023-09-15
                        </div>
                        <div className="flex justify-between">
                          <span>Restocked</span>
                          <span className="text-green-600">+25</span>
                        </div>
                      </div>
                      <div className="border-b pb-2">
                        <div className="text-sm text-muted-foreground">
                          2023-09-12
                        </div>
                        <div className="flex justify-between">
                          <span>Sold</span>
                          <span className="text-red-600">-3</span>
                        </div>
                      </div>
                      <div className="border-b pb-2">
                        <div className="text-sm text-muted-foreground">
                          2023-09-10
                        </div>
                        <div className="flex justify-between">
                          <span>Sold</span>
                          <span className="text-red-600">-4</span>
                        </div>
                      </div>
                      <div className="border-b pb-2">
                        <div className="text-sm text-muted-foreground">
                          2023-09-08
                        </div>
                        <div className="flex justify-between">
                          <span>Adjusted</span>
                          <span className="text-red-600">-1</span>
                        </div>
                      </div>
                      <div className="border-b pb-2">
                        <div className="text-sm text-muted-foreground">
                          2023-09-01
                        </div>
                        <div className="flex justify-between">
                          <span>Restocked</span>
                          <span className="text-green-600">+30</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export default InventoryManagement; 