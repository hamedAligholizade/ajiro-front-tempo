import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import { t } from "@/lib/i18n";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const StatCard = ({
  title = "Stat",
  value = "0",
  change = 0,
  icon = <DollarSign />,
}: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-full bg-primary/10">{icon}</div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
        </div>
        <div
          className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          <span className="text-sm font-medium">
            {isPositive ? "+" : ""}
            {change}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

interface QuickStatsProps {
  stats?: {
    todaySales: string;
    todaySalesChange: number;
    activeCustomers: string;
    activeCustomersChange: number;
    totalOrders: string;
    totalOrdersChange: number;
    revenue: string;
    revenueChange: number;
  };
}

const QuickStats = ({
  stats = {
    todaySales: "$1,234",
    todaySalesChange: 12.5,
    activeCustomers: "156",
    activeCustomersChange: 8.2,
    totalOrders: "48",
    totalOrdersChange: -3.1,
    revenue: "$5,678",
    revenueChange: 15.3,
  },
}: QuickStatsProps) => {
  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t("dashboard.quickStats.todaySales")}
          value={stats.todaySales}
          change={stats.todaySalesChange}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title={t("dashboard.quickStats.totalCustomers")}
          value={stats.activeCustomers}
          change={stats.activeCustomersChange}
          icon={<Users className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title={t("dashboard.quickStats.activeOrders")}
          value={stats.totalOrders}
          change={stats.totalOrdersChange}
          icon={<ShoppingCart className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title={t("dashboard.quickStats.revenue")}
          value={stats.revenue}
          change={stats.revenueChange}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
        />
      </div>
    </div>
  );
};

export default QuickStats;
