import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ActivityItem {
  id: string
  title: string
  subtitle: string
  amount: string
  projects: string
  avatar: string
  color: string
}

const activities: ActivityItem[] = [
  {
    id: "1",
    title: "Shopify eCommerce Store",
    subtitle: "eCommerce",
    amount: "$1000",
    projects: "8 Projects",
    avatar: "S",
    color: "bg-green-500",
  },
  {
    id: "2",
    title: "iOS App Development",
    subtitle: "Mobile App",
    amount: "$1850",
    projects: "12 Projects",
    avatar: "A",
    color: "bg-blue-500",
  },
  {
    id: "3",
    title: "Figma Dashboard Design",
    subtitle: "UI/UX Design",
    amount: "$1250",
    projects: "8 Projects",
    avatar: "F",
    color: "bg-purple-500",
  },
]

export function ActivityList() {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground">Recent Activity</CardTitle>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">FULL DETAILS</button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className={`${activity.color} text-white font-medium`}>{activity.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{activity.amount}</p>
              <p className="text-xs text-muted-foreground">{activity.projects}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
