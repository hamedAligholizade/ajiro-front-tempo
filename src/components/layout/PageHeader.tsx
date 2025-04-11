import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  showBackButton?: boolean;
  onMenuClick?: () => void;
}

const PageHeader = ({
  title,
  breadcrumbs = [],
  actions,
  showBackButton = false,
  onMenuClick,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="mb-6">
      {/* Breadcrumbs or back button */}
      {(breadcrumbs.length > 0 || showBackButton) && (
        <div className="flex items-center mb-2">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground flex items-center mr-1"
            >
              <ChevronRight className="h-4 w-4 ml-1 rtl:rotate-180" />
              {t("common.back")}
            </Button>
          )}
          
          {/* Breadcrumbs */}
          {!showBackButton && breadcrumbs.length > 0 && (
            <nav className="flex">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <ChevronLeft className="h-4 w-4 mx-2 text-muted-foreground self-center rtl:rotate-180" />
                  )}
                  <div
                    className={`text-sm ${
                      index === breadcrumbs.length - 1
                        ? "font-medium"
                        : "text-muted-foreground hover:text-foreground cursor-pointer"
                    }`}
                    onClick={() => crumb.href && navigate(crumb.href)}
                  >
                    {crumb.label}
                  </div>
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>
      )}

      {/* Title and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="mr-2 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader; 