import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Linkedin } from "lucide-react"
import Image from "next/image"

export default function DevelopersPage() {
  return (
    <PageLayout title="Meet Our Team" description="The brilliant minds behind AcademiQ's development and innovation">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-VlS4PSWBsfR7iNm4OXuyCItbITJ8Ur.png"
                  alt="Gaurav Mehra"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle>Gaurav Mehra</CardTitle>
                <CardDescription>Database Management & UI/UX</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="https://www.linkedin.com/in/gaurav-mehra-560479277/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn Profile</span>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-4-4VyXkQ5N0irTRHea8RJ5139Sez1fUL.png"
                  alt="Shivam Sharma"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle>Shivam Sharma</CardTitle>
                <CardDescription>BackEnd & BackEnd-FrontEnd Linking</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="https://www.linkedin.com/in/shivam-sharma-331945284/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn Profile</span>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-3-PS4Z9JCqmQMDtg0FcZcPW7XoADVwg8.png"
                  alt="Ansh Tripathi"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle>Ansh Tripathi</CardTitle>
                <CardDescription>FrontEnd Developing</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="https://www.linkedin.com/in/ansh-tripathi-312084253/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn Profile</span>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-C2JpkhCrcx6I7TyfY3K7I3OJXEf6c7.png"
                  alt="Avikam Rana"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle>Avikam Rana</CardTitle>
                <CardDescription>Project Review and Problem Statement</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="https://www.linkedin.com/in/avikam-rana-6a8546284/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn Profile</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
