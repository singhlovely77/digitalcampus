"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SettingsTab } from "./settings-tab"
import { DocumentationTab } from "./documentation-tab"

export function TabsView() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="space-y-6">
      {/* Basic Tabs Example */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Tabs</h2>
        <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
          <TabsContent value="documentation">
            <DocumentationTab />
          </TabsContent>
        </Tabs>
      </Card>

    </div>
  )
}
