import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, CreditCard, Printer, Tag, Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const SalesCounter = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample product data
  const products: Product[] = [
    { id: "1", name: "Coffee", price: 3.5, category: "Beverages" },
    { id: "2", name: "Tea", price: 2.5, category: "Beverages" },
    { id: "3", name: "Sandwich", price: 5.99, category: "Food" },
    { id: "4", name: "Salad", price: 6.99, category: "Food" },
    { id: "5", name: "Notebook", price: 4.99, category: "Stationery" },
    { id: "6", name: "Pen", price: 1.99, category: "Stationery" },
    { id: "7", name: "Water Bottle", price: 2.99, category: "Beverages" },
    { id: "8", name: "Muffin", price: 3.99, category: "Food" },
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

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    alert(`Processing payment for $${calculateTotal().toFixed(2)}`);
    clearCart();
  };

  const handlePrintReceipt = () => {
    alert("Printing receipt...");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Sales Counter</h1>
          <p className="text-muted-foreground">
            Process transactions and checkout
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Catalog */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Product Catalog</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
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
                                <div className="rounded-full bg-primary/10 p-2 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                                  <Tag className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-primary font-bold">
                                  ${product.price.toFixed(2)}
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
          <div>
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Shopping Cart</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    disabled={cart.length === 0}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Cart is empty
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
                            <p className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </p>
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
                              <span className="sr-only">Decrease</span>-
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
                              <span className="sr-only">Increase</span>+
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                    >
                      <CreditCard className="mr-2 h-5 w-5" /> Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handlePrintReceipt}
                      disabled={cart.length === 0}
                    >
                      <Printer className="mr-2 h-5 w-5" /> Print Receipt
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCounter;
