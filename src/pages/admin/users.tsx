import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  plan: string;
}

const AdminUsers = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchUsers();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded credentials
    if (username === "admin" && password === "ajiro2024") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      fetchUsers();
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
    navigate("/");
  };

  const downloadCSV = () => {
    const headers = ["نام", "ایمیل", "تلفن", "تاریخ ثبت نام", "طرح"];
    const csvContent = [
      headers.join(","),
      ...users.map(user => [
        user.name,
        user.email,
        user.phone,
        user.createdAt,
        user.plan
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `users_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">ورود به پنل مدیریت</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام کاربری</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">ورود</Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">مدیریت کاربران</h1>
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
                  <th className="text-right py-3 px-4">تاریخ ثبت نام</th>
                  <th className="text-right py-3 px-4">طرح</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.phone}</td>
                    <td className="py-3 px-4">{user.createdAt}</td>
                    <td className="py-3 px-4">{user.plan}</td>
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