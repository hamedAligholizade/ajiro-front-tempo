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
import { useToast } from "@/components/ui/use-toast";
import orderService from "@/api/services/orderService";
import { Order, OrderItem } from "@/api/services/orderService";

interface OrderWithUIProps extends Order {
  items: (OrderItem & { productName?: string })[];
}

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("all-orders");
  const [selectedOrder, setSelectedOrder] = useState<OrderWithUIProps | null>(null);
  const [orders, setOrders] = useState<OrderWithUIProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { toast } = useToast();

  // Fetch orders from backend
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const params: any = {
        page: 1,
        limit: 50
      };
      
      // Add filters if available
      if (searchTerm) params.search = searchTerm;
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;
      if (statusFilter && statusFilter !== 'all') params.status = statusFilter;
      
      const response = await orderService.getOrders(params);
      
      // Check if response and orders array exist
      if (response && response.orders) {
        // Map API response to UI model
        const mappedOrders = response.orders.map(order => {
          // Ensure items array exists before mapping
          const items = order.items || [];
          
          // Transform items to include productName for UI display
          const mappedItems = items.map(item => ({
            ...item,
            productName: item.product?.name || `Product ${item.product_id}`
          }));
          
          return {
            ...order,
            items: mappedItems
          } as OrderWithUIProps;
        });
        
        setOrders(mappedOrders);
      } else {
        // Handle case when orders array is not present
        console.warn("No orders returned from API", response);
        setOrders([]);
        toast({
          title: "No Orders Found",
          description: "No orders matched your search criteria",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // Set empty array to prevent mapping errors
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = () => {
    // For now, just redirect to the sales counter page which has shop_id handling
    window.location.href = '/sales-counter';
    
    // Alternatively, we could implement a modal here for direct order creation
    // that includes shop_id from shopService.getCurrentShopId()
  };

  const handleViewOrder = async (order: OrderWithUIProps) => {
    setIsLoading(true);
    try {
      // Fetch detailed order information
      const detailedOrder = await orderService.getOrderById(order.id);
      
      // Make sure we have a valid order with items array
      if (detailedOrder) {
        // Map the API response to UI model
        const orderWithUI = {
          ...detailedOrder,
          items: (detailedOrder.items || []).map(item => ({
            ...item,
            productName: item.product?.name || `Product ${item.product_id}`
          }))
        } as OrderWithUIProps;
        
        setSelectedOrder(orderWithUI);
        setActiveTab("view-order");
      } else {
        throw new Error("Order details not found");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch order details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditOrder = (order: OrderWithUIProps) => {
    // Implement edit functionality or redirect to edit page
    alert(`Editing order: ${order.order_number}`);
  };

  const handleUpdateOrderStatus = async (order: OrderWithUIProps, newStatus: Order['status']) => {
    setIsLoading(true);
    try {
      // Call API to update order status
      await orderService.updateOrderStatus(order.id, newStatus, `Status changed to ${newStatus}`);
      
      // Update local state
      const updatedOrders = orders.map(o => {
        if (o.id === order.id) {
          return { ...o, status: newStatus };
        }
        return o;
      });
      
      setOrders(updatedOrders);
      
      // If we're viewing this order, update it
      if (selectedOrder && selectedOrder.id === order.id) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      
      toast({
        title: "Success",
        description: `Order status updated to ${newStatus}.`,
        variant: "default"
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePaymentStatus = async (order: OrderWithUIProps, newStatus: Order['payment_status']) => {
    setIsLoading(true);
    try {
      // Call API to update payment status
      await orderService.updatePaymentStatus(order.id, newStatus);
      
      // Update local state
      const updatedOrders = orders.map(o => {
        if (o.id === order.id) {
          return { ...o, payment_status: newStatus };
        }
        return o;
      });
      
      setOrders(updatedOrders);
      
      // If we're viewing this order, update it
      if (selectedOrder && selectedOrder.id === order.id) {
        setSelectedOrder({ ...selectedOrder, payment_status: newStatus });
      }
      
      toast({
        title: "Success",
        description: `Payment status updated to ${newStatus}.`,
        variant: "default"
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast({
        title: "Error",
        description: "Failed to update payment status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <ClipboardList className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
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

  const getPaymentStatusBadge = (status: Order['payment_status']) => {
    const statusClasses = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-amber-100 text-amber-800",
      partial: "bg-yellow-100 text-yellow-800",
      refunded: "bg-red-100 text-red-800",
    };
    
    const statusText = {
      paid: "Paid",
      pending: "Pending Payment",
      partial: "Partially Paid",
      refunded: "Refunded",
    };
    
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusClasses[status]
        }`}
      >
        {status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
        {status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
        {status === 'partial' && <CreditCard className="h-3 w-3 mr-1" />}
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

  const handleApplyFilters = () => {
    fetchOrders();
  };
  
  const handleResetFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setStatusFilter("");
    fetchOrders();
  };
  
  const getPaymentStatusColor = (status: Order['payment_status']) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "partial":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getNextAvailableStatuses = (currentStatus: Order['status']): Order['status'][] => {
    switch (currentStatus) {
      case "pending":
        return ["processing", "cancelled"];
      case "processing":
        return ["shipped", "cancelled"];
      case "shipped":
        return ["delivered", "cancelled"];
      case "delivered":
        // Final status, no further transitions
        return [];
      case "cancelled":
        // Final status, no further transitions
        return [];
      default:
        return [];
    }
  };
  
  const renderOrderActions = (order: OrderWithUIProps) => {
    const nextStatuses = getNextAvailableStatuses(order.status);
    
    return (
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewOrder(order)}
        >
          <Eye className="h-4 w-4 mr-1" /> {t("view")}
        </Button>
        
        {nextStatuses.length > 0 && (
          <Select onValueChange={(value) => handleUpdateOrderStatus(order, value as Order['status'])}>
            <SelectTrigger className="h-9 w-[140px]">
              <SelectValue placeholder={t("update_status")} />
            </SelectTrigger>
            <SelectContent>
              {nextStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {t(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {order.payment_status === "pending" && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleUpdatePaymentStatus(order, "paid")}
          >
            <CreditCard className="h-4 w-4 mr-1" /> {t("mark_as_paid")}
          </Button>
        )}
      </div>
    );
  };
  
  const renderOrdersList = () => {
    if (isLoading && orders.length === 0) {
      return (
        <div className="flex justify-center items-center h-40">
          <p>{t("loading_orders")}</p>
        </div>
      );
    }
    
    if (orders.length === 0) {
      return (
        <div className="flex justify-center items-center h-40">
          <p>{t("no_orders_found")}</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-3">
        {orders.map((order) => (
          <Card key={order.id} className="hover:bg-slate-50 transition-colors">
            <CardContent className="p-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  <div className="font-semibold">{order.order_number}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(order.order_date).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="col-span-12 md:col-span-3">
                  <div className="text-sm font-semibold">{order.customer?.name || t("guest")}</div>
                  <div className="text-sm text-muted-foreground">{order.items.length} {t("items")}</div>
                </div>
                
                <div className="col-span-12 md:col-span-2">
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(order.status)}
                    <span className="text-sm">{t(order.status)}</span>
                  </div>
                  <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${getPaymentStatusColor(order.payment_status)}`}>
                    {t(order.payment_status)}
                  </div>
                </div>
                
                <div className="col-span-12 md:col-span-2 text-right">
                  <div className="font-semibold">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.total_amount)}
                  </div>
                </div>
                
                <div className="col-span-12 md:col-span-2">
                  {renderOrderActions(order)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  const renderOrderDetails = () => {
    if (!selectedOrder) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedOrder(null);
              setActiveTab("all-orders");
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> {t("back_to_orders")}
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-1" /> {t("print")}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" /> {t("export")}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("order_details")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("order_number")}</span>
                  <span className="font-semibold">{selectedOrder.order_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("order_date")}</span>
                  <span>{new Date(selectedOrder.order_date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("status")}</span>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(selectedOrder.status)}
                    <span className="text-sm">{t(selectedOrder.status)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("payment_status")}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPaymentStatusColor(selectedOrder.payment_status)}`}>
                    {t(selectedOrder.payment_status)}
                  </span>
                </div>
                {selectedOrder.tracking_number && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("tracking_number")}</span>
                    <span>{selectedOrder.tracking_number}</span>
                  </div>
                )}
                {selectedOrder.delivery_date && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("delivery_date")}</span>
                    <span>{new Date(selectedOrder.delivery_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t("customer_information")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-semibold">{selectedOrder.customer?.name || t("guest")}</div>
                {selectedOrder.customer?.email && (
                  <div>{selectedOrder.customer.email}</div>
                )}
                {selectedOrder.customer?.phone && (
                  <div>{selectedOrder.customer.phone}</div>
                )}
                {selectedOrder.shipping_address && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm mb-1">{t("shipping_address")}</h4>
                    <p className="text-sm">{selectedOrder.shipping_address}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("order_items")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <div className="grid grid-cols-12 gap-4 p-3 border-b bg-muted/50">
                <div className="col-span-5 font-semibold text-sm">{t("product")}</div>
                <div className="col-span-2 font-semibold text-sm">{t("price")}</div>
                <div className="col-span-2 font-semibold text-sm">{t("quantity")}</div>
                <div className="col-span-3 font-semibold text-sm text-right">{t("total")}</div>
              </div>
              
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 p-3 border-b last:border-0">
                  <div className="col-span-5">
                    <div className="font-medium">{item.productName}</div>
                    <div className="text-xs text-muted-foreground">SKU: {item.product_id}</div>
                  </div>
                  <div className="col-span-2">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.unit_price)}
                  </div>
                  <div className="col-span-2">{item.quantity}</div>
                  <div className="col-span-3 text-right font-medium">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.total_price)}
                  </div>
                </div>
              ))}
              
              <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50">
                <div className="col-span-9 text-right font-semibold">{t("total")}</div>
                <div className="col-span-3 text-right font-semibold">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedOrder.total_amount)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {selectedOrder.status_history && selectedOrder.status_history.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t("order_history")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedOrder.status_history.map((history) => (
                  <div key={history.id} className="flex gap-4 items-start">
                    <div className="mt-1">
                      {getStatusIcon(history.status as Order['status'])}
                    </div>
                    <div>
                      <div className="font-medium">{t(history.status)}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(history.created_at).toLocaleString()}
                      </div>
                      {history.user && (
                        <div className="text-xs text-muted-foreground">
                          {t("by")} {history.user.first_name} {history.user.last_name}
                        </div>
                      )}
                      {history.note && (
                        <div className="text-sm mt-1">{history.note}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };
  
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">{t("order_management")}</h1>
        <Button onClick={handleCreateOrder}>
          <Plus className="h-4 w-4 mr-2" /> {t("create_order")}
        </Button>
      </div>
      
      <Tabs defaultValue="all-orders" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all-orders">{t("all_orders")}</TabsTrigger>
          {selectedOrder && <TabsTrigger value="view-order">{t("order_details")}</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="all-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("filter_orders")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("search_by_order_or_customer")}
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Input
                    type="date"
                    placeholder={t("start_date")}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <Input
                    type="date"
                    placeholder={t("end_date")}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("all")}</SelectItem>
                      <SelectItem value="pending">{t("pending")}</SelectItem>
                      <SelectItem value="processing">{t("processing")}</SelectItem>
                      <SelectItem value="shipped">{t("shipped")}</SelectItem>
                      <SelectItem value="delivered">{t("delivered")}</SelectItem>
                      <SelectItem value="cancelled">{t("cancelled")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={handleResetFilters}>
                  {t("reset")}
                </Button>
                <Button onClick={handleApplyFilters}>
                  <Filter className="h-4 w-4 mr-2" /> {t("apply_filters")}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {renderOrdersList()}
        </TabsContent>
        
        <TabsContent value="view-order">
          {renderOrderDetails()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderManagement; 