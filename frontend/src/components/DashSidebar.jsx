import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import {
    HiArrowSmRight,
    HiUser,
    HiDocumentText,
    HiAnnotation,
    HiChartPie,
} from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [tab, setTab] = useState("profile");
    const { currentUser } = useSelector((state) => state.user);

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
            const res = await fetch("/api/auth/signout");
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
                {currentUser.isAdmin && (
                    <SidebarItem
                        as={Link}
                        to="/dashboard?tab=dash"
                        active={tab === "dash" || !tab}
                        icon={HiChartPie}
                    >
                        Dashboard
                    </SidebarItem>
                )}
                <SidebarItem
                    as={Link}
                    to="/dashboard?tab=profile"
                    icon={HiUser}
                    label={currentUser.isAdmin ? "Admin" : "User"}
                    labelColor="dark"
                    active={tab === "profile"}
                >
                    Profile
                </SidebarItem>
                {currentUser.isAdmin && (
                    <SidebarItem
                        as={Link}
                        to="/dashboard?tab=posts"
                        active={tab === "posts"}
                        icon={HiDocumentText}
                    >
                        Articles
                    </SidebarItem>
                )}
                {currentUser.isAdmin && (
                    <SidebarItem
                        as={Link}
                        to="/dashboard?tab=users"
                        icon={HiUserGroup}
                        active={tab === "users"}
                    >
                        utilisateurs
                    </SidebarItem>
                )}
                {currentUser.isAdmin && (
                    <SidebarItem
                        as={Link}
                        to="/dashboard?tab=comments"
                        icon={HiAnnotation}
                        active={tab === "comments"}
                    >
                        commentaires
                    </SidebarItem>
                )}
                <SidebarItem
                    icon={HiArrowSmRight}
                    className="cursor-pointer"
                    onClick={handleSignOut}
                    role="button"
                >
                    Déconnexion
                </SidebarItem>
            </SidebarItemGroup>
        </Sidebar>
    );
}
