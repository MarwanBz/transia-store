"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle, CreditCard, FileText, Mail, User, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const steps = ["معلومات العميل", "طريقة الدفع", "مراجعة الطلب"]

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(0)
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", projectDetails: "" })
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/")
    }
  }, [cartItems, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value })
  }

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        return customerInfo.name.trim() !== "" && customerInfo.email.trim() !== ""
      case 1:
        return paymentMethod !== ""
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    } else {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically integrate with a payment provider
    toast({
      title: "تم إتمام الطلب بنجاح!",
      description: "شكرًا لك على الشراء. سيتم إرسال تأكيد إلى بريدك الإلكتروني."
    })
    clearCart()
    router.push("/")
  }

  const fadeInOut = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <div className="container py-16">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">إتمام الشراء</CardTitle>
          <CardDescription>أنت على بعد خطوات قليلة من إتمام طلبك</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <ol className="flex items-center w-full">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`flex items-center ${
                    index < steps.length - 1 ? "w-full" : ""
                  } ${index <= currentStep ? "text-primary" : "text-gray-400"}`}
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current">
                    {index + 1}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 w-full ${index < currentStep ? "bg-primary" : "bg-gray-300"}`}></div>
                  )}
                  <span className="absolute mt-16 text-xs">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeInOut}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      الاسم
                    </Label>
                    <Input id="name" name="name" value={customerInfo.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectDetails" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      تفاصيل المشروع (اختياري)
                    </Label>
                    <textarea
                      id="projectDetails"
                      name="projectDetails"
                      value={customerInfo.projectDetails}
                      onChange={handleInputChange}
                      className="w-full min-h-[100px] p-2 border rounded-md"
                      placeholder="أضف أي تفاصيل إضافية عن مشروعك هنا"
                    />
                  </div>
                </form>
              )}
              {currentStep === 1 && (
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      بطاقة ائتمان
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center">
                      <Wallet className="mr-2 h-4 w-4" />
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">ملخص الطلب</h3>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                      <span>
                        {item.name} (x{item.quantity})
                      </span>
                      <span>{(item.price * item.quantity).toFixed(2)} ريال سعودي</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>الإجمالي:</span>
                    <span>{getCartTotal().toFixed(2)} ريال سعودي</span>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold">معلومات العميل:</h4>
                    <p>{customerInfo.name}</p>
                    <p>{customerInfo.email}</p>
                    {customerInfo.projectDetails && (
                      <div>
                        <h5 className="font-semibold mt-2">تفاصيل المشروع:</h5>
                        <p>{customerInfo.projectDetails}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">طريقة الدفع:</h4>
                    <p>{paymentMethod === "credit-card" ? "بطاقة ائتمان" : "PayPal"}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> السابق
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>
              التالي <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>إتمام الطلب</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

