import { useUpgradePlanDialog } from "@/providers/upgrade-plan-dialog-provider";
import { TextWarning } from "./text-warning";

export function ProductLimitMessage() {
  const { openDialog } = useUpgradePlanDialog();

  function openUpgradePlanDialog() {
    openDialog();
  }

  return (
    <TextWarning>
      You have reached the limit for adding products.{" "}
      <span
        onClick={openUpgradePlanDialog}
        className="cursor-pointer underline"
      >
        Click here to upgrade your plan.
      </span>
    </TextWarning>
  );
}
