import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
    const currentUser = useSelector((state) => state.user.currentUser);

    if (currentUser && currentUser.isAdmin) {
        return <Outlet />;
    } else {
        return <Navigate to="/sign-in" />;
    }
}
