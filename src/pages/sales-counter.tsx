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
import productService, { Product as ApiProduct } from "@/api/services/productService";
import categoryService, { Category } from "@/api/services/categoryService";
import { formatImageUrl } from "@/utils/imageUtils";
import orderService, { CreateOrderData } from "@/api/services/orderService";
import customerService, { Customer as ApiCustomer } from "@/api/services/customerService";
import { toast } from "@/components/ui/use-toast";

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
  loyaltyTier: "bronze" | "silver" | "gold" | "platinum";
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
  
  // State for products and categories from API
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products and categories from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch categories
        const categoriesData = await categoryService.getCategories();
        
        // Fetch products
        const productsResponse = await productService.getProducts();
        
        // Transform API products to the format expected by the component
        const transformedProducts = productsResponse.products.map((apiProduct: ApiProduct) => ({
          id: apiProduct.id,
          name: apiProduct.name,
          price: typeof apiProduct.selling_price === 'number' 
            ? apiProduct.selling_price 
            : (apiProduct.selling_price ? parseFloat(apiProduct.selling_price) : 0),
          category: apiProduct.category?.name || 'Uncategorized',
          stock: apiProduct.inventory?.stock_quantity || 0,
          imageUrl: apiProduct.image_url
        }));
        
        setProducts(transformedProducts);
        setCategories([...new Set(transformedProducts.map(product => product.category))]);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products and categories');
        setIsLoading(false);
        toast({
          title: "Error loading data",
          description: "There was a problem loading products and categories",
          variant: "destructive",
        });
      }
    };
    
    fetchData();
  }, []);

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

  // State for customers from API
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [newCustomerData, setNewCustomerData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await customerService.getCustomers();
        const transformedCustomers = response.customers.map(
          (apiCustomer: ApiCustomer) => ({
            id: apiCustomer.id,
            name: `${apiCustomer.first_name} ${apiCustomer.last_name}`,
            phone: apiCustomer.phone || "",
            loyaltyPoints: apiCustomer.loyalty_points,
            loyaltyTier: apiCustomer.loyalty_tier,
          })
        );
        setCustomers(transformedCustomers);
      } catch (err) {
        console.error("Error fetching customers:", err);
        toast({
          title: "Error loading customers",
          description: "There was a problem loading customers",
          variant: "destructive",
        });
      }
    };

    fetchCustomers();
  }, []);

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

  const handleCheckout = async () => {
    if (cart.length === 0) {
      return;
    }

    try {
      // Format the order data for the API
      const orderData: CreateOrderData = {
        payment_method: paymentMethod,
        customer_id: selectedCustomer?.id,
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          discount: item.discountPercent ? (item.price * item.quantity * item.discountPercent / 100) : undefined,
        })),
        discount_total: calculateDiscount() + calculateLoyaltyDiscount(),
        notes: "Created from sales counter"
      };

      // Send the order to the API
      const order = await orderService.createOrder(orderData);
      
      // Generate receipt data for display
      setReceiptData({
        id: order.id,
        reference: order.reference_number,
        date: new Date(order.order_date).toLocaleString(),
        customer: selectedCustomer
          ? `${selectedCustomer.name} (${selectedCustomer.phone})`
          : "Guest",
        items: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
          discount: item.discountPercent
            ? (item.price * item.quantity * item.discountPercent) / 100
            : 0,
        })),
        subtotal: calculateSubtotal(),
        discount: calculateDiscount(),
        loyaltyDiscount: calculateLoyaltyDiscount(),
        tax: calculateTax(),
        total: calculateTotal(),
        paymentMethod,
      });

      // Show receipt dialog
      setShowReceiptDialog(true);

      // Clear cart after successful checkout
      clearCart();
      setAppliedDiscount(null);
      setSelectedCustomer(null);
      
      toast({
        title: "Order completed",
        description: "The order has been successfully processed",
        variant: "default",
      });
    } catch (err) {
      console.error("Error creating order:", err);
      toast({
        title: "Checkout failed",
        description: "There was a problem processing your order",
        variant: "destructive",
      });
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

  // Register a new customer
  const registerNewCustomer = async () => {
    try {
      if (!newCustomerData.firstName || !newCustomerData.lastName) {
        toast({
          title: t("missing_information"),
          description: t("enter_name_required"),
          variant: "destructive",
        });
        return;
      }

      const customerData = {
        first_name: newCustomerData.firstName,
        last_name: newCustomerData.lastName,
        phone: newCustomerData.phone,
      };

      const newApiCustomer = await customerService.createCustomer(customerData);

      // Transform and add to customers list
      const newCustomer = {
        id: newApiCustomer.id,
        name: `${newApiCustomer.first_name} ${newApiCustomer.last_name}`,
        phone: newApiCustomer.phone || "",
        loyaltyPoints: newApiCustomer.loyalty_points,
        loyaltyTier: newApiCustomer.loyalty_tier,
      };

      setCustomers([...customers, newCustomer]);
      setSelectedCustomer(newCustomer);
      setShowLoyaltyDialog(false);

      toast({
        title: t("customer_created"),
        description: t("customer_added_successfully"),
        variant: "default",
      });

      // Reset form
      setNewCustomerData({
        firstName: "",
        lastName: "",
        phone: "",
      });
    } catch (err) {
      console.error("Error creating customer:", err);
      toast({
        title: t("error_creating_customer"),
        description: t("problem_adding_customer"),
        variant: "destructive",
      });
    }
  };

  // Show loading state when fetching data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg">{t('loading')}</p>
        </div>
      </div>
    );
  }

  // Show error state if there was a problem
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            {t('try_again')}
          </Button>
        </div>
      </div>
    );
  }

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
                                    />
                                  ) : (
                                    <div className="rounded-full bg-primary/10 p-2 w-full h-full flex items-center justify-center">
                                      <Tag className="h-6 w-6 text-primary" />
                                    </div>
                                  )}
                                </div>
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-primary font-bold">
                                  {typeof product.price === 'number' ? `تومان ${product.price.toFixed(0)} ` : '۰ تومان'}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {t("stock")}: {product.stock}
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
                    <DialogContent className="min-w-[350px] sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>{t("select_or_create_customer")}</DialogTitle>
                        <DialogDescription>
                          {t("loyalty_program_description")}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="py-4">
                        <div className="flex flex-col gap-4">
                          <Input
                            placeholder={t("search_customers")}
                            value={customerSearchTerm}
                            onChange={(e) => setCustomerSearchTerm(e.target.value)}
                            className="mb-2"
                          />

                          {/* Customer List */}
                          <div className="max-h-[300px] overflow-y-auto rounded-md border">
                            {filteredCustomers.length > 0 ? (
                              filteredCustomers.map((customer) => (
                                <div
                                  key={customer.id}
                                  className="flex cursor-pointer items-center justify-between border-b px-4 py-2 last:border-b-0 hover:bg-secondary"
                                  onClick={() => selectCustomer(customer)}
                                >
                                  <div>
                                    <p className="font-medium">{customer.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {customer.phone}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium">
                                      {customer.loyaltyPoints} {t("points")}
                                    </div>
                                    <div
                                      className={`text-sm ${
                                        customer.loyaltyTier === "gold"
                                          ? "text-amber-500"
                                          : customer.loyaltyTier === "silver"
                                          ? "text-zinc-400"
                                          : "text-amber-700"
                                      }`}
                                    >
                                      {t(`tier_${customer.loyaltyTier}`)}
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : customerSearchTerm ? (
                              <div className="p-4 text-center text-muted-foreground">
                                {t("no_customers_found")}
                              </div>
                            ) : (
                              <div className="p-4 text-center text-muted-foreground">
                                {t("search_or_create_customer")}
                              </div>
                            )}
                          </div>

                          {/* New Customer Form */}
                          <div className="mt-4 rounded-md border p-4">
                            <h3 className="mb-3 font-medium">
                              {t("add_new_customer")}
                            </h3>
                            <div className="grid gap-3">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <Label htmlFor="firstName">{t("first_name")}</Label>
                                  <Input
                                    id="firstName"
                                    value={newCustomerData.firstName}
                                    onChange={(e) =>
                                      setNewCustomerData({
                                        ...newCustomerData,
                                        firstName: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="lastName">{t("last_name")}</Label>
                                  <Input
                                    id="lastName"
                                    value={newCustomerData.lastName}
                                    onChange={(e) =>
                                      setNewCustomerData({
                                        ...newCustomerData,
                                        lastName: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor="phone">{t("phone")}</Label>
                                <Input
                                  id="phone"
                                  value={newCustomerData.phone}
                                  onChange={(e) =>
                                    setNewCustomerData({
                                      ...newCustomerData,
                                      phone: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <Button
                              className="mt-3 w-full"
                              onClick={registerNewCustomer}
                            >
                              {t("add_customer")}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowLoyaltyDialog(false)}>
                          {t("cancel")}
                        </Button>
                      </DialogFooter>
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
                          <div className="flex flex-col">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {typeof item.price === 'number' ? `${item.price.toFixed(0)} تومان` : '۰ تومان'} {t("each")}
                            </p>
                            {item.discountPercent && (
                              <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                                {item.discountPercent}% {t("off")}
                              </span>
                            )}
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
                        <span>{t("subtotal")}:</span>
                        <span>{calculateSubtotal().toFixed(0)} تومان</span>
                      </div>

                      {appliedDiscount && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>{t("discount")}:</span>
                          <span>-{calculateDiscount().toFixed(0)} تومان</span>
                        </div>
                      )}

                      {selectedCustomer && calculateLoyaltyDiscount() > 0 && (
                        <div className="flex justify-between text-sm text-blue-600">
                          <span>
                            {t("loyaltyDiscount")} ({t(`tier_${selectedCustomer.loyaltyTier}`)}):</span>
                          <span>-{calculateLoyaltyDiscount().toFixed(0)} تومان</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm">
                        <span>{t("tax")} (8%):</span>
                        <span>{calculateTax().toFixed(0)} تومان</span>
                      </div>

                      <div className="flex justify-between text-lg font-bold pt-2 border-t mt-2">
                        <span>{t("salesCounter.total")}:</span>
                        <span>{calculateTotal().toFixed(0)} تومان</span>
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
                            ({item.discountPercent}% {t("off")})
                          </span>
                        )}
                      </div>
                      <span>
                        {(
                          item.price * item.quantity -
                          (item.discountPercent
                            ? (item.price *
                                item.quantity *
                                item.discountPercent) /
                              100
                            : 0)
                        ).toFixed(0)} تومان
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>{t("subtotal")}:</span>
                  <span>{receiptData.subtotal.toFixed(0)} تومان</span>
                </div>

                {receiptData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{t("discount")}:</span>
                    <span>-{receiptData.discount.toFixed(0)} تومان</span>
                  </div>
                )}

                {receiptData.loyaltyDiscount > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>{t("loyaltyDiscount")}:</span>
                    <span>-{receiptData.loyaltyDiscount.toFixed(0)} تومان</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{t("tax")}:</span>
                  <span>{receiptData.tax.toFixed(0)} تومان</span>
                </div>

                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span>{t("salesCounter.total")}:</span>
                  <span>{receiptData.total.toFixed(0)} تومان</span>
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
