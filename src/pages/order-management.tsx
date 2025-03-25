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
  ClipboardList,
  Clock,
  CheckCircle,
  AlertTriangle,
  Truck,
  XCircle,
  Plus,
  Edit,
  Eye,
  Download,
  Printer,
  Search,
  Calendar,
  CreditCard,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { t } from "@/lib/i18n";

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "refunded";
  orderDate: string;
  shippedDate?: string;
  deliveredDate?: string;
  shippingAddress: string;
  notes?: string;
}

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("all-orders");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Sample orders data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2023-001",
      customer: {
        name: "John Smith",
        email: "john.smith@example.com"
      },
      items: [
        { id: "item1", productName: "Premium Coffee Beans", quantity: 2, price: 24.99, total: 49.98 },
        { id: "item2", productName: "Ceramic Mug - White", quantity: 1, price: 12.99, total: 12.99 }
      ],
      total: 62.97,
      status: "delivered",
      paymentStatus: "paid",
      orderDate: "2023-09-15",
      shippedDate: "2023-09-16",
      deliveredDate: "2023-09-18",
      shippingAddress: "123 Main St, Anytown, CA 12345"
    },
    {
      id: "2",
      orderNumber: "ORD-2023-002",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@example.com"
      },
      items: [
        { id: "item3", productName: "Espresso Machine Filter", quantity: 4, price: 8.50, total: 34.00 },
        { id: "item4", productName: "Vanilla Syrup", quantity: 2, price: 6.99, total: 13.98 }
      ],
      total: 47.98,
      status: "processing",
      paymentStatus: "paid",
      orderDate: "2023-09-16",
      shippingAddress: "456 Oak Ave, Othertown, NY 67890"
    },
    {
      id: "3",
      orderNumber: "ORD-2023-003",
      customer: {
        name: "Michael Brown",
        email: "mbrown@example.com"
      },
      items: [
        { id: "item5", productName: "Coffee Grinder - Professional", quantity: 1, price: 129.99, total: 129.99 }
      ],
      total: 129.99,
      status: "shipped",
      paymentStatus: "paid",
      orderDate: "2023-09-17",
      shippedDate: "2023-09-19",
      shippingAddress: "789 Pine St, Somewhere, TX 54321"
    },
    {
      id: "4",
      orderNumber: "ORD-2023-004",
      customer: {
        name: "Emily Davis",
        email: "emily.d@example.com"
      },
      items: [
        { id: "item6", productName: "Premium Coffee Beans", quantity: 3, price: 24.99, total: 74.97 },
        { id: "item7", productName: "Ceramic Mug - Black", quantity: 2, price: 12.99, total: 25.98 }
      ],
      total: 100.95,
      status: "pending",
      paymentStatus: "unpaid",
      orderDate: "2023-09-18",
      shippingAddress: "101 Cedar Ln, Elsewhere, WA 13579",
      notes: "Please deliver after 5 PM"
    },
    {
      id: "5",
      orderNumber: "ORD-2023-005",
      customer: {
        name: "David Wilson",
        email: "dwilson@example.com"
      },
      items: [
        { id: "item8", productName: "Coffee Gift Set", quantity: 1, price: 49.99, total: 49.99 }
      ],
      total: 49.99,
      status: "cancelled",
      paymentStatus: "refunded",
      orderDate: "2023-09-14",
      shippingAddress: "202 Maple Dr, Anywhere, FL 24680"
    }
  ];

  const handleCreateOrder = () => {
    alert("Opening order creation form...");
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setActiveTab("view-order");
  };

  const handleEditOrder = (order: Order) => {
    alert(`Editing order: ${order.orderNumber}`);
  };

  const handleUpdateOrderStatus = (order: Order, newStatus: Order['status']) => {
    alert(`Updating order ${order.orderNumber} status to ${newStatus}`);
  };

  const handleUpdatePaymentStatus = (order: Order, newStatus: Order['paymentStatus']) => {
    alert(`Updating order ${order.orderNumber} payment status to ${newStatus}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "processing":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      case "shipped":
        return <Truck className="h-4 w-4 text-cyan-500" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusClasses = {
      pending: "bg-amber-100 text-amber-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-cyan-100 text-cyan-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    
    const statusText = {
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped", 
      delivered: "Delivered",
      cancelled: "Cancelled",
    };
    
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusClasses[status]
        }`}
      >
        <span className="mr-1">{getStatusIcon(status)}</span>
        {statusText[status]}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: Order['paymentStatus']) => {
    const statusClasses = {
      paid: "bg-green-100 text-green-800",
      unpaid: "bg-amber-100 text-amber-800",
      refunded: "bg-red-100 text-red-800",
    };
    
    const statusText = {
      paid: "Paid",
      unpaid: "Unpaid",
      refunded: "Refunded",
    };
    
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusClasses[status]
        }`}
      >
        {status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
        {status === 'unpaid' && <Clock className="h-3 w-3 mr-1" />}
        {status === 'refunded' && <XCircle className="h-3 w-3 mr-1" />}
        {statusText[status]}
      </span>
    );
  };

  const getStatusCounts = () => {
    return {
      pending: orders.filter(o => o.status === "pending").length,
      processing: orders.filter(o => o.status === "processing").length,
      shipped: orders.filter(o => o.status === "shipped").length,
      delivered: orders.filter(o => o.status === "delivered").length,
      cancelled: orders.filter(o => o.status === "cancelled").length,
    };
  };

  const getFilteredOrders = (tab: string) => {
    if (tab === "all-orders") return orders;
    return orders.filter(order => order.status === tab);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{t("orders.title")}</h1>
          <p className="text-muted-foreground">{t("orders.subtitle")}</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            <TabsTrigger value="all-orders" className="flex items-center">
              <ClipboardList className="mr-2 h-4 w-4" /> All Orders
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" /> Pending
            </TabsTrigger>
            <TabsTrigger value="processing" className="flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" /> Processing
            </TabsTrigger>
            <TabsTrigger value="shipped" className="flex items-center">
              <Truck className="mr-2 h-4 w-4" /> Shipped
            </TabsTrigger>
            <TabsTrigger value="delivered" className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" /> Delivered
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center">
              <XCircle className="mr-2 h-4 w-4" /> Cancelled
            </TabsTrigger>
          </TabsList>

          {/* Order Status Summary Cards */}
          {activeTab === 'all-orders' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-amber-500 mr-2" />
                      <span className="text-sm font-medium">Pending</span>
                    </div>
                    <span className="text-2xl font-bold">{getStatusCounts().pending}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm font-medium">Processing</span>
                    </div>
                    <span className="text-2xl font-bold">{getStatusCounts().processing}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <Truck className="h-5 w-5 text-cyan-500 mr-2" />
                      <span className="text-sm font-medium">Shipped</span>
                    </div>
                    <span className="text-2xl font-bold">{getStatusCounts().shipped}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm font-medium">Delivered</span>
                    </div>
                    <span className="text-2xl font-bold">{getStatusCounts().delivered}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-sm font-medium">Cancelled</span>
                    </div>
                    <span className="text-2xl font-bold">{getStatusCounts().cancelled}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Orders List Tabs */}
          {["all-orders", "pending", "processing", "shipped", "delivered", "cancelled"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              {tab === activeTab && tab !== 'view-order' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          className="pl-10 w-[250px]"
                          placeholder="Search orders..."
                        />
                      </div>
                      <Button variant="outline" className="ml-2">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                      <Button variant="outline" className="ml-2">
                        <Calendar className="mr-2 h-4 w-4" /> Date Range
                      </Button>
                    </div>
                    <Button onClick={handleCreateOrder}>
                      <Plus className="mr-2 h-4 w-4" /> Create Order
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {getFilteredOrders(tab).map((order) => (
                      <Card key={order.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <h3 className="font-semibold text-lg">
                                  {order.orderNumber}
                                </h3>
                                <span className="mx-2 text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">
                                  {order.orderDate}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Customer: {order.customer.name}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewOrder(order)}
                              >
                                <Eye className="h-4 w-4 mr-1" /> View
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditOrder(order)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <div className="text-sm text-muted-foreground">
                                Status
                              </div>
                              <div className="font-medium mt-1">
                                {getStatusBadge(order.status)}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">
                                Payment
                              </div>
                              <div className="font-medium mt-1">
                                {getPaymentStatusBadge(order.paymentStatus)}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">
                                Items
                              </div>
                              <div className="font-medium">
                                {order.items.length} ({order.items.reduce((acc, item) => acc + item.quantity, 0)} products)
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">
                                Total
                              </div>
                              <div className="font-medium">
                                {formatCurrency(order.total)}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 border-t pt-4">
                            <div className="text-sm text-muted-foreground mb-2">
                              Change Status:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order, "pending")}
                                disabled={order.status === "pending"}
                              >
                                <Clock className="h-3 w-3 mr-1" /> Pending
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order, "processing")}
                                disabled={order.status === "processing"}
                              >
                                <AlertTriangle className="h-3 w-3 mr-1" /> Processing
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order, "shipped")}
                                disabled={order.status === "shipped"}
                              >
                                <Truck className="h-3 w-3 mr-1" /> Shipped
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order, "delivered")}
                                disabled={order.status === "delivered"}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" /> Delivered
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order, "cancelled")}
                                disabled={order.status === "cancelled"}
                              >
                                <XCircle className="h-3 w-3 mr-1" /> Cancelled
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          ))}

          {/* View Order Tab */}
          {selectedOrder && (
            <TabsContent value="view-order" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveTab("all-orders")}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    Order {selectedOrder.orderNumber}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEditOrder(selectedOrder)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                  >
                    <Printer className="mr-2 h-4 w-4" /> Print
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Order Number</div>
                      <div className="font-medium">{selectedOrder.orderNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="font-medium">{selectedOrder.orderDate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className="font-medium">{getStatusBadge(selectedOrder.status)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Payment</div>
                      <div className="font-medium">{getPaymentStatusBadge(selectedOrder.paymentStatus)}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Name</div>
                      <div className="font-medium">{selectedOrder.customer.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">{selectedOrder.customer.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Shipping Address</div>
                      <div className="font-medium">{selectedOrder.shippingAddress}</div>
                    </div>
                    {selectedOrder.notes && (
                      <div>
                        <div className="text-sm text-muted-foreground">Notes</div>
                        <div className="font-medium">{selectedOrder.notes}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Order Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5">
                        <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                      </div>
                      <div>
                        <div className="font-medium">Order Placed</div>
                        <div className="text-sm text-muted-foreground">{selectedOrder.orderDate}</div>
                      </div>
                    </div>
                    
                    {selectedOrder.status !== "pending" && selectedOrder.status !== "cancelled" && (
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5">
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                        </div>
                        <div>
                          <div className="font-medium">Order Processing</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedOrder.orderDate}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {(selectedOrder.status === "shipped" || selectedOrder.status === "delivered") && selectedOrder.shippedDate && (
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5">
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                        </div>
                        <div>
                          <div className="font-medium">Shipped</div>
                          <div className="text-sm text-muted-foreground">{selectedOrder.shippedDate}</div>
                        </div>
                      </div>
                    )}
                    
                    {selectedOrder.status === "delivered" && selectedOrder.deliveredDate && (
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5">
                          <div className="h-4 w-4 rounded-full bg-green-500"></div>
                        </div>
                        <div>
                          <div className="font-medium">Delivered</div>
                          <div className="text-sm text-muted-foreground">{selectedOrder.deliveredDate}</div>
                        </div>
                      </div>
                    )}
                    
                    {selectedOrder.status === "cancelled" && (
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5">
                          <div className="h-4 w-4 rounded-full bg-red-500"></div>
                        </div>
                        <div>
                          <div className="font-medium">Cancelled</div>
                          <div className="text-sm text-muted-foreground">{selectedOrder.orderDate}</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 font-medium">Product</th>
                          <th className="text-center py-3 font-medium">Price</th>
                          <th className="text-center py-3 font-medium">Quantity</th>
                          <th className="text-right py-3 font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="py-4">{item.productName}</td>
                            <td className="py-4 text-center">{formatCurrency(item.price)}</td>
                            <td className="py-4 text-center">{item.quantity}</td>
                            <td className="py-4 text-right">{formatCurrency(item.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3} className="py-3 text-right font-medium">Subtotal:</td>
                          <td className="py-3 text-right">{formatCurrency(selectedOrder.total)}</td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="py-3 text-right font-medium">Tax:</td>
                          <td className="py-3 text-right">{formatCurrency(selectedOrder.total * 0.1)}</td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="py-3 text-right font-medium">Shipping:</td>
                          <td className="py-3 text-right">{formatCurrency(5.00)}</td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="py-3 text-right font-bold">Total:</td>
                          <td className="py-3 text-right font-bold">
                            {formatCurrency(selectedOrder.total * 1.1 + 5.00)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateOrderStatus(selectedOrder, "pending")}
                      disabled={selectedOrder.status === "pending"}
                    >
                      <Clock className="h-3 w-3 mr-1" /> Pending
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateOrderStatus(selectedOrder, "processing")}
                      disabled={selectedOrder.status === "processing"}
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" /> Processing
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateOrderStatus(selectedOrder, "shipped")}
                      disabled={selectedOrder.status === "shipped"}
                    >
                      <Truck className="h-3 w-3 mr-1" /> Shipped
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateOrderStatus(selectedOrder, "delivered")}
                      disabled={selectedOrder.status === "delivered"}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" /> Delivered
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateOrderStatus(selectedOrder, "cancelled")}
                      disabled={selectedOrder.status === "cancelled"}
                    >
                      <XCircle className="h-3 w-3 mr-1" /> Cancelled
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Update Payment</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdatePaymentStatus(selectedOrder, "paid")}
                      disabled={selectedOrder.paymentStatus === "paid"}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" /> Mark as Paid
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdatePaymentStatus(selectedOrder, "unpaid")}
                      disabled={selectedOrder.paymentStatus === "unpaid"}
                    >
                      <Clock className="h-3 w-3 mr-1" /> Mark as Unpaid
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdatePaymentStatus(selectedOrder, "refunded")}
                      disabled={selectedOrder.paymentStatus === "refunded"}
                    >
                      <XCircle className="h-3 w-3 mr-1" /> Refund
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default OrderManagement; 