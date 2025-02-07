"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function RequestTranslationContent() {
  const searchParams = useSearchParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")

  const languagePair = searchParams.get("pair")
  const wordCount = searchParams.get("words")
  const totalCost = searchParams.get("cost")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission, e.g., sending data to your backend
    console.log("Form submitted", { name, email, additionalInfo, languagePair, wordCount, totalCost })
    alert("تم إرسال طلب الترجمة بنجاح! سنتواصل معك قريبًا.")
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="container py-16">
      <motion.div variants={fadeIn} initial="initial" animate="animate">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">طلب ترجمة</CardTitle>
            <CardDescription className="text-gray-700">يرجى تأكيد تفاصيل طلبك وإضافة معلوماتك الشخصية</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">تفاصيل الترجمة:</h3>
                <p className="text-gray-700">زوج اللغات: {languagePair}</p>
                <p className="text-gray-700">عدد الكلمات: {wordCount}</p>
                <p className="text-gray-700">التكلفة الإجمالية: {totalCost} ريال سعودي</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  الاسم
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  البريد الإلكتروني
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="additional-info" className="block text-sm font-medium text-gray-700">
                  معلومات إضافية (اختياري)
                </label>
                <Textarea
                  id="additional-info"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="w-full"
                  placeholder="أي تفاصيل إضافية عن مشروع الترجمة"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full bg-primary text-white hover:bg-primary/90">
              تأكيد وإرسال الطلب
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

