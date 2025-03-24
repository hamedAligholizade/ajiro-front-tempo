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
import { t } from "@/lib/i18n";
import {
  Send,
  Plus,
  Calendar,
  Users,
  MessageSquare,
  Edit,
  Trash2,
  Eye,
  Download,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: "active" | "scheduled" | "draft" | "completed";
  audience: string;
  sent: number;
  opened: number;
  redeemed: number;
  createdAt: string;
  scheduledFor?: string;
}

const Campaigns = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );

  // Sample campaigns data
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "تخفیف تابستانی",
      description: "۲۰٪ تخفیف روی نوشیدنی‌های سرد",
      status: "active",
      audience: "همه مشتریان",
      sent: 245,
      opened: 187,
      redeemed: 56,
      createdAt: "2023-06-01",
    },
    {
      id: "2",
      name: "هدیه تولد",
      description: "دسر رایگان به مناسبت تولد شما",
      status: "active",
      audience: "همه سطوح",
      sent: 42,
      opened: 38,
      redeemed: 31,
      createdAt: "2023-05-15",
    },
    {
      id: "3",
      name: "ویژه اعضای طلایی",
      description: "امتیاز دو برابر در آخر هفته",
      status: "scheduled",
      audience: "سطوح طلایی و پلاتینیوم",
      sent: 0,
      opened: 0,
      redeemed: 0,
      createdAt: "2023-09-08",
      scheduledFor: "2023-09-15",
    },
    {
      id: "4",
      name: "کمپین بازگشت مشتری",
      description: "دلمان برایت تنگ شده! برای پیشنهاد ویژه بازگردید",
      status: "draft",
      audience: "مشتریان غیرفعال",
      sent: 0,
      opened: 0,
      redeemed: 0,
      createdAt: "2023-09-10",
    },
    {
      id: "5",
      name: "معرفی محصول جدید",
      description: "اولین نفری باشید که محصول جدید ما را امتحان می‌کند",
      status: "completed",
      audience: "مشتریان وفادار",
      sent: 150,
      opened: 130,
      redeemed: 85,
      createdAt: "2023-04-20",
    },
  ];

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

  const getStatusName = (status: string) => {
    return t(`campaigns.${status}`);
  };

  const filteredCampaigns =
    activeTab === "all"
      ? campaigns
      : campaigns.filter((campaign) => campaign.status === activeTab);

  const handleCreateCampaign = () => {
    setShowCreateDialog(true);
  };

  const handleSaveCampaign = () => {
    alert("Campaign saved!");
    setShowCreateDialog(false);
  };

  const handleViewCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    alert(`Editing campaign: ${campaign.name}`);
  };

  const handleDeleteCampaign = (campaign: Campaign) => {
    alert(`Deleting campaign: ${campaign.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{t("campaigns.title")}</h1>
          <p className="text-muted-foreground">{t("campaigns.subtitle")}</p>
        </header>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t("campaigns.title")}</h2>
          <Button onClick={handleCreateCampaign}>
            <Plus className="mr-2 h-4 w-4" /> {t("campaigns.createCampaign")}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            <TabsTrigger value="all">{t("common.campaigns")}</TabsTrigger>
            <TabsTrigger value="active">{t("campaigns.active")}</TabsTrigger>
            <TabsTrigger value="scheduled">
              {t("campaigns.scheduled")}
            </TabsTrigger>
            <TabsTrigger value="draft">{t("campaigns.draft")}</TabsTrigger>
            <TabsTrigger value="completed">
              {t("campaigns.completed")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCampaigns.map((campaign) => (
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
                        {getStatusName(campaign.status)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {t("campaigns.targetAudience")}:
                        </span>
                        <span>{campaign.audience}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{campaign.createdAt}</span>
                      </div>
                      {campaign.scheduledFor && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {t("campaigns.schedule")}:
                          </span>
                          <span>{campaign.scheduledFor}</span>
                        </div>
                      )}
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
                      onClick={() => handleEditCampaign(campaign)}
                    >
                      <Edit className="mr-2 h-4 w-4" /> {t("campaigns.edit")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewCampaign(campaign)}
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
        </Tabs>

        {/* Create Campaign Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{t("campaigns.createCampaign")}</DialogTitle>
              <DialogDescription>
                Create a new SMS campaign to engage with your customers.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Campaign Name
                </label>
                <Input id="name" placeholder="Enter campaign name" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Enter campaign description"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="audience" className="text-sm font-medium">
                  {t("campaigns.targetAudience")}
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="loyal">Loyal Customers</SelectItem>
                    <SelectItem value="inactive">Inactive Customers</SelectItem>
                    <SelectItem value="new">New Customers</SelectItem>
                    <SelectItem value="gold">Gold & Platinum Tier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t("campaigns.message")}
                </label>
                <Textarea
                  id="message"
                  placeholder="Enter SMS message"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  160 characters maximum for standard SMS.
                </p>
              </div>
              <div className="grid gap-2">
                <label htmlFor="schedule" className="text-sm font-medium">
                  {t("campaigns.schedule")}
                </label>
                <div className="flex gap-2">
                  <Select defaultValue="now">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send Immediately</SelectItem>
                      <SelectItem value="schedule">
                        Schedule for Later
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="datetime-local" className="flex-1" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveCampaign}>
                <Send className="mr-2 h-4 w-4" /> {t("campaigns.send")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Campaigns;
