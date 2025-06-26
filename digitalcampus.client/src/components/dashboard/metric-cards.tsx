import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  trend?: "up" | "down"
  trendValue?: string
  icon?: React.ReactNode
}

function MetricCard({ title, value, subtitle, trend, trendValue, icon }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">{subtitle}</span>
            {trend && trendValue && (
              <div
                className={`flex items-center space-x-1 ${trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-xs font-medium">{trendValue}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Invoice Awaiting Payment"
        value="45/76"
        subtitle="Invoice Awaiting"
        trend="up"
        trendValue="$2,456 (12%)"
      />
      <MetricCard
        title="Converted Leads"
        value="48/86"
        subtitle="Converted Leads"
        trend="up"
        trendValue="$2 Completed (10%)"
      />
      <MetricCard
        title="Projects In Progress"
        value="16/20"
        subtitle="Projects In Progress"
        trend="up"
        trendValue="16 Completed (10%)"
      />
      <MetricCard
        title="Conversion Rate"
        value="46.59%"
        subtitle="Conversion Rate"
        trend="up"
        trendValue="$2,456 (12%)"
      />
    </div>
  )
}
