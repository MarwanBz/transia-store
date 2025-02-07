"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import type { Dictionary } from "@/lib/dictionary"

export default function ContactContent({ dict }: { dict: Dictionary }) {
  return (
    <div className="container py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tighter">{dict.contact.title}</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{dict.contact.formTitle}</CardTitle>
          <CardDescription>{dict.contact.formDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name">{dict.contact.nameLabel}</label>
                <Input id="name" placeholder={dict.contact.namePlaceholder} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">{dict.contact.emailLabel}</label>
                <Input id="email" type="email" placeholder={dict.contact.emailPlaceholder} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message">{dict.contact.messageLabel}</label>
                <Textarea id="message" placeholder={dict.contact.messagePlaceholder} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>{dict.contact.submitButton}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

