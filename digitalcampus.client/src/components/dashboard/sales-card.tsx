import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function SalesCard() {
  // Mock data for the line chart
  const chartPoints = [
    { x: 10, y: 80 },
    { x: 30, y: 60 },
    { x: 50, y: 90 },
    { x: 70, y: 40 },
    { x: 90, y: 70 },
    { x: 110, y: 30 },
    { x: 130, y: 85 },
    { x: 150, y: 45 },
    { x: 170, y: 75 },
    { x: 190, y: 55 },
  ]

  // Create SVG path
  const pathData = chartPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold">30,569</div>
            <div className="text-primary-foreground/80 text-sm">Total Sales</div>
          </div>
          <TrendingUp className="w-6 h-6 text-primary-foreground/80" />
        </div>

        {/* Mini Chart */}
        <div className="h-20 relative">
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
            </defs>
            <path
              d={`${pathData} L 190 100 L 10 100 Z`}
              fill="url(#gradient)"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
            />
            <path d={pathData} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
