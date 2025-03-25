import React from "react";
import ModuleCard from "./ModuleCard";
import { useNavigate } from "react-router-dom";
import { t } from "@/lib/i18n";
import {
  BarChart2,
  MessageSquare,
  Settings,
  ShoppingCart,
  Users,
  Send,
  Package, // For inventory
  ClipboardList, // For orders
} from "lucide-react";

interface ModuleCardsProps {
  modules?: {
    title: string;
    description: string;
    icon: React.ReactNode;
    stats: {
      label: string;
      value: string;
    }[];
    onClick?: () => void;
    path?: string;
  }[];
}

const ModuleCards = ({ modules }: ModuleCardsProps) => {
  const navigate = useNavigate();

  const defaultModules = [
    {
      title: t("common.salesCounter"),
      description: "Manage your sales transactions and checkout process",
      icon: <ShoppingCart className="h-6 w-6" />,
      stats: [
        { label: "Today", value: "$1,234" },
        { label: "This Week", value: "$7,890" },
      ],
      path: "/sales-counter",
      onClick: () => navigate("/sales-counter"),
    },
    {
      title: t("common.reports"),
      description:
        "View analytics and insights about your business performance",
      icon: <BarChart2 className="h-6 w-6" />,
      stats: [
        { label: "Revenue", value: "$12,345" },
        { label: "Growth", value: "+15%" },
      ],
      path: "/reports",
      onClick: () => navigate("/reports"),
    },
    {
      title: t("common.customers"),
      description: "Manage and analyze customer data with RFM segmentation",
      icon: <Users className="h-6 w-6" />,
      stats: [
        { label: "Total", value: "1,234" },
        { label: "New", value: "24" },
      ],
      path: "/customers",
      onClick: () => navigate("/customers"),
    },
    {
      title: t("common.campaigns"),
      description: "Create and manage SMS marketing campaigns",
      icon: <Send className="h-6 w-6" />,
      stats: [
        { label: "Active", value: "3" },
        { label: "Scheduled", value: "2" },
      ],
      path: "/campaigns",
      onClick: () => navigate("/campaigns"),
    },
    {
      title: t("common.customerFeedback"),
      description: "Collect and analyze customer feedback and reviews",
      icon: <MessageSquare className="h-6 w-6" />,
      stats: [
        { label: "New", value: "24" },
        { label: "Rating", value: "4.8/5" },
      ],
      path: "/customer-feedback",
      onClick: () => navigate("/customer-feedback"),
    },
    {
      title: t("common.loyaltyProgram"),
      description: "Manage customer loyalty and rewards programs",
      icon: <Users className="h-6 w-6" />,
      stats: [
        { label: "Members", value: "1,234" },
        { label: "Active", value: "78%" },
      ],
      path: "/loyalty-program",
      onClick: () => navigate("/loyalty-program"),
    },
    {
      title: t("common.inventory"),
      description: t("common.inventoryDescription"),
      icon: <Package className="h-6 w-6" />,
      stats: [
        { label: "Products", value: "523" },
        { label: "Low Stock", value: "12" },
      ],
      path: "/inventory-management",
      onClick: () => navigate("/inventory-management"),
    },
    {
      title: t("common.orders"),
      description: t("common.ordersDescription"),
      icon: <ClipboardList className="h-6 w-6" />,
      stats: [
        { label: "Pending", value: "18" },
        { label: "Today", value: "35" },
      ],
      path: "/order-management",
      onClick: () => navigate("/order-management"),
    },
  ];

  const displayModules = modules || defaultModules;

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-background p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">{t("dashboard.modules")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayModules.map((module, index) => (
          <ModuleCard
            key={index}
            title={module.title}
            description={module.description}
            icon={module.icon}
            stats={module.stats}
            onClick={module.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleCards;
