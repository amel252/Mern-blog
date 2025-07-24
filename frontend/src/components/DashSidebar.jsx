import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashProfile from "./DashProfile";
import {
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function DashSidebar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [tab, setTab] = useState("profile");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        } else {
            setTab("profile");
        }
    }, [location.search]);
    // déconnexion
    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch("./api/auth/signout");
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess(data.message));
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
    };
    return (
        <Sidebar className="w-full md:w-56">
            <SidebarItemGroup>
                <SidebarItem
                    as={Link}
                    to="/dashboard?tab=profile"
                    icon={HiUser}
                    label="Utilisateur"
                    labelColor="dark"
                    active={tab === "profile"}
                >
                    Profile
                </SidebarItem>

                <SidebarItem
                    icon={HiArrowSmRight}
                    className="cursor-pointer"
                    onClick={handleSignOut}
                >
                    Déconnexion
                </SidebarItem>
            </SidebarItemGroup>
        </Sidebar>
    );
}
