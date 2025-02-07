"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FileText, Mail, User, CheckCircle } from "lucide-react"
import { toast } from "react-toastify"

export default function RequestQuoteContent() {
  const router = useRouter()
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

    toast.success(
      <div className="flex items-center">
        <CheckCircle className="text-green-500 mr-2" size={24} />
        <div>
          <h4 className="font-bold">تم إرسال الطلب بنجاح!</h4>
          <p className="text-sm">سنتواصل معك قريبًا لمتابعة طلبك.</p>
        </div>
      </div>,
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    )

    // Redirect to home page after successful submission
    setTimeout(() => {
      router.push("/")
    }, 2000)
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
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="text-2xl font-bold">طلب عرض سعر للترجمة</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              يرجى تأكيد تفاصيل طلبك وإضافة معلوماتك الشخصية
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">تفاصيل الترجمة:</h3>
                <p className="text-gray-700">
                  <strong>زوج اللغات:</strong> {languagePair}
                </p>
                <p className="text-gray-700">
                  <strong>عدد الكلمات:</strong> {wordCount}
                </p>
                <p className="text-gray-700">
                  <strong>التكلفة التقديرية:</strong> {totalCost} ريال سعودي
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    الاسم
                  </label>
                  <div className="relative">
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10"
                      placeholder="أدخل اسمك الكامل"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="additional-info" className="block text-sm font-medium text-gray-700">
                    معلومات إضافية (اختياري)
                  </label>
                  <div className="relative">
                    <Textarea
                      id="additional-info"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      className="pl-10 pt-2"
                      placeholder="أي تفاصيل إضافية عن مشروع الترجمة"
                    />
                    <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                  </div>
                </div>
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

