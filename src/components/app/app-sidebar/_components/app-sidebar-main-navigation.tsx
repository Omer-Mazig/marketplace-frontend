import { Link } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Inbox, Info, Package } from "lucide-react";

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
        url: "team",
        icon: Info,
      },
      {
        title: "Vision",
        url: "vision",
        icon: Info,
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
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
