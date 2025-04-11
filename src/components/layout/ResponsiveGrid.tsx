import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  className?: string;
  itemMinWidth?: string;
}

/**
 * A responsive grid component that supports both CSS Grid and Flexbox layouts
 * Automatically switches between grid and list view based on screen size
 */
const ResponsiveGrid = ({
  children,
  columns = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  },
  gap = "4",
  className = "",
  itemMinWidth = "250px",
}: ResponsiveGridProps) => {
  // Create grid-template-columns CSS for different breakpoints
  const gridTemplateColumns = `repeat(auto-fill, minmax(${itemMinWidth}, 1fr))`;
  
  // CSS Grid approach with responsive columns
  const gridClasses = cn(
    "grid gap-4",
    {
      [`grid-cols-1 sm:grid-cols-${columns.sm}`]: columns.sm,
      [`md:grid-cols-${columns.md}`]: columns.md,
      [`lg:grid-cols-${columns.lg}`]: columns.lg,
      [`xl:grid-cols-${columns.xl}`]: columns.xl,
      [`gap-${gap}`]: gap,
    },
    className
  );

  return (
    <div 
      className={gridClasses}
      style={{ gridTemplateColumns }}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid; 