import { Navigate, Outlet } from "react-router-dom";

interface IProtectedRouteProps {
  admin: boolean;
  redirectPath?: string;
}

export const ProtectedRoute = ({
  admin,
  redirectPath = "/",
}: IProtectedRouteProps) => {
  if (!admin) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
