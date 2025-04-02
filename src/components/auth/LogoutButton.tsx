import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton = ({ className }: LogoutButtonProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? "در حال خروج..." : "خروج"}
    </Button>
  );
};

export default LogoutButton; 