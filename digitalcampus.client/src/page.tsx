import { MetricCards } from "./components/dashboard/metric-cards"
import { PaymentChart } from "./components/dashboard/payment-chart"
import { SalesCard } from "./components/dashboard/sales-card"
import { ActivityList } from "./components/dashboard/activity-list"

export default function Dashboard() {
 return (
   <div className="space-y-6">
     {/* Metrics Row */}
     <MetricCards />

     {/* Main Content Grid */}
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       {/* Payment Chart - Takes 2 columns on large screens */}
       <div className="lg:col-span-2">
         <PaymentChart />
       </div>

       {/* Right Sidebar Content */}
       <div className="space-y-6">
         <SalesCard />
         <ActivityList />
       </div>
     </div>
   </div>
 )
}
