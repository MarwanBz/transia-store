"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function ContactContent() {
  return (
    <div className="container py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tighter">اتصل بنا</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>تواصل معنا</CardTitle>
          <CardDescription>
            هل لديك سؤال أو تحتاج إلى عرض سعر؟ املأ النموذج أدناه وسنعود إليك في أقرب وقت ممكن.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name">اسمك</label>
                <Input id="name" placeholder="محمد عبدالله" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">بريدك الإلكتروني</label>
                <Input id="email" type="email" placeholder="mohammed@example.com" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message">رسالتك</label>
                <Textarea id="message" placeholder="أخبرنا عن مشروعك..." />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>إرسال الرسالة</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

