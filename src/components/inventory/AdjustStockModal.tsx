import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdjustStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
  onAdjustStock: (
    productId: string,
    newStockLevel: number,
    reason: string,
  ) => void;
}

const AdjustStockModal = ({
  open,
  onOpenChange,
  product,
  onAdjustStock,
}: AdjustStockModalProps) => {
  const [adjustmentType, setAdjustmentType] = useState("add");
  const [quantity, setQuantity] = useState("1");
  const [reason, setReason] = useState("");

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) return;

    const newStockLevel =
      adjustmentType === "add"
        ? product.stockLevel + quantityNum
        : Math.max(0, product.stockLevel - quantityNum);

    onAdjustStock(product.id, newStockLevel, reason);
    onOpenChange(false);

    // Reset form
    setAdjustmentType("add");
    setQuantity("1");
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>تنظیم موجودی</DialogTitle>
            <DialogDescription>
              تنظیم موجودی برای {product.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label>موجودی فعلی</Label>
                <div className="text-2xl font-bold mt-1">
                  {product.stockLevel}
                </div>
              </div>
              <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-4xl font-bold">{product.stockLevel}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adjustmentType">نوع تنظیم</Label>
              <Select value={adjustmentType} onValueChange={setAdjustmentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">افزایش موجودی</SelectItem>
                  <SelectItem value="subtract">کاهش موجودی</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">تعداد</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">دلیل تغییر</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={
                  adjustmentType === "add"
                    ? "مثال: خرید جدید، بازگشت کالا"
                    : "مثال: فروش، خرابی، هدیه"
                }
                rows={3}
              />
            </div>

            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex justify-between items-center">
                <span>موجودی جدید:</span>
                <span className="font-bold">
                  {adjustmentType === "add"
                    ? product.stockLevel + (parseInt(quantity) || 0)
                    : Math.max(
                        0,
                        product.stockLevel - (parseInt(quantity) || 0),
                      )}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              انصراف
            </Button>
            <Button type="submit">
              {adjustmentType === "add" ? "افزایش موجودی" : "کاهش موجودی"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdjustStockModal;
