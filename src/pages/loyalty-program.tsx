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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  Gift,
  CreditCard,
  Calendar,
  Download,
  Eye,
  ArrowLeft,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  joinDate: string;
  points: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  lastVisit: string;
  totalSpent: number;
  visits: number;
}

const LoyaltyProgram = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [showAddCustomerDialog, setShowAddCustomerDialog] = useState(false);

  // Sample customer data
  const customers: Customer[] = [
    {
      id: "1",
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@example.com",
      joinDate: "2023-01-15",
      points: 450,
      tier: "silver",
      lastVisit: "2023-09-10",
      totalSpent: 1250.75,
      visits: 24,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      email: "sarah.j@example.com",
      joinDate: "2023-02-22",
      points: 780,
      tier: "gold",
      lastVisit: "2023-09-12",
      totalSpent: 2340.5,
      visits: 35,
    },
    {
      id: "3",
      name: "Michael Brown",
      phone: "+1 (555) 456-7890",
      email: "michael.b@example.com",
      joinDate: "2023-03-10",
      points: 120,
      tier: "bronze",
      lastVisit: "2023-08-28",
      totalSpent: 450.25,
      visits: 8,
    },
    {
      id: "4",
      name: "Emily Davis",
      phone: "+1 (555) 789-0123",
      email: "emily.d@example.com",
      joinDate: "2023-04-05",
      points: 1200,
      tier: "platinum",
      lastVisit: "2023-09-11",
      totalSpent: 3750.0,
      visits: 42,
    },
    {
      id: "5",
      name: "David Wilson",
      phone: "+1 (555) 234-5678",
      email: "david.w@example.com",
      joinDate: "2023-05-18",
      points: 320,
      tier: "silver",
      lastVisit: "2023-09-05",
      totalSpent: 980.5,
      visits: 15,
    },
  ];

  // Sample campaigns
  const campaigns = [
    {
      id: "1",
      name: "Summer Special",
      description: "20% discount on iced beverages",
      status: "active",
      audience: "All customers",
      sent: 245,
      opened: 187,
      redeemed: 56,
      createdAt: "2023-06-01",
    },
    {
      id: "2",
      name: "Birthday Rewards",
      description: "Free dessert on your birthday",
      status: "active",
      audience: "All tiers",
      sent: 42,
      opened: 38,
      redeemed: 31,
      createdAt: "2023-05-15",
    },
    {
      id: "3",
      name: "Gold Member Exclusive",
      description: "Double points weekend",
      status: "scheduled",
      audience: "Gold & Platinum tiers",
      sent: 0,
      opened: 0,
      redeemed: 0,
      createdAt: "2023-09-08",
    },
    {
      id: "4",
      name: "Win-back Campaign",
      description: "We miss you! Come back for a special offer",
      status: "draft",
      audience: "Inactive customers",
      sent: 0,
      opened: 0,
      redeemed: 0,
      createdAt: "2023-09-10",
    },
  ];

  // Sample transactions
  const transactions = [
    {
      id: "1",
      customerId: "1",
      date: "2023-09-10",
      amount: 24.5,
      pointsEarned: 25,
      items: ["Coffee", "Sandwich"],
    },
    {
      id: "2",
      customerId: "2",
      date: "2023-09-12",
      amount: 18.75,
      pointsEarned: 19,
      items: ["Tea", "Muffin", "Salad"],
    },
    {
      id: "3",
      customerId: "4",
      date: "2023-09-11",
      amount: 32.0,
      pointsEarned: 32,
      items: ["Coffee", "Lunch Special", "Dessert"],
    },
    {
      id: "4",
      customerId: "1",
      date: "2023-09-05",
      amount: 12.25,
      pointsEarned: 12,
      items: ["Coffee", "Croissant"],
    },
    {
      id: "5",
      customerId: "3",
      date: "2023-08-28",
      amount: 9.5,
      pointsEarned: 10,
      items: ["Tea", "Cookie"],
    },
  ];

  const filteredCustomers = searchTerm
    ? customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm),
      )
    : customers;

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setActiveTab("customer-details");
  };

  const handleAddPoints = (customerId: string, points: number) => {
    alert(`Adding ${points} points to customer ID: ${customerId}`);
  };

  const handleCreateCampaign = () => {
    alert("Opening campaign creation form...");
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze":
        return "bg-amber-100 text-amber-800";
      case "silver":
        return "bg-gray-100 text-gray-800";
      case "gold":
        return "bg-yellow-100 text-yellow-800";
      case "platinum":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Loyalty Program</h1>
          <p className="text-muted-foreground">
            Manage customer loyalty and rewards
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            <TabsTrigger value="customers" className="flex items-center">
              <Users className="mr-2 h-4 w-4" /> Customers
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" /> Campaigns
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center">
              <Gift className="mr-2 h-4 w-4" /> Rewards
            </TabsTrigger>
          </TabsList>

          {/* Customers Tab */}
          <TabsContent value="customers" className="mt-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold">Loyalty Members</h2>
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:flex-none sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button onClick={() => setShowAddCustomerDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Customer
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Contact</th>
                        <th className="px-4 py-3">Points</th>
                        <th className="px-4 py-3">Tier</th>
                        <th className="px-4 py-3">Last Visit</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="border-b">
                          <td className="px-4 py-3 font-medium">
                            {customer.name}
                          </td>
                          <td className="px-4 py-3">
                            <div>{customer.phone}</div>
                            <div className="text-xs text-muted-foreground">
                              {customer.email}
                            </div>
                          </td>
                          <td className="px-4 py-3">{customer.points}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(customer.tier)}`}
                            >
                              {customer.tier.charAt(0).toUpperCase() +
                                customer.tier.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">{customer.lastVisit}</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewCustomer(customer)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleAddPoints(customer.id, 10)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  alert(`Edit customer: ${customer.name}`)
                                }
                              >
                                <Edit className="h-4 w-4" />
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
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">SMS Campaigns</h2>
              <Button onClick={handleCreateCampaign}>
                <Plus className="mr-2 h-4 w-4" /> Create Campaign
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{campaign.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {campaign.description}
                        </CardDescription>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCampaignStatusColor(campaign.status)}`}
                      >
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Target Audience:
                        </span>
                        <span>{campaign.audience}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{campaign.createdAt}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-semibold">
                            {campaign.sent}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Sent
                          </div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-semibold">
                            {campaign.opened}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Opened
                          </div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-semibold">
                            {campaign.redeemed}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Redeemed
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0 flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => alert(`Edit campaign: ${campaign.name}`)}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        alert(`View results for: ${campaign.name}`)
                      }
                      disabled={
                        campaign.status === "draft" ||
                        campaign.status === "scheduled"
                      }
                    >
                      <Eye className="mr-2 h-4 w-4" /> Results
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Rewards & Benefits</h2>
              <Button onClick={() => alert("Add new reward")}>
                <Plus className="mr-2 h-4 w-4" /> Add Reward
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Program Overview</CardTitle>
                  <CardDescription>
                    Current loyalty program structure and benefits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Point Accrual Rate</h3>
                        <p className="text-sm text-muted-foreground">
                          Points earned per dollar spent
                        </p>
                      </div>
                      <div className="text-xl font-bold">1:1</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Redemption Rate</h3>
                        <p className="text-sm text-muted-foreground">
                          Value per 100 points
                        </p>
                      </div>
                      <div className="text-xl font-bold">$5.00</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Total Members</h3>
                        <p className="text-sm text-muted-foreground">
                          Active loyalty program members
                        </p>
                      </div>
                      <div className="text-xl font-bold">1,234</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Points Issued (30 days)</h3>
                        <p className="text-sm text-muted-foreground">
                          Total points awarded to customers
                        </p>
                      </div>
                      <div className="text-xl font-bold">45,678</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tier Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of customers by loyalty tier
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTierColor("bronze")} mr-2`}
                          >
                            Bronze
                          </span>
                          <span className="text-sm">0-499 points</span>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: "45%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTierColor("silver")} mr-2`}
                          >
                            Silver
                          </span>
                          <span className="text-sm">500-999 points</span>
                        </div>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-gray-400 rounded-full"
                          style={{ width: "30%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTierColor("gold")} mr-2`}
                          >
                            Gold
                          </span>
                          <span className="text-sm">1000-1999 points</span>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: "20%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTierColor("platinum")} mr-2`}
                          >
                            Platinum
                          </span>
                          <span className="text-sm">2000+ points</span>
                        </div>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-purple-400 rounded-full"
                          style={{ width: "5%" }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-lg font-medium mb-4">Available Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Free Coffee",
                  description: "Redeem a free coffee of any size",
                  points: 100,
                  tier: "bronze",
                },
                {
                  title: "$5 Off Purchase",
                  description: "$5 discount on any purchase",
                  points: 200,
                  tier: "bronze",
                },
                {
                  title: "Free Sandwich",
                  description: "Complimentary sandwich of your choice",
                  points: 350,
                  tier: "silver",
                },
                {
                  title: "10% Off Purchase",
                  description: "10% discount on your entire purchase",
                  points: 500,
                  tier: "silver",
                },
                {
                  title: "Free Lunch Set",
                  description: "Complete lunch set with drink",
                  points: 800,
                  tier: "gold",
                },
                {
                  title: "VIP Experience",
                  description: "Special VIP treatment and perks",
                  points: 1500,
                  tier: "platinum",
                },
              ].map((reward, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{reward.title}</CardTitle>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(reward.tier)}`}
                      >
                        {reward.tier.charAt(0).toUpperCase() +
                          reward.tier.slice(1)}
                        +
                      </span>
                    </div>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Gift className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-bold">
                          {reward.points} points
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Customer Details Tab */}
          {selectedCustomer && (
            <TabsContent value="customer-details" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveTab("customers")}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {selectedCustomer.name}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      alert(`Edit customer: ${selectedCustomer.name}`)
                    }
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    onClick={() => handleAddPoints(selectedCustomer.id, 10)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Points
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Contact
                        </h3>
                        <p>{selectedCustomer.phone}</p>
                        <p>{selectedCustomer.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Member Since
                        </h3>
                        <p>{selectedCustomer.joinDate}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Last Visit
                        </h3>
                        <p>{selectedCustomer.lastVisit}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Loyalty Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Current Tier
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(selectedCustomer.tier)}`}
                        >
                          {selectedCustomer.tier.charAt(0).toUpperCase() +
                            selectedCustomer.tier.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Points Balance
                        </h3>
                        <span className="font-bold">
                          {selectedCustomer.points}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Total Spent
                        </h3>
                        <span>${selectedCustomer.totalSpent.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Visit Count
                        </h3>
                        <span>{selectedCustomer.visits} visits</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions
                        .filter(
                          (transaction) =>
                            transaction.customerId === selectedCustomer.id,
                        )
                        .slice(0, 3)
                        .map((transaction) => (
                          <div
                            key={transaction.id}
                            className="border-b pb-3 last:border-0 last:pb-0"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">
                                  ${transaction.amount.toFixed(2)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {transaction.date}
                                </div>
                              </div>
                              <div className="text-sm text-green-600">
                                +{transaction.pointsEarned} pts
                              </div>
                            </div>
                            <div className="text-xs mt-1">
                              {transaction.items.join(", ")}
                            </div>
                          </div>
                        ))}
                      {transactions.filter(
                        (transaction) =>
                          transaction.customerId === selectedCustomer.id,
                      ).length === 0 && (
                        <div className="text-center text-muted-foreground py-4">
                          No recent transactions
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>Available Rewards</CardTitle>
                      <CardDescription>
                        Rewards this customer can redeem with their current
                        points
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Gift className="mr-2 h-4 w-4" /> Redeem Points
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Free Coffee",
                          description: "Redeem a free coffee of any size",
                          points: 100,
                          available: selectedCustomer.points >= 100,
                        },
                        {
                          title: "$5 Off Purchase",
                          description: "$5 discount on any purchase",
                          points: 200,
                          available: selectedCustomer.points >= 200,
                        },
                        {
                          title: "Free Sandwich",
                          description: "Complimentary sandwich of your choice",
                          points: 350,
                          available: selectedCustomer.points >= 350,
                        },
                      ].map((reward, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0"
                        >
                          <div>
                            <div className="font-medium">{reward.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {reward.points} points
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={!reward.available}
                          >
                            {reward.available ? "Redeem" : "Not Enough Points"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Add Customer Dialog */}
      <Dialog
        open={showAddCustomerDialog}
        onOpenChange={setShowAddCustomerDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter customer details to register them in the loyalty program.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input id="phone" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tier" className="text-right">
                Tier
              </Label>
              <Select defaultValue="bronze">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddCustomerDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert("Customer added!");
                setShowAddCustomerDialog(false);
              }}
            >
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoyaltyProgram;
