
import { Badge, BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CustomBadgeProps = BadgeProps & {
  variant?: "default" | "destructive" | "outline" | "secondary" | "success";
};

export function CustomBadge({ 
  variant = "default", 
  className, 
  ...props 
}: CustomBadgeProps) {
  // Map 'success' to a combination of 'secondary' and green text/bg classes
  const isSuccess = variant === "success";
  
  return (
    <Badge
      variant={isSuccess ? "secondary" : variant as BadgeProps["variant"]}
      className={cn(
        isSuccess && "bg-green-100 text-green-800 hover:bg-green-200",
        className
      )}
      {...props}
    />
  );
}
