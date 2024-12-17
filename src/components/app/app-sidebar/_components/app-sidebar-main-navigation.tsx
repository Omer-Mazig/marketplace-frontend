import { Link } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Home, Inbox, Info, Package, Telescope, Users } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Contact",
    url: "contact",
    icon: Inbox,
  },
  {
    title: "About",
    url: "about",
    icon: Info,
    subItems: [
      {
        title: "Team",
        url: "/about/team",
        icon: Users,
      },
      {
        title: "Vision",
        url: "/about/vision",
        icon: Telescope,
      },
    ],
  },
  {
    title: "Products",
    url: "products",
    icon: Package,
  },
];

export function AppSidebarMainNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navgation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.subItems?.length &&
                item.subItems.map((subItem) => (
                  <SidebarMenuSub key={subItem.url}>
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link to={subItem.url}>
                          <subItem.icon />
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                ))}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
