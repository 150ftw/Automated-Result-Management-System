import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star, Info } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function TestimonialsPage() {
  return (
    <PageLayout
      title="Sample Testimonials"
      description="Examples of how educators might experience AcademiQ's result management process"
    >
      <section className="w-full py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <Alert className="mb-8 bg-muted/50 border border-muted">
            <Info className="h-4 w-4" />
            <AlertDescription>
              The testimonials below are samples to illustrate potential user experiences with AcademiQ. They are
              fictional and for demonstration purposes only.
            </AlertDescription>
          </Alert>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="italic mb-4">
                  "Before implementing AcademiQ, our result processing was a nightmare that consumed weeks of faculty
                  time and was prone to errors. The transformation has been remarkable - we now complete the entire
                  process in just days with near-perfect accuracy."
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">SJ</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Dr. Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">Sample Principal</p>
                    <p className="text-xs text-muted-foreground">Sample Testimonial</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="italic mb-4">
                  "As a department head, I was initially skeptical about adopting yet another software solution.
                  However, AcademiQ has exceeded all expectations. The system's intuitive interface made adoption
                  seamless even for our less tech-savvy faculty members."
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">RK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Prof. Rajesh Kumar</h4>
                    <p className="text-sm text-muted-foreground">Sample Department Head</p>
                    <p className="text-xs text-muted-foreground">Sample Testimonial</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="italic mb-4">
                  "Coordinating result publication across multiple departments was a logistical nightmare before
                  AcademiQ. The platform's collaborative features have streamlined our workflow tremendously. The
                  approval system ensures proper verification at each level."
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">PP</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Ms. Priya Patel</h4>
                    <p className="text-sm text-muted-foreground">Sample Academic Coordinator</p>
                    <p className="text-xs text-muted-foreground">Sample Testimonial</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
