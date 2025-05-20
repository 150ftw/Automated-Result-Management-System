"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentResults() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Aarav Sharma</p>
          <p className="text-sm text-muted-foreground">Data Structures</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            92/100
          </Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Aditi Patel</p>
          <p className="text-sm text-muted-foreground">Computer Networks</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            88/100
          </Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Aryan Singh</p>
          <p className="text-sm text-muted-foreground">Database Systems</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            76/100
          </Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>AG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Anaya Gupta</p>
          <p className="text-sm text-muted-foreground">Operating Systems</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            95/100
          </Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>VV</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Vihaan Verma</p>
          <p className="text-sm text-muted-foreground">Web Development</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            82/100
          </Badge>
        </div>
      </div>
    </div>
  )
}
