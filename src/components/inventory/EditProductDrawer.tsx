import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { Upload, X, ImagePlus, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import productService, { Product } from "@/api/services/productService";

interface EditProductDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
  onUpdateProduct: (updatedProduct: any) => void;
}

const EditProductDrawer = ({
  open,
  onOpenChange,
  product,
  onUpdateProduct,
}: EditProductDrawerProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    cost: "",
    stockLevel: "",
    reorderPoint: "",
    supplier: "",
    location: "",
    description: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        sku: product.sku || "",
        category: product.category || "",
        price: product.price?.toString() || "",
        cost: product.cost?.toString() || "",
        stockLevel: product.stockLevel?.toString() || "",
        reorderPoint: product.reorderPoint?.toString() || "",
        supplier: product.supplier || "",
        location: product.location || "",
        description: product.description || "",
        imageUrl: product.imageUrl || "",
      });

      // Set image preview if product has an image
      if (product.imageUrl) {
        setImagePreview(product.imageUrl);
      } else {
        setImagePreview("");
      }
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "فایل بیش از حد بزرگ است",
          description: "حداکثر اندازه فایل 5 مگابایت است",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "فرمت فایل نامعتبر است",
          description: "فقط فرمت‌های JPEG، PNG، GIF و WebP پشتیبانی می‌شوند",
          variant: "destructive",
        });
        return;
      }
      
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    
    // Only clear preview if it's a blob URL, not a server URL
    if (imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview("");
    }
    
    // If we're keeping the server URL but want to indicate removal
    if (formData.imageUrl) {
      setFormData(prev => ({ ...prev, imageUrl: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Create a product object for update
      const productData = {
        name: formData.name,
        sku: formData.sku,
        category_id: formData.category,
        description: formData.description,
        purchase_price: parseFloat(formData.cost),
        selling_price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stockLevel),
        reorder_level: parseInt(formData.reorderPoint),
        supplier: formData.supplier,
        location: formData.location
      };
      
      // Update product in API
      const updatedProduct = await productService.updateProduct(product.id, productData);
      
      // Upload image if a new one was selected
      if (imageFile) {
        setIsUploading(true);
        try {
          const imageUrl = await productService.uploadProductImage(product.id, imageFile);
          updatedProduct.image_url = imageUrl;
        } catch (error) {
          console.error('Error uploading image:', error);
          toast({
            title: "خطا در آپلود تصویر",
            description: "محصول به‌روزرسانی شد اما آپلود تصویر با مشکل مواجه شد",
            variant: "destructive",
          });
        } finally {
          setIsUploading(false);
        }
      }
      
      // Update the product in the UI
      onUpdateProduct({
        ...updatedProduct,
        id: product.id,
        category: formData.category,
        price: parseFloat(formData.price),
        cost: parseFloat(formData.cost),
        stockLevel: parseInt(formData.stockLevel),
        reorderPoint: parseInt(formData.reorderPoint),
        status:
          parseInt(formData.stockLevel) <= parseInt(formData.reorderPoint)
            ? "low-stock"
            : parseInt(formData.stockLevel) === 0
              ? "out-of-stock"
              : "in-stock",
        imageUrl: updatedProduct.image_url || formData.imageUrl,
      });
      
      toast({
        title: "محصول به‌روزرسانی شد",
        description: `${formData.name} با موفقیت به‌روزرسانی شد`,
      });
      
      // Close drawer
      onOpenChange(false);
      
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "خطا در به‌روزرسانی محصول",
        description: "مشکلی در به‌روزرسانی محصول به وجود آمد",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>ویرایش محصول</SheetTitle>
            <SheetDescription>
              اطلاعات محصول را ویرایش کنید.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">نام محصول</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">کد محصول (SKU)</Label>
                <Input
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">دسته‌بندی</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beverages">نوشیدنی‌ها</SelectItem>
                    <SelectItem value="Food">غذاها</SelectItem>
                    <SelectItem value="Merchandise">کالاها</SelectItem>
                    <SelectItem value="Equipment">تجهیزات</SelectItem>
                    <SelectItem value="Stationery">لوازم التحریر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">تأمین‌کننده</Label>
                <Input
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">قیمت فروش (تومان)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">قیمت خرید (تومان)</Label>
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.cost}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stockLevel">موجودی فعلی</Label>
                <Input
                  id="stockLevel"
                  name="stockLevel"
                  type="number"
                  min="0"
                  value={formData.stockLevel}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reorderPoint">نقطه سفارش مجدد</Label>
                <Input
                  id="reorderPoint"
                  name="reorderPoint"
                  type="number"
                  min="0"
                  value={formData.reorderPoint}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">محل نگهداری</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>تصویر محصول</Label>
              <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center">
                {imagePreview ? (
                  <div className="relative w-full">
                    <div className="w-full aspect-square max-w-[200px] mx-auto relative">
                      <img
                        src={imagePreview}
                        alt="پیش‌نمایش محصول"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150?text=بدون+تصویر";
                        }}
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center">
                    <ImagePlus className="h-16 w-16 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4">
                      فایل تصویر را آپلود کنید (حداکثر 5MB)
                    </p>
                    <Label
                      htmlFor="image-upload-edit"
                      className="cursor-pointer bg-primary text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-primary/90"
                    >
                      <Upload className="h-4 w-4" />
                      انتخاب فایل
                    </Label>
                    <Input
                      id="image-upload-edit"
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">توضیحات</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="توضیحات محصول را وارد کنید..."
                rows={3}
              />
            </div>
          </div>
          <SheetFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              انصراف
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  در حال ذخیره...
                </>
              ) : (
                "ذخیره تغییرات"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditProductDrawer; 