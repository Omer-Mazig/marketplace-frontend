import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export function EditProductButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="ghost"
            size="sm"
          >
            <Link to="/platform/products/edit-product">
              <Pencil className="w-5 h-5 text-gray-400" />
              <span className="sr-only">Edit product</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit product</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
