import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export function PaymentChart() {
  // Mock data for the chart
  const chartData = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 30 },
    { month: "Apr", value: 60 },
    { month: "May", value: 35 },
    { month: "Jun", value: 80 },
    { month: "Jul", value: 25 },
    { month: "Aug", value: 70 },
    { month: "Sep", value: 40 },
    { month: "Oct", value: 85 },
    { month: "Nov", value: 55 },
    { month: "Dec", value: 75 },
  ]

  const maxValue = Math.max(...chartData.map((d) => d.value))

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-foreground">Payment Record</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div
                  className="bg-primary rounded-t-sm w-full transition-all hover:bg-primary/80"
                  style={{
                    height: `${(data.value / maxValue) * 200}px`,
                    minHeight: "8px",
                  }}
                />
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Pending</div>
              <div className="text-lg font-semibold text-foreground">$5,466</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Completed</div>
              <div className="text-lg font-semibold text-foreground">$9,275</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Rejected</div>
              <div className="text-lg font-semibold text-foreground">$3,968</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Received</div>
              <div className="text-lg font-semibold text-foreground">$50,668</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
