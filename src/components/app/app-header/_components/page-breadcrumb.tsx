import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBreadcrumpItems } from "@/providers/breadcrump-provider";

export function PageBreadcrumb() {
  const items = useBreadcrumpItems();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!items || items.length === 0) return null;

  const renderBreadcrumbItem = (
    item: { href?: string; label: string },
    isLast: boolean
  ) => (
    <BreadcrumbItem key={item.href || item.label}>
      {!isLast ? (
        <BreadcrumbLink
          asChild
          className="max-w-20 truncate md:max-w-none"
        >
          <Link to={item.href || "#"}>{item.label}</Link>
        </BreadcrumbLink>
      ) : (
        <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
          {item.label}
        </BreadcrumbPage>
      )}
      {!isLast && <BreadcrumbSeparator />}
    </BreadcrumbItem>
  );

  const renderDropdownOrDrawer = () => {
    const middleItems = items.slice(1, -2);
    if (middleItems.length === 0) return null;

    const content = (
      <>
        {middleItems.map((item, index) => (
          <Link
            key={index}
            to={item.href || "#"}
            className="block px-4 py-2 text-sm"
          >
            {item.label}
          </Link>
        ))}
      </>
    );

    if (isMobile) {
      return (
        <Drawer
          open={open}
          onOpenChange={setOpen}
        >
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Show more breadcrumbs"
            >
              <BreadcrumbEllipsis className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Navigate to</DrawerTitle>
              <DrawerDescription>
                Select a page to navigate to.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2">{content}</div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <DropdownMenu
        open={open}
        onOpenChange={setOpen}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Show more breadcrumbs"
          >
            <BreadcrumbEllipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {middleItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              asChild
            >
              <Link to={item.href || "#"}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <Breadcrumb className="flex items-center ml-1">
      <BreadcrumbList>
        {renderBreadcrumbItem(items[0], items.length === 1)}
        {items.length > 3 && (
          <>
            {renderDropdownOrDrawer()}
            <BreadcrumbSeparator />
          </>
        )}
        {items.length > 2 &&
          renderBreadcrumbItem(items[items.length - 2], false)}
        {items.length > 1 &&
          renderBreadcrumbItem(items[items.length - 1], true)}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
