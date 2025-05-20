import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle, Database, Users, FileText, Settings } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export default function BenefitsPage() {
  return (
    <PageLayout
      title="Why Choose AcademiQ?"
      description="Experience transformative advantages that modernize your entire result management workflow"
    >
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Dramatic Time Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Reduce result processing time by up to 75%</li>
                  <li>Automate grade calculations and report generation</li>
                  <li>Process thousands of results simultaneously</li>
                  <li>Eliminate manual data entry and verification steps</li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm italic">
                    "AcademiQ reduced our result processing time from 3 weeks to just 2 days."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Unmatched Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Eliminate human calculation errors completely</li>
                  <li>Multi-level validation and verification systems</li>
                  <li>Consistent application of grading policies</li>
                  <li>Automated error detection and correction</li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm italic">"Result errors have decreased by 99.8% since implementing AcademiQ."</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Database className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Bulletproof Security</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li>End-to-end encryption for all sensitive data</li>
                  <li>Granular permission controls for all user types</li>
                  <li>Comprehensive audit trails for all activities</li>
                  <li>Automated backups with point-in-time recovery</li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm italic">
                    "The security features exceed our university's strict compliance requirements."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Seamless Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Unified platform for all stakeholders</li>
                  <li>Real-time updates and change tracking</li>
                  <li>Structured approval workflows</li>
                  <li>Integrated communication tools</li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm italic">
                    "Coordination between departments has never been easier or more efficient."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Insightful Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Customizable report templates for all needs</li>
                  <li>Comparative analysis across years and cohorts</li>
                  <li>Performance prediction and trend analysis</li>
                  <li>One-click generation of official transcripts</li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm italic">
                    "The analytics have transformed how we approach curriculum development."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Settings className="h-6 w-6 text-primary" />
                <CardTitle className="mt-2">Unlimited Scalability</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Handles from 100 to 100,000+ students</li>
                  <li>Cloud infrastructure that grows with you</li>
                  <li>No performance degradation at scale</li>
                  <li>Flexible pricing based on actual usage</li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm italic">
                    "We've tripled our student body without any impact on system performance."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
