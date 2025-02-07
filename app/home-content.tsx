"use client"

import { useState } from "react"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  FileText,
  Briefcase,
  Stethoscope,
  Scale,
  BarChart2,
  Cpu,
  Film,
  Edit3,
  Mic,
  Globe,
  ShoppingCart,
  Smartphone,
  Video,
  Headphones,
  Calculator,
} from "lucide-react"
import dynamic from "next/dynamic"
import { TranslationCalculator } from "@/components/translation-calculator"
import { motion, AnimatePresence } from "framer-motion"
import { ServiceCarousel } from "@/components/service-carousel"
import { useTypewriter, Cursor } from "react-simple-typewriter"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/CartContext"
import { toast } from "react-toastify"
import Image from "next/image"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const QuoteRequest = dynamic(() => import("@/components/quote-request"), { ssr: false })

const translationServices = [
  {
    category: "خدمات الترجمة الأساسية",
    services: [
      {
        id: "official",
        title: "ترجمة المستندات الرسمية",
        description: "عقود، شهادات، تقارير، مستندات قانونية",
        icon: FileText,
        startingPrice: 50,
      },
      {
        id: "academic",
        title: "ترجمة أكاديمية",
        description: "أبحاث، رسائل ماجستير ودكتوراه",
        icon: Briefcase,
        startingPrice: 75,
      },
      {
        id: "commercial",
        title: "ترجمة تجارية",
        description: "ملفات الشركات، العروض التقديمية، التقارير المالية",
        icon: BarChart2,
        startingPrice: 100,
      },
      {
        id: "general",
        title: "ترجمة المحتوى العام",
        description: "مقالات، نصوص، مدونات",
        icon: FileText,
        startingPrice: 30,
      },
    ],
  },
  {
    category: "خدمات الترجمة المتخصصة",
    services: [
      {
        id: "medical",
        title: "الترجمة الطبية",
        description: "تقارير طبية، وصفات، مقالات طبية",
        icon: Stethoscope,
        startingPrice: 120,
      },
      {
        id: "legal",
        title: "الترجمة القانونية",
        description: "عقود، لوائح، وثائق رسمية",
        icon: Scale,
        startingPrice: 150,
      },
      {
        id: "financial",
        title: "الترجمة المالية والمحاسبية",
        description: "ميزانيات، تقارير مالية",
        icon: BarChart2,
        startingPrice: 130,
      },
      {
        id: "technical",
        title: "ترجمة تقنية",
        description: "كتيبات الأجهزة، أدلة الاستخدام، برامج",
        icon: Cpu,
        startingPrice: 110,
      },
      {
        id: "multimedia",
        title: "ترجمة وسائط متعددة",
        description: "ترجمة الفيديوهات، الدبلجة، الترجمة الفورية للأفلام",
        icon: Film,
        startingPrice: 200,
      },
    ],
  },
  {
    category: "خدمات تحرير وتدقيق لغوي",
    services: [
      {
        id: "proofreading",
        title: "تدقيق لغوي وإملائي",
        description: "للنصوص العربية والإنجليزية",
        icon: Edit3,
        startingPrice: 40,
      },
      {
        id: "rewriting",
        title: "إعادة الصياغة والتحسين",
        description: "للمقالات والمحتوى الإعلاني",
        icon: Edit3,
        startingPrice: 60,
      },
      {
        id: "content-writing",
        title: "كتابة المحتوى الاحترافي",
        description: "للمواقع والتقارير",
        icon: Edit3,
        startingPrice: 80,
      },
    ],
  },
  {
    category: "خدمات الترجمة الفورية",
    services: [
      {
        id: "conference",
        title: "الترجمة الفورية للمؤتمرات",
        description: "والاجتماعات",
        icon: Mic,
        startingPrice: 150,
      },
      {
        id: "remote",
        title: "الترجمة عبر الهاتف أو الإنترنت",
        description: "Zoom/Teams",
        icon: Headphones,
        startingPrice: 100,
      },
    ],
  },
  {
    category: "خدمات الترجمة الخاصة بالمواقع والمتاجر",
    services: [
      { id: "website", title: "ترجمة مواقع الإنترنت", description: "بالكامل", icon: Globe, startingPrice: 200 },
      {
        id: "ecommerce",
        title: "ترجمة المتاجر الإلكترونية",
        description: "Salla, Shopify, WooCommerce",
        icon: ShoppingCart,
        startingPrice: 300,
      },
      {
        id: "app",
        title: "ترجمة التطبيقات والبرامج",
        description: "لمختلف المنصات",
        icon: Smartphone,
        startingPrice: 250,
      },
    ],
  },
  {
    category: "خدمات الترجمة المرئية والصوتية",
    services: [
      {
        id: "subtitles",
        title: "إضافة الترجمة إلى الفيديوهات",
        description: "Subtitles",
        icon: Video,
        startingPrice: 100,
      },
      { id: "dubbing", title: "دبلجة وتعليق صوتي", description: "بلغات مختلفة", icon: Headphones, startingPrice: 150 },
    ],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomeContent() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [fromLang, setFromLang] = useState("")
  const [toLang, setToLang] = useState("")
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false) // Added state
  const { addToCart } = useCart()
  const router = useRouter()

  const [typewriterText] = useTypewriter({
    words: [
      "خدمات ترجمة احترافية",
      "جسر التواصل بين الثقافات",
      "دقة وسرعة في الترجمة",
      "خبراء في أكثر من 50 لغة",
      "حلول ترجمة مخصصة لأعمالك",
    ],
    loop: 0,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  })

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleCTAClick = () => {
    if (selectedServices.length > 0) {
      setIsDialogOpen(true)
    } else {
      toast.error("الرجاء اختيار خدمة واحدة على الأقل للمتابعة")
    }
  }

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    })
    toast.success(`تمت إضافة "${product.name}" إلى سلة التسوق`)
  }

  const ProductCard = ({ product }) => (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {product.price !== null ? `${product.price.toFixed(2)} ريال سعودي` : "السعر غير متوفر"}
        </p>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full" variant="outline" onClick={() => handleAddToCart(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          إضافة إلى السلة
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="container flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6"
            variants={fadeInUp}
          >
            <span className="block">{typewriterText}</span>
            <Cursor cursorStyle="_" />
          </motion.h1>
          <motion.p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:max-w-3xl" variants={fadeInUp}>
            نقدم خدمات ترجمة شاملة لتلبية جميع احتياجاتك اللغوية وتعزيز تواصلك العالمي
          </motion.p>
          <motion.div
            className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12 space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse"
            variants={fadeInUp}
          >
            <div className="rounded-md shadow">
              <Button
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => router.push("/services")}
              >
                استكشف خدماتنا
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-md shadow">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-white/10 hover:bg-white/20"
                onClick={() => setIsCalculatorOpen(true)}
              >
                حاسبة التكلفة
                <Calculator className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ff000008,#00000008)]" />
        <motion.div
          className="absolute inset-0 -z-10 bg-[url('/translation-bg.svg')] bg-center bg-no-repeat bg-cover opacity-10"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </motion.section>

      {/* Interactive Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>ابدأ رحلتك اللغوية</DialogTitle>
            <DialogDescription>اختر اللغات التي ترغب في الترجمة بينها وسنساعدك في بدء مشروعك.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="from-lang" className="text-right">
                من
              </label>
              <Select onValueChange={setFromLang} value={fromLang}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر اللغة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">الإنجليزية</SelectItem>
                  <SelectItem value="fr">الفرنسية</SelectItem>
                  <SelectItem value="de">الألمانية</SelectItem>
                  <SelectItem value="es">الإسبانية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="to-lang" className="text-right">
                إلى
              </label>
              <Select onValueChange={setToLang} value={toLang}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر اللغة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">الإنجليزية</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="fr">الفرنسية</SelectItem>
                  <SelectItem value="de">الألمانية</SelectItem>
                  <SelectItem value="es">الإسبانية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setIsDialogOpen(false)}>ابدأ الآن</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Translation Services Sections */}
      <AnimatePresence>
        {translationServices.map((category, index) => (
          <ServiceCarousel key={category.category} services={category.services} title={category.category} />
        ))}
      </AnimatePresence>

      {/* Benefits Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container py-16">
          <motion.h2 className="mb-8 text-3xl font-bold tracking-tighter text-center" variants={fadeInUp}>
            لماذا تختار خدماتنا؟
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "خبرة في أكثر من 50 لغة",
                description: "نغطي معظم اللغات العالمية لتلبية احتياجاتك",
              },
              {
                icon: FileText,
                title: "دقة عالية في الترجمة",
                description: "فريق من المترجمين المحترفين لضمان جودة الترجمة",
              },
              {
                icon: Headphones,
                title: "دعم فني على مدار الساعة",
                description: "فريق دعم متاح دائمًا للإجابة على استفساراتك",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp} className="flex flex-col items-center text-center">
                <item.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        className="bg-primary text-primary-foreground py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container text-center">
          <motion.h2 className="mb-8 text-3xl font-bold tracking-tighter" variants={fadeInUp}>
            ماذا يقول عملاؤنا
          </motion.h2>
          <motion.blockquote className="text-lg italic max-w-2xl mx-auto" variants={fadeInUp}>
            "لقد ساعدتنا خدمات الترجمة في توسيع أعمالنا دولياً. جودة الترجمة ممتازة والخدمة سريعة وموثوقة."
          </motion.blockquote>
          <motion.p className="mt-4 font-semibold" variants={fadeInUp}>
            - أحمد محمد، المدير التنفيذي لشركة تجارة دولية
          </motion.p>
        </div>
      </motion.section>

      {/* Interactive CTA Section */}
      <motion.section
        className="bg-secondary text-secondary-foreground py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.h2 className="mb-8 text-3xl font-bold tracking-tighter text-center" variants={fadeInUp}>
            جرب حاسبة تكلفة الترجمة
          </motion.h2>
          <motion.div className="max-w-md mx-auto" variants={fadeInUp}>
            <TranslationCalculator currency="SAR" />
          </motion.div>
        </div>
      </motion.section>

      {/* Quote Request Section */}
      <motion.section
        className="bg-muted py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div variants={fadeInUp}>
              <h2 className="mb-4 text-3xl font-bold tracking-tighter">احصل على عرض سعر مجاني</h2>
              <p className="text-lg text-muted-foreground">
                املأ النموذج وسنتواصل معك في أقرب وقت ممكن لتقديم عرض سعر مخصص لاحتياجاتك.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Suspense fallback={<div>جاري التحميل...</div>}>
                <QuoteRequest selectedServices={selectedServices} />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="bg-primary text-primary-foreground py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container text-center">
          <motion.h2 className="mb-4 text-3xl font-bold tracking-tighter" variants={fadeInUp}>
            جاهز لبدء مشروع الترجمة الخاص بك؟
          </motion.h2>
          <motion.p className="mb-8 text-lg" variants={fadeInUp}>
            دعنا نساعدك في التواصل بفعالية مع جمهورك العالمي
          </motion.p>
          <motion.div variants={fadeInUp} className="flex items-center  justify-center" >
            <Button
              size="lg"
              variant="secondary"
              className="hover:bg-secondary/90 flex items-center space-x-2"
              onClick={() => setIsQuoteDialogOpen(true)}
            >
              <span>احصل على عرض سعر الآن</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
          <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>احصل على عرض سعر مخصص</DialogTitle>
                <DialogDescription>أخبرنا عن مشروعك وسنقوم بإعداد عرض سعر مخصص لك.</DialogDescription>
              </DialogHeader>
              <QuoteRequest selectedServices={[]} />
            </DialogContent>
          </Dialog>
        </div>
      </motion.section>
      {isCalculatorOpen && (
        <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>حاسبة تكلفة الترجمة</DialogTitle>
            </DialogHeader>
            <TranslationCalculator />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

