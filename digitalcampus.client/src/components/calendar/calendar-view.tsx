"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from "lucide-react"
import { cn } from "../../lib/utils"
import { AddEventModal } from "./add-event-modal"

interface Event {
  id: string
  title: string
  description?: string
  date: string
  time: string
  duration: string
  type: "meeting" | "task" | "reminder" | "personal"
  location?: string
  attendees?: number
  color: string
}

interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  events: Event[]
}

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Team Standup",
    description: "Daily team sync meeting",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    duration: "30min",
    type: "meeting",
    location: "Conference Room A",
    attendees: 8,
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Product Review",
    description: "Review latest product features",
    date: new Date().toISOString().split("T")[0],
    time: "14:00",
    duration: "1h",
    type: "meeting",
    location: "Virtual",
    attendees: 12,
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Client Presentation",
    description: "Present project progress to client",
    date: new Date().toISOString().split("T")[0],
    time: "16:00",
    duration: "45min",
    type: "meeting",
    location: "Client Office",
    attendees: 5,
    color: "bg-purple-500",
  },
]

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [selectedDateForEvent, setSelectedDateForEvent] = useState<Date | undefined>()

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Generate calendar days
  const generateCalendarDays = (): CalendarDay[] => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const daysInMonth = lastDayOfMonth.getDate()

    const days: CalendarDay[] = []

    // Previous month days
    const prevMonth = new Date(currentYear, currentMonth - 1, 0)
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
        events: [],
      })
    }

    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const isToday =
        date === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()

      // Filter events for this specific date
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.date)
        return (
          eventDate.getDate() === date &&
          eventDate.getMonth() === currentMonth &&
          eventDate.getFullYear() === currentYear
        )
      })

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        events: dayEvents,
      })
    }

    // Next month days
    const remainingDays = 42 - days.length
    for (let date = 1; date <= remainingDays; date++) {
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        events: [],
      })
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleAddEvent = (newEventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...newEventData,
      id: Date.now().toString(), // Simple ID generation
    }
    setEvents((prev) => [...prev, newEvent])
  }

  const handleAddEventClick = () => {
    setSelectedDateForEvent(new Date(currentYear, currentMonth, selectedDate || today.getDate()))
    setIsAddEventModalOpen(true)
  }

  const handleDayClick = (day: CalendarDay) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.date)
    }
  }

  const calendarDays = generateCalendarDays()
  const selectedDayEvents = selectedDate
    ? calendarDays.find((day) => day.date === selectedDate && day.isCurrentMonth)?.events || []
    : []

  // Get today's events for the sidebar
  const todaysEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getDate() === today.getDate() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    )
  })

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-4">
                <CardTitle className="text-2xl font-bold">
                  {monthNames[currentMonth]} {currentYear}
                </CardTitle>
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {(["month", "week", "day"] as const).map((viewType) => (
                    <Button
                      key={viewType}
                      variant={view === viewType ? "default" : "outline"}
                      size="sm"
                      onClick={() => setView(viewType)}
                      className="capitalize"
                    >
                      {viewType}
                    </Button>
                  ))}
                </div>
                <Button size="sm" className="ml-2" onClick={handleAddEventClick}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={cn(
                      "min-h-[100px] p-2 border border-border rounded-lg cursor-pointer transition-colors hover:bg-accent/50",
                      !day.isCurrentMonth && "opacity-40",
                      day.isToday && "bg-primary/10 border-primary",
                      selectedDate === day.date && day.isCurrentMonth && "bg-accent",
                    )}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className={cn("text-sm font-medium mb-1", day.isToday && "text-primary font-bold")}>
                      {day.date}
                    </div>

                    {/* Events */}
                    <div className="space-y-1">
                      {day.events.slice(0, 2).map((event) => (
                        <div key={event.id} className={cn("text-xs p-1 rounded text-white truncate", event.color)}>
                          {event.time} {event.title}
                        </div>
                      ))}
                      {day.events.length > 2 && (
                        <div className="text-xs text-muted-foreground">+{day.events.length - 2} more</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaysEvents.length > 0 ? (
                todaysEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg bg-accent/50">
                    <div className={cn("w-3 h-3 rounded-full mt-1", event.color)} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {event.time} ({event.duration})
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground truncate">{event.location}</span>
                        </div>
                      )}
                      {event.attendees && (
                        <div className="flex items-center space-x-2 mt-1">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{event.attendees} attendees</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No events today</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Events</span>
                <Badge variant="secondary">{events.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Meetings</span>
                <Badge variant="secondary">{events.filter((e) => e.type === "meeting").length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tasks</span>
                <Badge variant="secondary">{events.filter((e) => e.type === "task").length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Personal</span>
                <Badge variant="outline">{events.filter((e) => e.type === "personal").length}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Event Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm">Meetings</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-sm">Tasks</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm">Reminders</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <span className="text-sm">Personal</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDateForEvent}
      />
    </>
  )
}
