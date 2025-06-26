import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Book, HelpCircle, ExternalLink } from "lucide-react"

export function DocumentationTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Learn the basics of our platform and get up and running quickly with our step-by-step guide.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                <span>Installation Guide</span>
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                <span>Basic Configuration</span>
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                <span>First Steps Tutorial</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Book className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>API Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Comprehensive documentation for our API endpoints, parameters, and response formats.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                <span>Authentication</span>
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                <span>Endpoints Overview</span>
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                <span>Rate Limiting</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Find answers to commonly asked questions about our platform, features, and services.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                <span>Account Management</span>
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                <span>Billing Questions</span>
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                <span>Technical Support</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Documentation Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "New API Endpoints Added",
                date: "June 5, 2025",
                description: "We've added new endpoints for analytics and reporting.",
              },
              {
                title: "Updated Authentication Flow",
                date: "May 28, 2025",
                description: "Learn about our improved OAuth2 implementation.",
              },
              {
                title: "Webhook Integration Guide",
                date: "May 15, 2025",
                description: "Step-by-step guide for setting up webhooks.",
              },
              {
                title: "Performance Optimization Tips",
                date: "May 3, 2025",
                description: "Best practices for optimizing your integration.",
              },
            ].map((update, i) => (
              <div key={i} className="flex items-start">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{update.title}</div>
                    <div className="text-xs text-muted-foreground">{update.date}</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{update.description}</p>
                  <div className="mt-2">
                    <a href="#" className="text-xs text-primary flex items-center">
                      Read more <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
