"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

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

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
  onAddEvent: (event: Omit<Event, "id">) => void
  selectedDate?: Date
}

const eventTypes = [
  { value: "meeting", label: "Meeting", color: "bg-blue-500" },
  { value: "task", label: "Task", color: "bg-orange-500" },
  { value: "reminder", label: "Reminder", color: "bg-yellow-500" },
  { value: "personal", label: "Personal", color: "bg-pink-500" },
]

const durations = [
  { value: "15min", label: "15 minutes" },
  { value: "30min", label: "30 minutes" },
  { value: "45min", label: "45 minutes" },
  { value: "1h", label: "1 hour" },
  { value: "1h30min", label: "1.5 hours" },
  { value: "2h", label: "2 hours" },
  { value: "3h", label: "3 hours" },
  { value: "4h", label: "4 hours" },
  { value: "all-day", label: "All day" },
]

export function AddEventModal({ isOpen, onClose, onAddEvent, selectedDate }: AddEventModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: selectedDate ? selectedDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    time: "09:00",
    duration: "1h",
    type: "meeting" as const,
    location: "",
    attendees: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    if (!formData.date) {
      newErrors.date = "Date is required"
    }
    if (!formData.time) {
      newErrors.time = "Time is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const eventType = eventTypes.find((type) => type.value === formData.type)

      const newEvent: Omit<Event, "id"> = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        type: formData.type,
        location: formData.location || undefined,
        attendees: formData.attendees ? Number.parseInt(formData.attendees) : undefined,
        color: eventType?.color || "bg-blue-500",
      }

      onAddEvent(newEvent)
      handleClose()
    }
  }

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      time: "09:00",
      duration: "1h",
      type: "meeting",
      location: "",
      attendees: "",
    })
    setErrors({})
    onClose()
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>Create a new event for your calendar. Fill in the details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter event description (optional)"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              rows={3}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateFormData("date", e.target.value)}
                  className={`pl-10 ${errors.date ? "border-red-500" : ""}`}
                />
              </div>
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => updateFormData("time", e.target.value)}
                  className={`pl-10 ${errors.time ? "border-red-500" : ""}`}
                />
              </div>
              {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
            </div>
          </div>

          {/* Duration and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={formData.duration} onValueChange={(value) => updateFormData("duration", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${type.color}`} />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="location"
                placeholder="Enter location (optional)"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Attendees */}
          <div className="space-y-2">
            <Label htmlFor="attendees">Number of Attendees</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="attendees"
                type="number"
                placeholder="Enter number of attendees (optional)"
                value={formData.attendees}
                onChange={(e) => updateFormData("attendees", e.target.value)}
                className="pl-10"
                min="1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
