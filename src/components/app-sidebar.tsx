import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/icons/Logo";
import { Link, useLocation } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const location = useLocation()
  const {data: userData} = useUserInfoQuery(undefined)
  const role = userData?.data?.user?.role
  // console.log(userData?.data?.user?.role)
  
  const data = {
    navMain: getSidebarItems(role)
  }


  return (
    <Sidebar {...props}>
      <SidebarHeader className="items-center">
        <Link to="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-2xl mb-4 mx-auto">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild  className="hover:bg-pink-500 hover:text-white">
                      <Link to={item.url}
                      className={
                        location.pathname ===item.url ? 
                        "bg-pink-500 text-white rounded-md px-3 py-2 transition hover:bg-pink-600"
                        : 
                        "hover:bg-pink-100 rounded-md px-3 py-2 transition"
                      }
                      >{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}