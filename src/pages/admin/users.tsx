import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login, logout, clearError } from "@/redux/slices/authSlice";
import apiClient from "@/api/client/axios";
import { toast } from "@/components/ui/use-toast";

interface PreRegisteredUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  instagram_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

const AdminUsers = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error: authError } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<PreRegisteredUser[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result.user.role !== "admin") {
        setError("شما دسترسی به این بخش را ندارید");
        dispatch(logout());
      }
    } catch (error) {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/pre-register");
      const data = response.data.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching pre-registered users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch pre-registered users",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  const downloadCSV = () => {
    const headers = ["نام", "ایمیل", "تلفن", "آیدی اینستاگرام", "وضعیت", "تاریخ ثبت نام"];
    const csvContent = [
      headers.join(","),
      ...users.map(user => [
        user.full_name,
        user.email,
        user.phone,
        user.instagram_id,
        user.status,
        user.created_at
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `pre_registered_users_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">ورود به پنل مدیریت</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>
            {(error || authError) && (
              <p className="text-red-500 text-sm">{error || authError}</p>
            )}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "در حال ورود..." : "ورود"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">مدیریت پیش ثبت نام‌ها</h1>
          <div className="space-x-4">
            <Button onClick={downloadCSV}>دانلود CSV</Button>
            <Button variant="outline" onClick={handleLogout}>خروج</Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4">نام</th>
                  <th className="text-right py-3 px-4">ایمیل</th>
                  <th className="text-right py-3 px-4">تلفن</th>
                  <th className="text-right py-3 px-4">آیدی اینستاگرام</th>
                  <th className="text-right py-3 px-4">وضعیت</th>
                  <th className="text-right py-3 px-4">تاریخ ثبت نام</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{user.full_name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.phone}</td>
                    <td className="py-3 px-4">{user.instagram_id}</td>
                    <td className="py-3 px-4">{user.status}</td>
                    <td className="py-3 px-4">{user.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminUsers; 