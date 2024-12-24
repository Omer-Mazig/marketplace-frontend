import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

const nottifications = [
  { id: 1, label: "baba" },
  { id: 2, label: "baba" },
  { id: 3, label: "baba" },
  { id: 3, label: "baba" },
];

export function NotificationsButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className=" rounded-full"
        >
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Notifications Dropdown</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {nottifications.map((n) => {
          return <DropdownMenuItem key={n.id}>{n.label}</DropdownMenuItem>;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
