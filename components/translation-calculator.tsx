"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, X } from "lucide-react"

const languagePairs = [
  { name: "الإنجليزية إلى العربية", rate: 0.45 },
  { name: "العربية إلى الإنجليزية", rate: 0.525 },
  { name: "الفرنسية إلى العربية", rate: 0.5625 },
  { name: "العربية إلى الفرنسية", rate: 0.6 },
]

export function TranslationCalculator() {
  const [languagePair, setLanguagePair] = useState(languagePairs[0])
  const [wordCount, setWordCount] = useState(100)
  const [totalCost, setTotalCost] = useState(languagePairs[0].rate * 100)
  const [showDetails, setShowDetails] = useState(false)
  const router = useRouter()

  const handleCalculate = () => {
    setTotalCost(Number((languagePair.rate * wordCount).toFixed(2)))
    setShowDetails(true)
  }

  const handleSliderChange = (value: number[]) => {
    setWordCount(value[0])
    setTotalCost(Number((languagePair.rate * value[0]).toFixed(2)))
  }

  const handleRequestTranslation = () => {
    const params = new URLSearchParams({
      pair: languagePair.name,
      words: wordCount.toString(),
      cost: totalCost.toFixed(2),
    })
    router.push(`/request-quote?${params.toString()}`)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-gray-900">حاسبة تكلفة الترجمة</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="language-pair" className="block mb-2 text-gray-800 font-medium">
            اختر زوج اللغات:
          </label>
          <Select
            onValueChange={(value) => {
              const selectedPair = languagePairs[Number.parseInt(value)]
              setLanguagePair(selectedPair)
              setTotalCost(Number((selectedPair.rate * wordCount).toFixed(2)))
            }}
          >
            <SelectTrigger className="bg-white text-gray-800">
              <SelectValue placeholder="اختر زوج اللغات" />
            </SelectTrigger>
            <SelectContent>
              {languagePairs.map((pair, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {pair.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="word-count" className="block mb-2 text-gray-800 font-medium">
            عدد الكلمات: {wordCount}
          </label>
          <Slider defaultValue={[100]} max={10000} step={50} onValueChange={handleSliderChange} />
        </div>
        <div className="text-center">
          <p className="text-lg text-gray-800">
            التكلفة التقديرية: <span className="font-bold text-primary">{totalCost.toFixed(2)} ريال سعودي</span>
          </p>
        </div>
        <Button onClick={handleCalculate} className="w-full bg-primary text-white hover:bg-primary/90">
          احصل على تفاصيل العرض
        </Button>
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-gray-100 p-4 rounded-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-900">تفاصيل العرض</h4>
              <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-gray-800 font-medium">زوج اللغات: {languagePair.name}</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-gray-800 font-medium">عدد الكلمات: {wordCount}</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-gray-800 font-medium">
                  السعر لكل كلمة: {languagePair.rate.toFixed(2)} ريال سعودي
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-gray-800 font-medium">التكلفة الإجمالية: {totalCost.toFixed(2)} ريال سعودي</span>
              </li>
            </ul>
            <div className="mt-4">
              <Button
                className="w-full bg-secondary text-white hover:bg-secondary/90"
                onClick={handleRequestTranslation}
              >
                طلب ترجمة الآن
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

