
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  trend,
  trendLabel,
  icon,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
          </div>
          {icon && <div className="text-otis-500">{icon}</div>}
        </div>
        
        {typeof trend !== 'undefined' && (
          <div className="mt-4">
            <div className="flex items-center gap-1">
              {trend > 0 ? (
                <span className="text-green-500 flex items-center gap-0.5 text-sm font-medium">
                  <ArrowUpIcon className="h-3 w-3" />
                  {trend}%
                </span>
              ) : trend < 0 ? (
                <span className="text-red-500 flex items-center gap-0.5 text-sm font-medium">
                  <ArrowDownIcon className="h-3 w-3" />
                  {Math.abs(trend)}%
                </span>
              ) : (
                <span className="text-yellow-500 flex items-center gap-0.5 text-sm font-medium">
                  {trend}%
                </span>
              )}
              {trendLabel && (
                <span className="text-xs text-muted-foreground">
                  {trendLabel}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
