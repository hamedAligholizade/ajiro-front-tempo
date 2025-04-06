import React, { useState, useEffect } from "react";
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
import { Upload, X, ImagePlus, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import productService, { CreateProductData } from "@/api/services/productService";
import { formatImageUrl } from '../../utils/imageUtils';

interface Category {
  id: string;
  name: string;
}

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (product: any) => void;
  categories: Category[];
}

const AddProductModal = ({
  open,
  onOpenChange,
  onAddProduct,
  categories,
}: AddProductModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  
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

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

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
    setImagePreview("");
    // Free memory used by object URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Create a new product object
      const productData: CreateProductData = {
        name: formData.name,
        sku: formData.sku,
        category_id: formData.category,
        description: formData.description,
        purchase_price: parseFloat(formData.cost),
        selling_price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stockLevel),
        reorder_level: parseInt(formData.reorderPoint),
        is_active: true,
        is_taxable: true,
        location: formData.location
      };
      
      // Create product in API
      const newProduct = await productService.createProduct(productData);
      
      // Upload image if one was selected
      let imageUrl = '';
      if (imageFile) {
        setIsUploading(true);
        try {
          imageUrl = await productService.uploadProductImage(newProduct.id, imageFile);
          newProduct.image_url = imageUrl;
        } catch (error) {
          console.error('Error uploading image:', error);
          toast({
            title: "خطا در آپلود تصویر",
            description: "محصول ایجاد شد اما آپلود تصویر با مشکل مواجه شد",
            variant: "destructive",
          });
        } finally {
          setIsUploading(false);
        }
      }
      
      // Find the category name for display purposes
      const categoryName = categories.find(cat => cat.id === formData.category)?.name || "Uncategorized";
      
      // Add the new product to the UI
      onAddProduct({
        ...newProduct,
        id: newProduct.id,
        category: categoryName,
        price: parseFloat(formData.price),
        cost: parseFloat(formData.cost),
        stockLevel: parseInt(formData.stockLevel),
        reorderPoint: parseInt(formData.reorderPoint),
        supplier: formData.supplier,
        location: formData.location,
        lastRestocked: new Date().toLocaleDateString('fa-IR'),
        status:
          parseInt(formData.stockLevel) <= parseInt(formData.reorderPoint)
            ? "low-stock"
            : parseInt(formData.stockLevel) === 0
              ? "out-of-stock"
              : "in-stock",
        imageUrl: imageUrl || newProduct.image_url,
        description: formData.description
      });
      
      toast({
        title: "محصول جدید اضافه شد",
        description: `${formData.name} با موفقیت به انبار اضافه شد`,
      });
      
      // Close modal and reset form
      onOpenChange(false);
      resetForm();
      
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: "خطا در ایجاد محصول",
        description: "مشکلی در ثبت محصول جدید به وجود آمد",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
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
    clearImage();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>افزودن محصول جدید</DialogTitle>
            <DialogDescription>
              اطلاعات محصول جدید را وارد کنید.
            </DialogDescription>
          </DialogHeader>
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
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-category" disabled>
                        دسته‌بندی موجود نیست
                      </SelectItem>
                    )}
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
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {isUploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                          <Loader2 className="h-8 w-8 text-white animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center">
                    <ImagePlus className="h-16 w-16 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4">
                      فایل تصویر را آپلود کنید (حداکثر 5MB)
                    </p>
                    <Label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-primary text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-primary/90"
                    >
                      <Upload className="h-4 w-4" />
                      انتخاب فایل
                    </Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={isUploading}
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
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
              disabled={isSubmitting || isUploading}
            >
              انصراف
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading}>
              {isSubmitting || isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploading ? "در حال آپلود تصویر..." : "در حال ثبت..."}
                </>
              ) : (
                "افزودن محصول"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
