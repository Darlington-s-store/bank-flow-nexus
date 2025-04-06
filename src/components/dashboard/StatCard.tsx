
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, change, className }: StatCardProps) => {
  return (
    <div className={cn("banking-stats-card", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <span className={cn(
            "text-sm font-medium",
            change.positive ? "text-banking-success" : "text-banking-danger"
          )}>
            {change.positive ? "+" : "-"}{change.value}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
