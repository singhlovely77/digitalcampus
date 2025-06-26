"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Clock, Users, Repeat, Filter } from "lucide-react"
import { RecurrenceModal } from "./recurrence-modal"
import { cn } from "@/lib/utils"

interface ScheduleItem {
  id: string
  title: string
  type: string
  startDate: string
  endDate: string
  time: string
  recurrence: string
  assignees: number
  status: "scheduled" | "completed" | "cancelled"
}

const initialSchedules: ScheduleItem[] = [
  {
    id: "1",
    title: "Team Meeting",
    type: "Meeting",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    time: "09:00 - 10:00",
    recurrence: "Weekly on Monday, Wednesday, Friday",
    assignees: 8,
    status: "scheduled",
  },
  {
    id: "2",
    title: "Project Review",
    type: "Review",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    time: "14:00 - 15:30",
    recurrence: "Weekly on Tuesday, Thursday",
    assignees: 5,
    status: "scheduled",
  },
  {
    id: "3",
    title: "Client Call",
    type: "Meeting",
    startDate: "2025-06-05",
    endDate: "2025-06-05",
    time: "11:00 - 12:00",
    recurrence: "One-time",
    assignees: 3,
    status: "scheduled",
  },
  {
    id: "4",
    title: "System Maintenance",
    type: "Maintenance",
    startDate: "2025-06-15",
    endDate: "2025-06-15",
    time: "22:00 - 23:00",
    recurrence: "One-time",
    assignees: 2,
    status: "scheduled",
  },
  {
    id: "5",
    title: "Daily Standup",
    type: "Meeting",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    time: "08:30 - 08:45",
    recurrence: "Daily (Mon-Fri)",
    assignees: 12,
    status: "scheduled",
  },
]

export function SchedulerView() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(initialSchedules)
  const [isRecurrenceModalOpen, setIsRecurrenceModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const handleAddSchedule = () => {
    setIsRecurrenceModalOpen(true)
  }

  const handleRecurrenceSave = (recurrenceData: any) => {
    // In a real app, we would create a new schedule with this data
    console.log("Recurrence data:", recurrenceData)
    setIsRecurrenceModalOpen(false)
  }

  const filterSchedules = (filter: string | null) => {
    setActiveFilter(filter === activeFilter ? null : filter)
  }

  const filteredSchedules = activeFilter ? schedules.filter((schedule) => schedule.type === activeFilter) : schedules

  const scheduleTypes = Array.from(new Set(schedules.map((schedule) => schedule.type)))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Schedule List */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl font-bold">Scheduled Items</CardTitle>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={handleAddSchedule}>
                <Plus className="w-4 h-4 mr-2" />
                Add Schedule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 min-w-0 mb-2 md:mb-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-foreground">{schedule.title}</h3>
                      <Badge variant="outline">{schedule.type}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {new Date(schedule.startDate).toLocaleDateString()} -{" "}
                          {new Date(schedule.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{schedule.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Repeat className="w-4 h-4 mr-1" />
                        <span>{schedule.recurrence}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{schedule.assignees} assignees</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={cn(
                        schedule.status === "scheduled" && "bg-blue-500 hover:bg-blue-600",
                        schedule.status === "completed" && "bg-green-500 hover:bg-green-600",
                        schedule.status === "cancelled" && "bg-red-500 hover:bg-red-600",
                      )}
                    >
                      {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Schedule Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Schedules</span>
              <Badge variant="secondary">{schedules.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Meetings</span>
              <Badge variant="secondary">{schedules.filter((s) => s.type === "Meeting").length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Reviews</span>
              <Badge variant="secondary">{schedules.filter((s) => s.type === "Review").length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Maintenance</span>
              <Badge variant="outline">{schedules.filter((s) => s.type === "Maintenance").length}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Today</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-sm font-medium">Daily Standup</p>
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">08:30 - 08:45</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Users className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">12 assignees</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-sm font-medium">Team Meeting</p>
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">09:00 - 10:00</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Users className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">8 assignees</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recurrence Modal */}
      <RecurrenceModal
        isOpen={isRecurrenceModalOpen}
        onClose={() => setIsRecurrenceModalOpen(false)}
        onSave={handleRecurrenceSave}
      />
    </div>
  )
}