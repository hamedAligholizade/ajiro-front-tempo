import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Printer,
  Tag,
  Search,
  Percent,
  User,
  Receipt,
  Package,
} from "lucide-react";
import { t } from "@/lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock?: number;
  imageUrl?: string;
}

interface CartItem extends Product {
  quantity: number;
  discountPercent?: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  loyaltyPoints: number;
  loyaltyTier: "bronze" | "silver" | "gold";
}

interface Discount {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  code?: string;
  minPurchase?: number;
}

const SalesCounter = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [showLoyaltyDialog, setShowLoyaltyDialog] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "card" | "mobile"
  >("cash");

  // Sample product data
  const products: Product[] = [
    {
      id: "1",
      name: "Coffee",
      price: 3.5,
      category: "Beverages",
      stock: 50,
      imageUrl:
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&q=80",
    },
    {
      id: "2",
      name: "Tea",
      price: 2.5,
      category: "Beverages",
      stock: 45,
      imageUrl:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&q=80",
    },
    {
      id: "3",
      name: "Sandwich",
      price: 5.99,
      category: "Food",
      stock: 15,
      imageUrl:
        "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=300&q=80",
    },
    {
      id: "4",
      name: "Salad",
      price: 6.99,
      category: "Food",
      stock: 10,
      imageUrl:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
    },
    {
      id: "5",
      name: "Notebook",
      price: 4.99,
      category: "Stationery",
      stock: 30,
      imageUrl:
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&q=80",
    },
    {
      id: "6",
      name: "Pen",
      price: 1.99,
      category: "Stationery",
      stock: 100,
      imageUrl:
        "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&q=80",
    },
    {
      id: "7",
      name: "Water Bottle",
      price: 2.99,
      category: "Beverages",
      stock: 40,
      imageUrl:
        "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&q=80",
    },
    {
      id: "8",
      name: "Muffin",
      price: 3.99,
      category: "Food",
      stock: 25,
      imageUrl:
        "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&q=80",
    },
  ];

  // Sample discount data
  const discounts: Discount[] = [
    { id: "1", name: "10% Off", type: "percentage", value: 10, code: "SAVE10" },
    { id: "2", name: "5% Off", type: "percentage", value: 5, code: "SAVE5" },
    {
      id: "3",
      name: "$5 Off",
      type: "fixed",
      value: 5,
      code: "FIVE",
      minPurchase: 20,
    },
  ];

  // Sample customer data
  const customers: Customer[] = [
    {
      id: "1",
      name: "John Doe",
      phone: "555-1234",
      loyaltyPoints: 120,
      loyaltyTier: "silver",
    },
    {
      id: "2",
      name: "Jane Smith",
      phone: "555-5678",
      loyaltyPoints: 350,
      loyaltyTier: "gold",
    },
    {
      id: "3",
      name: "Bob Johnson",
      phone: "555-9012",
      loyaltyPoints: 50,
      loyaltyTier: "bronze",
    },
  ];

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : products;

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const itemDiscount = item.discountPercent
        ? (itemTotal * item.discountPercent) / 100
        : 0;
      return total + (itemTotal - itemDiscount);
    }, 0);
  };

  const calculateDiscount = () => {
    if (!appliedDiscount) return 0;

    const subtotal = calculateSubtotal();
    if (appliedDiscount.type === "percentage") {
      return subtotal * (appliedDiscount.value / 100);
    } else {
      return appliedDiscount.value;
    }
  };

  const calculateLoyaltyDiscount = () => {
    if (!selectedCustomer) return 0;

    // Apply loyalty discount based on tier
    const subtotal = calculateSubtotal();
    switch (selectedCustomer.loyaltyTier) {
      case "gold":
        return subtotal * 0.05; // 5% discount
      case "silver":
        return subtotal * 0.03; // 3% discount
      case "bronze":
        return subtotal * 0.01; // 1% discount
      default:
        return 0;
    }
  };

  const calculateTax = () => {
    const taxRate = 0.08; // 8% tax rate
    return (
      (calculateSubtotal() - calculateDiscount() - calculateLoyaltyDiscount()) *
      taxRate
    );
  };

  const calculateTotal = () => {
    return (
      calculateSubtotal() -
      calculateDiscount() -
      calculateLoyaltyDiscount() +
      calculateTax()
    );
  };

  const applyDiscountCode = () => {
    const discount = discounts.find((d) => d.code === discountCode);
    if (discount) {
      // Check minimum purchase requirement if applicable
      if (discount.minPurchase && calculateSubtotal() < discount.minPurchase) {
        alert(
          `This discount requires a minimum purchase of ${discount.minPurchase.toFixed(2)}`,
        );
        return;
      }
      setAppliedDiscount(discount);
      setDiscountCode("");
    } else {
      alert("Invalid discount code");
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
  };

  const applyItemDiscount = (itemId: string, discountPercent: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, discountPercent } : item,
      ),
    );
  };

  const updateInventory = () => {
    // In a real app, this would update the inventory in the database
    // Here we're just simulating the update
    console.log("Updating inventory...");
    cart.forEach((item) => {
      console.log(`Reducing stock for ${item.name} by ${item.quantity}`);
    });
  };

  const generateReceipt = () => {
    const receiptNumber = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const date = new Date().toLocaleString();

    const receipt = {
      receiptNumber,
      date,
      items: cart,
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      loyaltyDiscount: calculateLoyaltyDiscount(),
      tax: calculateTax(),
      total: calculateTotal(),
      paymentMethod,
      customer: selectedCustomer,
    };

    setReceiptData(receipt);
    setShowReceiptDialog(true);

    // In a real app, you would save this receipt to the database
    console.log("Receipt generated:", receipt);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Process payment
    console.log(
      `Processing ${paymentMethod} payment for ${calculateTotal().toFixed(2)}`,
    );

    // Update inventory
    updateInventory();

    // Generate receipt
    generateReceipt();

    // Update loyalty points if customer selected
    if (selectedCustomer) {
      const pointsEarned = Math.floor(calculateTotal());
      console.log(
        `${selectedCustomer.name} earned ${pointsEarned} loyalty points`,
      );
    }
  };

  const handlePrintReceipt = () => {
    if (receiptData) {
      // Create a printable version of the receipt
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .receipt { max-width: 300px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 20px; }
                .info { display: flex; justify-content: space-between; margin-bottom: 15px; }
                .items { border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 10px 0; margin-bottom: 15px; }
                .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
                .totals { margin-bottom: 15px; }
                .total-row { display: flex; justify-content: space-between; }
                .grand-total { font-weight: bold; font-size: 1.2em; margin-top: 5px; }
                .footer { text-align: center; font-size: 0.8em; margin-top: 30px; }
                @media print { body { padding: 0; } }
              </style>
            </head>
            <body>
              <div class="receipt">
                <div class="header">
                  <h2>Store Receipt</h2>
                  <p>Thank you for your purchase!</p>
                </div>
                
                <div class="info">
                  <div>
                    <p><strong>Receipt #:</strong> ${receiptData.receiptNumber}</p>
                    <p><strong>Date:</strong> ${receiptData.date}</p>
                  </div>
                  <div>
                    <p><strong>Payment:</strong> ${receiptData.paymentMethod}</p>
                    ${receiptData.customer ? `<p><strong>Customer:</strong> ${receiptData.customer.name}</p>` : ""}
                  </div>
                </div>
                
                <div class="items">
                  <h3>Items</h3>
                  ${receiptData.items
                    .map(
                      (item: CartItem) => `
                    <div class="item">
                      <span>${item.name} × ${item.quantity} ${item.discountPercent ? `(${item.discountPercent}% off)` : ""}</span>
                      <span>${(item.price * item.quantity - (item.discountPercent ? (item.price * item.quantity * item.discountPercent) / 100 : 0)).toFixed(2)}</span>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
                
                <div class="totals">
                  <div class="total-row">
                    <span>Subtotal:</span>
                    <span>${receiptData.subtotal.toFixed(2)}</span>
                  </div>
                  
                  ${
                    receiptData.discount > 0
                      ? `
                    <div class="total-row">
                      <span>Discount:</span>
                      <span>-${receiptData.discount.toFixed(2)}</span>
                    </div>
                  `
                      : ""
                  }
                  
                  ${
                    receiptData.loyaltyDiscount > 0
                      ? `
                    <div class="total-row">
                      <span>Loyalty Discount:</span>
                      <span>-${receiptData.loyaltyDiscount.toFixed(2)}</span>
                    </div>
                  `
                      : ""
                  }
                  
                  <div class="total-row">
                    <span>Tax:</span>
                    <span>${receiptData.tax.toFixed(2)}</span>
                  </div>
                  
                  <div class="total-row grand-total">
                    <span>Total:</span>
                    <span>${receiptData.total.toFixed(2)}</span>
                  </div>
                </div>
                
                ${
                  receiptData.customer
                    ? `
                  <div style="background-color: #f0f8ff; padding: 10px; border-radius: 5px;">
                    <p style="font-weight: bold; margin: 0 0 5px 0;">Loyalty Program</p>
                    <p style="margin: 0 0 5px 0;">Points earned: ${Math.floor(receiptData.total)}</p>
                    <p style="margin: 0;">New balance: ${receiptData.customer.loyaltyPoints + Math.floor(receiptData.total)} points</p>
                  </div>
                `
                    : ""
                }
                
                <div class="footer">
                  <p>Thank you for shopping with us!</p>
                  <p>Please keep this receipt for your records.</p>
                </div>
              </div>
              <script>
                window.onload = function() { window.print(); }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } else {
      // Generate a receipt first if none exists
      generateReceipt();
    }
  };

  const [customerSearchTerm, setCustomerSearchTerm] = useState("");

  const filteredCustomers = customerSearchTerm
    ? customers.filter(
        (customer) =>
          customer.name
            .toLowerCase()
            .includes(customerSearchTerm.toLowerCase()) ||
          customer.phone.includes(customerSearchTerm),
      )
    : customers;

  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowLoyaltyDialog(false);
    setCustomerSearchTerm("");
  };

  const registerNewCustomer = () => {
    // In a real app, this would open a form to register a new customer
    alert("This would open a form to register a new customer");
    // For demo purposes, we'll just close the dialog
    setShowLoyaltyDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{t("salesCounter.title")}</h1>
          <p className="text-muted-foreground">{t("salesCounter.subtitle")}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Catalog */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{t("salesCounter.productCatalog")}</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("salesCounter.searchProducts")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={categories[0]} className="w-full">
                  <TabsList className="w-full justify-start mb-4 overflow-x-auto">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category}>
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {categories.map((category) => (
                    <TabsContent
                      key={category}
                      value={category}
                      className="mt-0"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredProducts
                          .filter((product) => product.category === category)
                          .map((product) => (
                            <Card
                              key={product.id}
                              className="cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => addToCart(product)}
                            >
                              <CardContent className="p-4 text-center">
                                <div className="w-16 h-16 mx-auto mb-2 overflow-hidden rounded-md">
                                  {product.imageUrl ? (
                                    <img
                                      src={product.imageUrl}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                          "https://via.placeholder.com/150?text=بدون+تصویر";
                                      }}
                                    />
                                  ) : (
                                    <div className="rounded-full bg-primary/10 p-2 w-full h-full flex items-center justify-center">
                                      <Tag className="h-6 w-6 text-primary" />
                                    </div>
                                  )}
                                </div>
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-primary font-bold">
                                  ${product.price.toFixed(2)}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Stock: {product.stock}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Shopping Cart */}
          <div className="space-y-4">
            {/* Customer Selection */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Customer</CardTitle>
                  <Dialog
                    open={showLoyaltyDialog}
                    onOpenChange={setShowLoyaltyDialog}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-1" />
                        {selectedCustomer
                          ? "Change Customer"
                          : "Select Customer"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Select Customer</DialogTitle>
                        <DialogDescription>
                          Select an existing customer or register a new one to
                          apply loyalty benefits.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="جستجو بر اساس نام یا شماره تلفن..."
                            value={customerSearchTerm}
                            onChange={(e) =>
                              setCustomerSearchTerm(e.target.value)
                            }
                            className="pl-8 mb-4"
                          />
                        </div>

                        {filteredCustomers.length > 0 ? (
                          filteredCustomers.map((customer) => (
                            <Card
                              key={customer.id}
                              className="cursor-pointer hover:bg-gray-50"
                              onClick={() => selectCustomer(customer)}
                            >
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h3 className="font-medium">
                                      {customer.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {customer.phone}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium">
                                      {customer.loyaltyPoints} points
                                    </p>
                                    <p className="text-xs text-muted-foreground capitalize">
                                      {customer.loyaltyTier} tier
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-4 text-muted-foreground">
                            مشتری یافت نشد
                          </div>
                        )}
                        <Button
                          className="w-full"
                          onClick={registerNewCustomer}
                        >
                          Register New Customer
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {selectedCustomer ? (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{selectedCustomer.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedCustomer.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {selectedCustomer.loyaltyPoints} points
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {selectedCustomer.loyaltyTier} tier
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2 text-muted-foreground">
                    No customer selected
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shopping Cart */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{t("salesCounter.shoppingCart")}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    disabled={cart.length === 0}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />{" "}
                    {t("salesCounter.clear")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      {t("salesCounter.cartEmpty")}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center p-2 border rounded-md"
                        >
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex items-center space-x-2">
                              <p className="text-sm text-muted-foreground">
                                ${item.price.toFixed(2)} each
                              </p>
                              {item.discountPercent && (
                                <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                                  {item.discountPercent}% off
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease</span>
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase</span>
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-blue-500"
                                >
                                  <Percent className="h-3 w-3" />
                                  <span className="sr-only">Discount</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Apply Item Discount</DialogTitle>
                                  <DialogDescription>
                                    Apply a percentage discount to this item.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="discount"
                                      className="text-right"
                                    >
                                      Discount %
                                    </Label>
                                    <Select
                                      onValueChange={(value) =>
                                        applyItemDiscount(
                                          item.id,
                                          parseInt(value),
                                        )
                                      }
                                      defaultValue={
                                        item.discountPercent?.toString() || "0"
                                      }
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select discount" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="0">
                                          No Discount
                                        </SelectItem>
                                        <SelectItem value="5">5%</SelectItem>
                                        <SelectItem value="10">10%</SelectItem>
                                        <SelectItem value="15">15%</SelectItem>
                                        <SelectItem value="20">20%</SelectItem>
                                        <SelectItem value="25">25%</SelectItem>
                                        <SelectItem value="50">50%</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Apply Discount</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Discount Code */}
                  {cart.length > 0 && (
                    <div className="pt-4 border-t">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Discount code"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={applyDiscountCode} variant="outline">
                          Apply
                        </Button>
                      </div>
                      {appliedDiscount && (
                        <div className="mt-2 flex justify-between items-center bg-green-50 p-2 rounded">
                          <div>
                            <p className="text-sm font-medium">
                              {appliedDiscount.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {appliedDiscount.type === "percentage"
                                ? `${appliedDiscount.value}% off`
                                : `${appliedDiscount.value.toFixed(2)} off`}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={removeDiscount}
                            className="h-6 text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Order Summary */}
                  {cart.length > 0 && (
                    <div className="pt-4 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>

                      {appliedDiscount && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount:</span>
                          <span>-${calculateDiscount().toFixed(2)}</span>
                        </div>
                      )}

                      {selectedCustomer && calculateLoyaltyDiscount() > 0 && (
                        <div className="flex justify-between text-sm text-blue-600">
                          <span>
                            Loyalty Discount ({selectedCustomer.loyaltyTier}):
                          </span>
                          <span>-${calculateLoyaltyDiscount().toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm">
                        <span>Tax (8%):</span>
                        <span>${calculateTax().toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-lg font-bold pt-2 border-t mt-2">
                        <span>{t("salesCounter.total")}:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {/* Payment Method */}
                  {cart.length > 0 && (
                    <div className="pt-4">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select
                        value={paymentMethod}
                        onValueChange={(value: "cash" | "card" | "mobile") =>
                          setPaymentMethod(value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="card">
                            Credit/Debit Card
                          </SelectItem>
                          <SelectItem value="mobile">Mobile Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="pt-4 space-y-2">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />{" "}
                      {t("salesCounter.checkout")}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handlePrintReceipt}
                      disabled={cart.length === 0}
                    >
                      <Printer className="mr-2 h-5 w-5" />{" "}
                      {t("salesCounter.printReceipt")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Receipt Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Receipt className="mr-2 h-5 w-5" /> Receipt
            </DialogTitle>
          </DialogHeader>
          {receiptData && (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-xl font-bold text-center">Store Receipt</h2>
                <p className="text-center text-muted-foreground">
                  Thank you for your purchase!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p>
                    <strong>Receipt #:</strong> {receiptData.receiptNumber}
                  </p>
                  <p>
                    <strong>Date:</strong> {receiptData.date}
                  </p>
                </div>
                <div className="text-right">
                  <p>
                    <strong>Payment:</strong> {receiptData.paymentMethod}
                  </p>
                  {receiptData.customer && (
                    <p>
                      <strong>Customer:</strong> {receiptData.customer.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-b py-4">
                <h3 className="font-medium mb-2">Items</h3>
                <div className="space-y-2">
                  {receiptData.items.map((item: CartItem) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        {item.discountPercent && (
                          <span className="text-xs text-green-600 ml-2">
                            ({item.discountPercent}% off)
                          </span>
                        )}
                      </div>
                      <span>
                        $
                        {(
                          item.price * item.quantity -
                          (item.discountPercent
                            ? (item.price *
                                item.quantity *
                                item.discountPercent) /
                              100
                            : 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${receiptData.subtotal.toFixed(2)}</span>
                </div>

                {receiptData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${receiptData.discount.toFixed(2)}</span>
                  </div>
                )}

                {receiptData.loyaltyDiscount > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Loyalty Discount:</span>
                    <span>-${receiptData.loyaltyDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${receiptData.tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span>Total:</span>
                  <span>${receiptData.total.toFixed(2)}</span>
                </div>
              </div>

              {receiptData.customer && (
                <div className="bg-blue-50 p-3 rounded text-sm">
                  <p className="font-medium">Loyalty Program</p>
                  <p>Points earned: {Math.floor(receiptData.total)}</p>
                  <p>
                    New balance:{" "}
                    {receiptData.customer.loyaltyPoints +
                      Math.floor(receiptData.total)}{" "}
                    points
                  </p>
                </div>
              )}

              <div className="text-center text-xs text-muted-foreground pt-4">
                <p>Thank you for shopping with us!</p>
                <p>Please keep this receipt for your records.</p>
              </div>

              <DialogFooter>
                <Button onClick={handlePrintReceipt}>
                  <Printer className="mr-2 h-4 w-4" /> Print Receipt
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReceiptDialog(false);
                    clearCart();
                  }}
                >
                  <Package className="mr-2 h-4 w-4" /> New Sale
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesCounter;
