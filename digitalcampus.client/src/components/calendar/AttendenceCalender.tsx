"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, User } from "lucide-react"
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
    status: "working" | "leave" | "weekend"
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

// Sample leave days (you can modify this based on your needs)
const leaveDays = [3, 8, 15, 22, 29] // Days that are marked as leave
const users = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}` }))

export function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<number | null>(null)
    const [view, setView] = useState<"month" | "week" | "day">("month")
    const [events, setEvents] = useState<Event[]>(initialEvents)
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
    const [selectedDateForEvent, setSelectedDateForEvent] = useState<Date | undefined>()
    const [selectedUser, setSelectedUser] = useState<number>(1)

    const today = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    // Function to determine day status
    const getDayStatus = (date: number, dayOfWeek: number): "working" | "leave" | "weekend" => {
        if (dayOfWeek === 0 || dayOfWeek === 6) return "weekend" // Sunday or Saturday
        if (leaveDays.includes(date)) return "leave"
        return "working"
    }

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
            const date = prevMonth.getDate() - i
            const dayOfWeek = new Date(currentYear, currentMonth - 1, date).getDay()
            days.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                events: [],
                status: getDayStatus(date, dayOfWeek),
            })
        }

        // Current month days
        for (let date = 1; date <= daysInMonth; date++) {
            const isToday =
                date === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()

            const dayOfWeek = new Date(currentYear, currentMonth, date).getDay()

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
                status: getDayStatus(date, dayOfWeek),
            })
        }

        // Next month days
        const remainingDays = 42 - days.length
        for (let date = 1; date <= remainingDays; date++) {
            const dayOfWeek = new Date(currentYear, currentMonth + 1, date).getDay()
            days.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                events: [],
                status: getDayStatus(date, dayOfWeek),
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

    const handleUserSelect = (userId: number) => {
        setSelectedUser(userId)
        // Here you would typically load the selected user's schedule
        console.log(`Selected user: ${userId}`)
    }

    const calendarDays = generateCalendarDays()

    const getStatusColor = (status: "working" | "leave" | "weekend") => {
        switch (status) {
            case "working":
                return "bg-green-900/30 border-green-700"
            case "leave":
                return "bg-red-900/30 border-red-700"
            case "weekend":
                return "bg-gray-800/50 border-gray-600"
            default:
                return ""
        }
    }

    const getStatusBadge = (status: "working" | "leave" | "weekend") => {
        switch (status) {
            case "working":
                return <Badge variant="secondary" className="text-xs bg-green-800 text-green-100 border-green-700">Working</Badge>
            case "leave":
                return <Badge variant="secondary" className="text-xs bg-red-800 text-red-100 border-red-700">Leave</Badge>
            case "weekend":
                return <Badge variant="outline" className="text-xs bg-gray-700 text-gray-200 border-gray-600">Weekend</Badge>
            default:
                return null
        }
    }

    return (
        <>
            <div className="min-h-screen bg-black text-white">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                    {/* Main Calendar */}
                    <div className="lg:col-span-3">
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-800">
                                <div className="flex items-center space-x-4">
                                    <CardTitle className="text-2xl font-bold text-white">
                                        {monthNames[currentMonth]} {currentYear}
                                    </CardTitle>
                                    <Badge variant="outline" className="flex items-center gap-2 bg-gray-800 text-gray-200 border-gray-700">
                                        <User className="w-3 h-3" />
                                        User {selectedUser}
                                    </Badge>
                                    <div className="flex items-center space-x-1">
                                        <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800 text-gray-200" onClick={() => navigateMonth("prev")}>
                                            <ChevronLeft className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800 text-gray-200" onClick={() => navigateMonth("next")}>
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
                                                className={cn(
                                                    "capitalize",
                                                    view === viewType
                                                        ? "bg-white text-black hover:bg-gray-200"
                                                        : "border-gray-700 hover:bg-gray-800 text-gray-200"
                                                )}
                                            >
                                                {viewType}
                                            </Button>
                                        ))}
                                    </div>
                                    <Button size="sm" className="ml-2 bg-white text-black hover:bg-gray-200" onClick={handleAddEventClick}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Event
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="bg-gray-900">
                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1 mb-4">
                                    {dayNames.map((day) => (
                                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-1">
                                    {calendarDays.map((day, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors hover:bg-gray-800/50",
                                                !day.isCurrentMonth && "opacity-40",
                                                day.isToday && "ring-2 ring-white",
                                                selectedDate === day.date && day.isCurrentMonth && "ring-2 ring-blue-400",
                                                day.isCurrentMonth && getStatusColor(day.status),
                                                "border-gray-700"
                                            )}
                                            onClick={() => handleDayClick(day)}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <div className={cn("text-sm font-medium text-gray-200", day.isToday && "text-white font-bold")}>
                                                    {day.date}
                                                </div>
                                                {day.isCurrentMonth && getStatusBadge(day.status)}
                                            </div>

                                            {/* Events */}
                                            <div className="space-y-1">
                                                {day.events.slice(0, 2).map((event) => (
                                                    <div key={event.id} className={cn("text-xs p-1 rounded text-white truncate", event.color)}>
                                                        {event.time} {event.title}
                                                    </div>
                                                ))}
                                                {day.events.length > 2 && (
                                                    <div className="text-xs text-gray-400">+{day.events.length - 2} more</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* User Selection Sidebar */}
                    <div className="space-y-4">
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader className="border-b border-gray-800">
                                <CardTitle className="text-lg text-white">Select User</CardTitle>
                            </CardHeader>
                            <CardContent className="bg-gray-900">
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {users.map((user) => (
                                        <Button
                                            key={user.id}
                                            variant={selectedUser === user.id ? "default" : "outline"}
                                            className={cn(
                                                "w-full justify-start",
                                                selectedUser === user.id
                                                    ? "bg-white text-black hover:bg-gray-200"
                                                    : "border-gray-700 hover:bg-gray-800 text-gray-200 bg-gray-900"
                                            )}
                                            onClick={() => handleUserSelect(user.id)}
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            User {user.id}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Legend */}
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader className="border-b border-gray-800">
                                <CardTitle className="text-lg text-white">Legend</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 bg-gray-900">
                                <div className="flex items-center space-x-3">
                                    <div className="w-4 h-4 rounded bg-green-900/30 border border-green-700" />
                                    <span className="text-sm text-gray-200">Working Day</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-4 h-4 rounded bg-red-900/30 border border-red-700" />
                                    <span className="text-sm text-gray-200">Leave Day</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-4 h-4 rounded bg-gray-800/50 border border-gray-600" />
                                    <span className="text-sm text-gray-200">Weekend</span>
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
            </div>
        </>
    )
}