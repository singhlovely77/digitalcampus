"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, CalendarIcon, Clock } from "lucide-react"
import { cn } from "../../lib/utils"

interface RecurrenceModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
}

export function RecurrenceModal({ isOpen, onClose, onSave }: RecurrenceModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [recurrenceType, setRecurrenceType] = useState<"daily" | "weekly" | "monthly">("weekly")
  const [frequency, setFrequency] = useState(1)
  const [selectedDays, setSelectedDays] = useState({
    sunday: false,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
  })
  const [startDate, setStartDate] = useState("2025-05-01")
  const [endDate, setEndDate] = useState("2025-05-31")
  const [isNew, setIsNew] = useState(false)

  const handleDayToggle = (day: keyof typeof selectedDays) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }))
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSave()
    }
  }

  const handleSave = () => {
    const recurrenceData = {
      type: recurrenceType,
      frequency,
      selectedDays,
      startDate,
      endDate,
      isNew,
    }
    onSave(recurrenceData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] p-0 overflow-hidden">
        <DialogHeader className="bg-muted px-6 py-4 border-b">
          <DialogTitle className="text-lg">Schedule - Dates</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          {/* Progress Indicator */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
            <div className="flex justify-between relative">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background z-10",
                  currentStep >= 1 ? "border-primary text-primary" : "border-gray-300 text-gray-400",
                )}
              >
                <User className="w-5 h-5" />
              </div>
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background z-10",
                  currentStep >= 2 ? "border-primary text-primary bg-primary/10" : "border-gray-300 text-gray-400",
                )}
              >
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background z-10",
                  currentStep >= 3 ? "border-primary text-primary" : "border-gray-300 text-gray-400",
                )}
              >
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Step 2 Content - Recurrence Pattern */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium mb-4">Select the Recurrence Pattern</h3>
              <RadioGroup
                value={recurrenceType}
                onValueChange={(value) => setRecurrenceType(value as "daily" | "weekly" | "monthly")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
              </RadioGroup>
            </div>

            {recurrenceType === "weekly" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label>Every</Label>
                  <div className="w-16">
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      value={frequency}
                      onChange={(e) => setFrequency(Number.parseInt(e.target.value) || 1)}
                      className="text-center"
                    />
                  </div>
                  <Label>week(s) on:</Label>
                </div>

                <div className="grid grid-cols-7 grid-cols-sm-12 gap-2">
                  {Object.entries(selectedDays).map(([day, isSelected]) => (
                    <div key={day} className="flex flex-col items-center">
                      <div
                        className={cn(
                          "flex items-center justify-center w-full h-10 rounded border",
                          isSelected ? "bg-primary/20 border-primary" : "bg-background border-input",
                        )}
                      >
                        <Checkbox
                          id={day}
                          checked={isSelected}
                          onCheckedChange={() => handleDayToggle(day as keyof typeof selectedDays)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <Label htmlFor={day} className="ml-2 cursor-pointer">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label>Initial and end date</Label>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>&nbsp;</Label>
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select the shift</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning Shift (8AM - 4PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon Shift (2PM - 10PM)</SelectItem>
                      <SelectItem value="night">Night Shift (10PM - 6AM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="new" checked={isNew} onCheckedChange={() => setIsNew(!isNew)} />
                  <Label htmlFor="new">New</Label>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <div>
              <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1}>
                Prev
              </Button>
              <Button variant="outline" onClick={handleNext} className="ml-2">
                Next
              </Button>
            </div>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
