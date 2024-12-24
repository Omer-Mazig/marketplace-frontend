"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

async function getNotifications() {
  const { data } = await api.get("/notifications");
  return data as Notification[];
}

export function NotificationsButton() {
  const { data: notifications, isLoading } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  if (isLoading) return <div>loading...</div>;

  const unreadCount = notifications?.filter((n) => !n.read).length || 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative"
        >
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications Dropdown</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96"
      >
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications && notifications.length > 0 ? (
          notifications.map((n: Notification) => (
            <DropdownMenuItem
              key={n.id}
              className={`py-2 px-4 ${!n.read ? "bg-gray-100" : ""}`}
            >
              {n.message}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="focus:bg-transparent py-4">
            You have no notifications
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
