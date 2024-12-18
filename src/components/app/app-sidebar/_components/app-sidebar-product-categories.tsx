import { Link } from "react-router-dom";

// interfaces | types | enums
import { ProductCategory } from "@/enums/product-category.enum";

import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebarProductCategories() {
  const { state } = useSidebar();

  // TODO: return fropdown that render th category list outside the collapsed sidebar
  if (state === "collapsed") return null;

  return (
    <Collapsible
      defaultOpen
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Categories
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.values(ProductCategory).map((category) => (
                <SidebarMenuItem key={category}>
                  <SidebarMenuButton asChild>
                    <Link to={`products/category/${category.toLowerCase()}`}>
                      <span>{category}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
