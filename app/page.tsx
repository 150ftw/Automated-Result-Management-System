import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, CheckCircle, Star, Settings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <Link href="/" className="text-xl font-bold">
              AcademiQ
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/benefits" className="text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </Link>
            <Link href="/testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </Link>
            <Link href="/developers" className="text-muted-foreground hover:text-foreground transition-colors">
              Developers
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Result Management for Your Institution
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    AcademiQ is a cloud-powered automated result management system designed to simplify result
                    processing, enabling teachers to upload and publish student results seamlessly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline" className="w-full">
                      Request Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 relative">
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full blur-[100px] opacity-20"></div>
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K2z4auIBPlTNxWq3kRQGV5qfQ44AkB.png"
                    alt="AcademiQ Logo"
                    className="relative z-10 w-[400px] h-[400px] object-contain dark:invert"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Discover AcademiQ</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our comprehensive solution for academic result management
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
              <Link href="/features">
                <Card className="bg-card hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-2">Features</CardTitle>
                    <CardDescription>Powerful tools for result management</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Discover the comprehensive suite of features designed to streamline your academic workflows.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/benefits">
                <Card className="bg-card hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-2">Benefits</CardTitle>
                    <CardDescription>Why institutions choose us</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Learn how AcademiQ transforms result management with time savings, accuracy, and security.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/testimonials">
                <Card className="bg-card hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-2">Testimonials</CardTitle>
                    <CardDescription>What our users say</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Read success stories from educational institutions that have transformed with AcademiQ.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/developers">
                <Card className="bg-card hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-2">Developers</CardTitle>
                    <CardDescription>Meet our team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Get to know the talented team behind AcademiQ's development and innovation.</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex flex-col gap-2 md:gap-4 md:flex-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              <span className="text-xl font-bold">AcademiQ</span>
            </div>
            <p className="text-sm text-muted-foreground md:max-w-xs">
              Streamlining academic result management for educational institutions worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:flex-1">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/benefits" className="text-muted-foreground hover:text-foreground transition-colors">
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/developers" className="text-muted-foreground hover:text-foreground transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 AcademiQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
