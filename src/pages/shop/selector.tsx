import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setShop } from "@/redux/slices/authSlice";
import { ShopInfo } from "@/api/services/authService";
import shopService, { UserShop } from "@/api/services/shopService";

const ShopSelector = () => {
  const [shops, setShops] = useState<UserShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, shop } = useAppSelector(state => state.auth);

  // If user already has a shop selected, redirect to dashboard
  useEffect(() => {
    if (shop) {
      navigate('/dashboard');
    }
  }, [shop, navigate]);

  // Fetch user's shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        setIsLoading(true);
        const userShops = await shopService.getUserShops();
        setShops(userShops);
      } catch (err: any) {
        setError(err.response?.data?.message || 'خطا در دریافت فروشگاه‌ها');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, []);

  // Handle shop selection
  const handleSelectShop = async (selectedShop: UserShop) => {
    try {
      // Set shop as active in backend
      await shopService.setActiveShop(selectedShop.id);
      
      // Update frontend state
      const shopInfo: ShopInfo = {
        id: selectedShop.id,
        name: selectedShop.name
      };
      
      dispatch(setShop(shopInfo));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در انتخاب فروشگاه');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="pt-6 text-center">
            <p>در حال بارگذاری فروشگاه‌ها...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">انتخاب فروشگاه</CardTitle>
          <CardDescription>
            لطفاً فروشگاهی که می‌خواهید با آن کار کنید را انتخاب نمایید
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {shops.length === 0 ? (
            <div className="text-center p-4 border rounded-md">
              <p>شما دسترسی به هیچ فروشگاهی ندارید</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {shops.map((shop) => (
                <Button
                  key={shop.id}
                  variant="outline"
                  className="w-full h-auto p-4 flex items-center justify-start gap-3"
                  onClick={() => handleSelectShop(shop)}
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    <Store className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-start">
                    <p className="font-medium">{shop.name}</p>
                    <p className="text-xs text-muted-foreground">
                      نقش: {shop.role === 'OWNER' ? 'مالک' : 'کاربر'}
                    </p>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => navigate('/auth/login')}
          >
            بازگشت به صفحه ورود
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShopSelector; 