import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LogoutButton from '@/components/auth/LogoutButton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TestAuth = () => {
  const { user, isAuthenticated, isLoading, error } = useAppSelector(state => state.auth);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">وضعیت احراز هویت</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p><strong>وضعیت:</strong> {isLoading ? 'در حال بارگذاری...' : isAuthenticated ? 'احراز هویت شده' : 'احراز هویت نشده'}</p>
            {error && <p className="text-red-500"><strong>خطا:</strong> {error}</p>}
            {isAuthenticated && user && (
              <div className="rounded bg-gray-50 p-4 mt-4">
                <h3 className="font-bold mb-2">اطلاعات کاربر:</h3>
                <p><strong>نام:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>ایمیل:</strong> {user.email}</p>
                <p><strong>نقش:</strong> {user.role}</p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-6">
            {isAuthenticated ? (
              <LogoutButton />
            ) : (
              <div className="space-x-2 space-x-reverse">
                <Button asChild>
                  <Link to="/auth/login">ورود</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/auth/register">ثبت نام</Link>
                </Button>
              </div>
            )}
            <Button variant="outline" asChild>
              <Link to="/dashboard">داشبورد</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestAuth; 