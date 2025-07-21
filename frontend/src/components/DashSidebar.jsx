import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {
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
                    onClick={() => alert("Déconnexion")}
                >
                    Déconnexion
                </SidebarItem>
            </SidebarItemGroup>
        </Sidebar>
    );
}
