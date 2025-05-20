import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Settings, BarChart3, Bell, Shield, Download } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export default function FeaturesPage() {
  return (
    <PageLayout
      title="Key Features"
      description="Comprehensive tools designed to revolutionize academic result management"
    >
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Upload className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Intelligent Result Upload</CardTitle>
                <CardDescription>Smart data processing system</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our AI-powered system automatically processes result data from various formats including Excel, CSV,
                  and handwritten scans. The intelligent validation engine identifies and flags potential errors before
                  they affect your records.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Settings className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Advanced Grading System</CardTitle>
                <CardDescription>Flexible assessment framework</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Support for multiple grading schemes including percentage, GPA, CGPA, and custom evaluation metrics.
                  Create institution-specific grading policies with automatic grade calculation and customizable
                  performance indicators.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Comprehensive Analytics</CardTitle>
                <CardDescription>Data-driven insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Transform raw scores into actionable insights with our advanced analytics engine. Track performance
                  trends, identify learning gaps, and generate visual reports for students, classes, subjects, and
                  departments with comparative historical data.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Bell className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Multi-channel Notifications</CardTitle>
                <CardDescription>Real-time communication</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Keep all stakeholders informed with customizable notifications via email, SMS, and in-app alerts.
                  Schedule automated result announcements, send performance milestones to parents, and notify
                  administrators of pending approvals.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Enterprise-grade Security</CardTitle>
                <CardDescription>Comprehensive data protection</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Protect sensitive academic data with military-grade encryption, role-based access controls, and
                  detailed audit logs. Our system complies with educational data protection standards and includes
                  automated backup protocols.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Download className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Customizable Reports</CardTitle>
                <CardDescription>Professional documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Generate beautiful, branded report cards and transcripts with our template engine. Export results in
                  multiple formats including PDF, Excel, and printable documents with institutional branding, digital
                  signatures, and verification QR codes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
