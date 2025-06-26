import { CalendarView } from "./AttendenceCalender"

export function Calendar() {
 return (
   <div className="space-y-6">
     <div className="flex items-center justify-between">
       <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
     </div>
     <CalendarView />
   </div>
 )
}


