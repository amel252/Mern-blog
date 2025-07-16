import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
    // outlet c'est l'enfant de PrivateRoute ce qui est Dashboard
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <Navigate to="/sign-In" />;
}
