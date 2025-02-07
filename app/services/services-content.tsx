"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  Search,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/CartContext"
import { toast } from "react-toastify"

const services = [
  {
    id: "official",
    title: "ترجمة المستندات الرسمية",
    description: "عقود، شهادات، تقارير، مستندات قانونية",
    longDescription:
      "نقدم خدمات ترجمة احترافية للمستندات الرسمية، بما في ذلك العقود والشهادات والتقارير والمستندات القانونية. نضمن الدقة والالتزام بالمصطلحات القانونية المناسبة.",
    icon: FileText,
    category: "وثائق",
    startingPrice: 100, // Added starting price
  },
  {
    id: "academic",
    title: "ترجمة أكاديمية",
    description: "أبحاث، رسائل ماجستير ودكتوراه",
    longDescription:
      "نوفر خدمات ترجمة متخصصة للأوراق الأكاديمية، بما في ذلك الأبحاث ورسائل الماجستير والدكتوراه. نضمن الحفاظ على الدقة العلمية والأسلوب الأكاديمي المناسب.",
    icon: Briefcase,
    category: "تعليم",
    startingPrice: 150, // Added starting price
  },
  {
    id: "commercial",
    title: "ترجمة تجارية",
    description: "ملفات الشركات، العروض التقديمية، التقارير المالية",
    longDescription:
      "نقدم خدمات ترجمة احترافية للوثائق التجارية، بما في ذلك ملفات الشركات والعروض التقديمية والتقارير المالية. نضمن الحفاظ على المصطلحات التجارية الدقيقة والأسلوب المهني.",
    icon: BarChart2,
    category: "أعمال",
    startingPrice: 200, // Added starting price
  },
  {
    id: "general",
    title: "ترجمة المحتوى العام",
    description: "مقالات، نصوص، مدونات",
    longDescription:
      "نوفر خدمات ترجمة عالية الجودة للمحتوى العام، بما في ذلك المقالات والنصوص والمدونات. نضمن ترجمة سلسة وطبيعية تحافظ على روح النص الأصلي.",
    icon: FileText,
    category: "محتوى",
    startingPrice: 50, // Added starting price
  },
  {
    id: "medical",
    title: "الترجمة الطبية",
    description: "تقارير طبية، وصفات، مقالات طبية",
    longDescription:
      "نقدم خدمات ترجمة متخصصة في المجال الطبي، بما في ذلك التقارير الطبية والوصفات والمقالات الطبية. نضمن الدقة في استخدام المصطلحات الطبية والحفاظ على سرية المعلومات.",
    icon: Stethoscope,
    category: "طب",
    startingPrice: 250, // Added starting price
  },
  {
    id: "legal",
    title: "الترجمة القانونية",
    description: "عقود، لوائح، وثائق رسمية",
    longDescription:
      "نوفر خدمات ترجمة قانونية احترافية، بما في ذلك العقود واللوائح والوثائق الرسمية. نضمن الدقة في استخدام المصطلحات القانونية والالتزام بالصيغ القانونية المعتمدة.",
    icon: Scale,
    category: "قانون",
    startingPrice: 300, // Added starting price
  },
  {
    id: "financial",
    title: "الترجمة المالية والمحاسبية",
    description: "ميزانيات، تقارير مالية",
    longDescription:
      "نقدم خدمات ترجمة متخصصة في المجال المالي والمحاسبي، بما في ذلك الميزانيات والتقارير المالية. نضمن الدقة في استخدام المصطلحات المالية والمحاسبية المعتمدة.",
    icon: BarChart2,
    category: "مالية",
    startingPrice: 200, // Added starting price
  },
  {
    id: "technical",
    title: "ترجمة تقنية",
    description: "كتيبات الأجهزة، أدلة الاستخدام، برامج",
    longDescription:
      "نوفر خدمات ترجمة تقنية متخصصة، بما في ذلك كتيبات الأجهزة وأدلة الاستخدام والبرامج. نضمن الدقة في استخدام المصطلحات التقنية وسهولة الفهم للمستخدم النهائي.",
    icon: Cpu,
    category: "تقنية",
    startingPrice: 150, // Added starting price
  },
  {
    id: "multimedia",
    title: "ترجمة وسائط متعددة",
    description: "ترجمة الفيديوهات، الدبلجة، الترجمة الفورية للأفلام",
    longDescription:
      "نقدم خدمات ترجمة شاملة للوسائط المتعددة، بما في ذلك ترجمة الفيديوهات والدبلجة والترجمة الفورية للأفلام. نضمن جودة عالية في الترجمة والتزامن الصوتي والبصري.",
    icon: Film,
    category: "وسائط",
    startingPrice: 350, // Added starting price
  },
  {
    id: "proofreading",
    title: "تدقيق لغوي وإملائي",
    description: "للنصوص العربية والإنجليزية",
    longDescription:
      "نوفر خدمات تدقيق لغوي وإملائي احترافية للنصوص العربية والإنجليزية. نضمن جودة عالية في التصحيح وتحسين الأسلوب اللغوي.",
    icon: Edit3,
    category: "تحرير",
    startingPrice: 50, // Added starting price
  },
  {
    id: "content-writing",
    title: "كتابة المحتوى الاحترافي",
    description: "للمواقع والتقارير",
    longDescription:
      "نوفر خدمات كتابة محتوى احترافي للمواقع والتقارير. نضمن إنتاج محتوى عالي الجودة، جذاب وملائم لجمهورك المستهدف.",
    icon: Edit3,
    category: "محتوى",
    startingPrice: 100, // Added starting price
  },
  {
    id: "conference",
    title: "الترجمة الفورية للمؤتمرات",
    description: "والاجتماعات",
    longDescription:
      "نقدم خدمات ترجمة فورية عالية الجودة للمؤتمرات والاجتماعات. نضمن دقة الترجمة وسرعة الاستجابة لضمان تواصل فعال.",
    icon: Mic,
    category: "فوري",
    startingPrice: 400, // Added starting price
  },
  {
    id: "website",
    title: "ترجمة مواقع الإنترنت",
    description: "بالكامل",
    longDescription:
      "نقدم خدمات ترجمة شاملة لمواقع الإنترنت، بما في ذلك المحتوى والواجهة وعناصر التصميم. نضمن تجربة مستخدم متسقة ومترابطة بجميع اللغات.",
    icon: Globe,
    category: "رقمي",
    startingPrice: 500, // Added starting price
  },
  {
    id: "ecommerce",
    title: "ترجمة المتاجر الإلكترونية",
    description: "Salla, Shopify, WooCommerce",
    longDescription:
      "نوفر خدمات ترجمة متخصصة للمتاجر الإلكترونية، بما في ذلك منصات مثل Salla وShopify وWooCommerce. نضمن ترجمة دقيقة لوصف المنتجات وواجهة المستخدم.",
    icon: ShoppingCart,
    category: "رقمي",
    startingPrice: 400, // Added starting price
  },
  {
    id: "app",
    title: "ترجمة التطبيقات والبرامج",
    description: "لمختلف المنصات",
    longDescription:
      "نقدم خدمات ترجمة شاملة للتطبيقات والبرامج لمختلف المنصات. نضمن ترجمة دقيقة لواجهة المستخدم والمحتوى، مع مراعاة خصوصيات كل منصة.",
    icon: Smartphone,
    category: "رقمي",
    startingPrice: 300, // Added starting price
  },
  {
    id: "subtitles",
    title: "إضافة الترجمة إلى الفيديوهات",
    description: "Subtitles",
    longDescription:
      "نوفر خدمات إضافة الترجمة إلى الفيديوهات (Subtitles) بجودة عالية. نضمن دقة الترجمة وتزامنها مع المحتوى المرئي.",
    icon: Video,
    category: "وسائط",
    startingPrice: 200, // Added starting price
  },
]

