import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart2,
  Users,
  ShoppingCart,
  MessageSquare,
  Settings,
} from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: {
    label: string;
    value: string;
  }[];
  onClick?: () => void;
}

const ModuleCard = ({
  title = "Sales Counter",
  description = "Manage your sales transactions and checkout process",
  icon = <ShoppingCart className="h-6 w-6" />,
  stats = [
    { label: "Today", value: "$1,234" },
    { label: "This Week", value: "$7,890" },
  ],
  onClick = () => console.log(`Navigating to ${title} module`),
}: ModuleCardProps) => {
  // Map module names to their respective icons
  const getModuleIcon = (title: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "Sales Counter": <ShoppingCart className="h-6 w-6" />,
      Reports: <BarChart2 className="h-6 w-6" />,
      "Customer Feedback": <MessageSquare className="h-6 w-6" />,
      "Loyalty Program": <Users className="h-6 w-6" />,
      Settings: <Settings className="h-6 w-6" />,
    };

    return iconMap[title] || icon;
  };

  return (
    <Card className="w-full max-w-[350px] h-[250px] flex flex-col bg-white overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {getModuleIcon(title)}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button onClick={onClick} className="w-full" variant="outline">
          Open {title}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
