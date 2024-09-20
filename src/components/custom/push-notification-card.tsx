import { BellRing, Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "../ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function PushNotificationCard({ className, ...props }: CardProps) {
  return (
    <Collapsible>
      <Card
        className={cn("", className)}
        {...props}
      >
        <CardHeader>
          <div className="flex justify-center gap-2 sm:justify-between">
            <CardTitle className="sm:text-start text-2xl">
              Notifications
            </CardTitle>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 p-0"
              >
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          {notifications?.length ? (
            <CardDescription>You have 3 unread messages.</CardDescription>
          ) : null}
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="grid gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4  p-4">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Send notifications to device.
                </p>
              </div>
              <Switch />
            </div>
            <div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {notifications?.length ? <Separator /> : null}
          </CardContent>
          <CardFooter>
            {notifications?.length ? (
              <Button className="w-full">
                <Check className="mr-2 h-4 w-4" /> Mark all as read
              </Button>
            ) : null}
          </CardFooter>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