const categories = Array.from(new Set(services.map((service) => service.category)))

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ServicesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [filteredServices, setFilteredServices] = useState(services)

  const { addToCart } = useCart()

  const handleAddToCart = (service) => {
    addToCart({
      id: service.id,
      name: service.title,
      price: service.startingPrice,
      quantity: 1,
    })
    toast.success(`تمت إضافة "${service.title}" إلى سلة التسوق`)
  }

  useEffect(() => {
    const filtered = services.filter(
      (service) =>
        (selectedCategory === "الكل" || service.category === selectedCategory) &&
        (service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredServices(filtered)
  }, [searchTerm, selectedCategory])

  return (
    <motion.div className="container py-16" initial="hidden" animate="visible" variants={staggerContainer}>
      <motion.h1 className="text-4xl font-bold mb-8 text-center" variants={fadeIn}>
        خدمات الترجمة
      </motion.h1>

      <motion.div className="mb-8 flex flex-col md:flex-row gap-4" variants={fadeIn}>
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="ابحث عن خدمة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر الفئة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="الكل">جميع الفئات</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <AnimatePresence>
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredServices.map((service) => {
            const ServiceIcon = service.icon
            return (
              <motion.div key={service.id} variants={fadeIn} layout>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader className="bg-primary text-primary-foreground p-4">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="bg-white p-2 rounded-full">
                        <ServiceIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription className="text-primary-foreground/80">{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">{service.longDescription}</p>
                    <p className="text-sm font-semibold">الفئة: {service.category}</p>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button className="w-full" onClick={() => handleAddToCart(service)}>
                      إضافة إلى السلة
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

