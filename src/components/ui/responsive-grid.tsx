import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  viewMode: 'grid' | 'list';
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  className?: string;
}

function ResponsiveGrid<T>({
  items,
  renderItem,
  viewMode,
  columns = { sm: 2, md: 3, lg: 4 },
  className,
}: ResponsiveGridProps<T>) {
  if (viewMode === 'list') {
    return (
      <div className={cn("w-full", className)}>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">محصول</th>
                <th className="px-4 py-3">دسته‌بندی</th>
                <th className="px-4 py-3">قیمت</th>
                <th className="px-4 py-3">موجودی</th>
                <th className="px-4 py-3">وضعیت</th>
                <th className="px-4 py-3">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {renderItem(item)}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const gridCols = `grid grid-cols-1 sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} gap-4`;

  return (
    <div className={cn(gridCols, className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {renderItem(item)}
        </React.Fragment>
      ))}
    </div>
  );
}

export { ResponsiveGrid }; 