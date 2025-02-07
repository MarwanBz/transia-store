"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-toastify"

const languages = ["الإنجليزية", "الإسبانية", "الفرنسية", "الألمانية", "الصينية", "اليابانية", "العربية", "الروسية"]

export default function QuoteRequest() {
  const [sourceLanguage, setSourceLanguage] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("")
  const [wordCount, setWordCount] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ sourceLanguage, targetLanguage, wordCount, email })
    toast.success("تم إرسال طلب عرض السعر بنجاح!")
  }

  return (
    <div className="bg-muted p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">طلب عرض سعر</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sourceLanguage" className="block mb-2">
            اللغة المصدر
          </label>
          <Select onValueChange={setSourceLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="اختر اللغة" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="targetLanguage" className="block mb-2">
            اللغة الهدف
          </label>
          <Select onValueChange={setTargetLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="اختر اللغة" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="wordCount" className="block mb-2">
            عدد الكلمات
          </label>
          <Input type="number" id="wordCount" value={wordCount} onChange={(e) => setWordCount(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2">
            بريدك الإلكتروني
          </label>
          <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button type="submit">احصل على عرض السعر</Button>
      </form>
    </div>
  )
}

