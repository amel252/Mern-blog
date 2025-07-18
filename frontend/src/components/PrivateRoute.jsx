import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
    // Outlet is the children of PrivateRoute which is Dashboard
    const {currentUser} = useSelector((state) => state.user);

    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />
}