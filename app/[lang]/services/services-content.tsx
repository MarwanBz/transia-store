"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary"

export default function ServicesContent({ dict }: { dict: Dictionary }) {
  return (
    <div className="container py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tighter">{dict.services.pageTitle}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {Object.entries(dict.services.list).map(([key, service]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{service.longDescription}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                {dict.services.learnMore} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

