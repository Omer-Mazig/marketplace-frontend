import React from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface GenericItemRowProps {
  id: number;
  name: string;
  price: number;
  children: React.ReactNode;
}

export function GenericItemRow({
  id,
  name,
  price,
  children,
}: GenericItemRowProps) {
  return (
    <li className="text-center 3xs:text-start flex flex-col md:flex-row justify-between 3xs:items-start md:items-center border-b pb-2 group">
      <Link
        to={`/products/${id}`}
        className="mb-2 md:mb-0 hover:text-primary"
      >
        {name}
      </Link>
      <div className="flex flex-col 3xs:flex-row justify-center flex-wrap gap-2">
        {children}

        <Badge
          variant="secondary"
          className="justify-center"
        >
          ${price.toFixed(2)}
        </Badge>
      </div>
    </li>
  );
}
