import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: "auto" | "full" | "half";
  showHandle?: boolean;
}

function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  height = "auto",
  showHandle = true,
}: BottomSheetProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle escape key press to close sheet
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent scrolling of the main content when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Animate in on mount and out on unmount
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  if (!isOpen && !isAnimating) return null;

  // Calculate height class based on prop
  const heightClass = 
    height === "full" 
      ? "h-[90vh]" 
      : height === "half" 
        ? "h-[50vh]" 
        : "max-h-[80vh]";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Sheet container */}
      <div 
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-xl shadow-lg transform transition-transform duration-300 ease-in-out",
          heightClass,
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        onTransitionEnd={handleAnimationEnd}
      >
        {/* Handle */}
        {showHandle && (
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-12 h-1.5 rounded-full bg-gray-300" />
          </div>
        )}

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-lg font-medium">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto overflow-x-hidden h-full pt-2 px-4 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export { BottomSheet }; 