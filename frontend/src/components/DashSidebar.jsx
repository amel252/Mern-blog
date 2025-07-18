// import { Sidebar } from "flowbite-react"
// import {HiArrowSmRight, HiUser} from 'react-icons/hi'
// import { useEffect, useState } from "react"
// import {Link, useLocation} from 'react-router-dom'

// export default function DashSidebar () {
  
//      const location = useLocation();
//      const [tab, setTab] = useState()

//       useEffect(() => {
//          const urlParams = new URLSearchParams(location.search);
//          const tabFromUrl =  urlParams.get('tab');
//          if(tabFromUrl) {
//            setTab(tabFromUrl)
//          }
//        }, [location.search])
  
//     return (
//     <Sidebar className="w-full md:w-56">
//        <Sidebar.Item>
//             <Sidebar.ItemGroup>
//                 <Link to='/dashboard?tab=profile'>
//                    <Sidebar.Item
//                      active={tab === 'profile'}
//                      icon={HiUser}
//                      label={'User'}
//                      labelColor='dark'
//                    >
//                      Profile
//                    </Sidebar.Item>
//                    <Sidebar.Item
//                      icon={HiArrowSmRight}
//                      className='cursor-pointer'
//                    >
//                      Déconnexion
//                    </Sidebar.Item>

//                 </Link>
//             </Sidebar.ItemGroup>
//        </Sidebar.Item>
//     </Sidebar>
//   )
// }

import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItemGroup>
        <Link to="/dashboard?tab=profile">
          <SidebarItem
            icon={HiUser}
            label="User"
            labelColor="dark"
            active={tab === "profile"}
          >
            Profile
          </SidebarItem>
        </Link>
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


