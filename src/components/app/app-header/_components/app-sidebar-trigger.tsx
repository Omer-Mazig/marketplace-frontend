import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AppSidebarTrigger() {
  const { state } = useSidebar();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger className="mr-1" />
        </TooltipTrigger>
        <TooltipContent>
          {state === "expanded" ? "Close sidebar" : "Open sidebar"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
