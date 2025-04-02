import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { register, clearError } from "@/redux/slices/authSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);

  // Clear any errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    if (!shopName.trim()) {
      setValidationError("نام فروشگاه الزامی است");
      return false;
    }

    if (password !== confirmPassword) {
      setValidationError("رمز عبور و تکرار آن مطابقت ندارند");
      return false;
    }

    if (password.length < 8) {
      setValidationError("رمز عبور باید حداقل 8 کاراکتر باشد");
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Dispatch register action
    dispatch(register({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone,
      shop_name: shopName,
      // Role is no longer needed - backend will set it to 'manager'
    })).then((result) => {
      if (register.fulfilled.match(result)) {
        // Registration successful, redirect to login
        navigate("/auth/login");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">ثبت نام در آجیرو</CardTitle>
          <CardDescription>حساب کاربری جدید ایجاد کنید</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            {(error || validationError) && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                {validationError || error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="shopName">نام فروشگاه</Label>
              <Input
                id="shopName"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
                disabled={isLoading}
                placeholder="نام فروشگاه خود را وارد کنید"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">نام</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">نام خانوادگی</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">شماره تلفن (اختیاری)</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="text-sm text-center mt-4">
              قبلاً ثبت نام کرده‌اید؟{" "}
              <Link to="/auth/login" className="text-primary hover:underline">
                وارد شوید
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register; 