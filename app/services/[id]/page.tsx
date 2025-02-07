"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
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
  Check,
} from "lucide-react"
import { motion } from "framer-motion"
import { useCart } from "@/contexts/CartContext"
import { toast } from "react-toastify"

const services = [
  {
    id: "official",
    title: "ترجمة المستندات الرسمية",
    description: "عقود، شهادات، تقارير، مستندات قانونية",
    longDescription:
      "نقدم خدمات ترجمة احترافية للمستندات الرسمية، بما في ذلك العقود والشهادات والتقارير والمستندات القانونية. نضمن الدقة والالتزام بالمصطلحات القانونية المناسبة.",
    startingPrice: 187.5, // 50 USD * 3.75 SAR/USD
    icon: FileText,
  },
  {
    id: "academic",
    title: "ترجمة أكاديمية",
    description: "أبحاث، رسائل ماجستير ودكتوراه",
    longDescription:
      "نوفر خدمات ترجمة متخصصة للأوراق الأكاديمية، بما في ذلك الأبحاث ورسائل الماجستير والدكتوراه. نضمن الحفاظ على الدقة العلمية والأسلوب الأكاديمي المناسب.",
    startingPrice: 281.25, // 75 USD * 3.75 SAR/USD
    icon: Briefcase,
  },
  {
    id: "commercial",
    title: "ترجمة تجارية",
    description: "ملفات الشركات، العروض التقديمية، التقارير المالية",
    longDescription:
      "نقدم خدمات ترجمة احترافية للوثائق التجارية، بما في ذلك ملفات الشركات والعروض التقديمية والتقارير المالية. نضمن الحفاظ على المصطلحات التجارية الدقيقة والأسلوب المهني.",
    startingPrice: 375, // 100 USD * 3.75 SAR/USD
    icon: BarChart2,
  },
  {
    id: "general",
    title: "ترجمة المحتوى العام",
    description: "مقالات، نصوص، مدونات",
    longDescription:
      "نوفر خدمات ترجمة عالية الجودة للمحتوى العام، بما في ذلك المقالات والنصوص والمدونات. نضمن ترجمة سلسة وطبيعية تحافظ على روح النص الأصلي.",
    startingPrice: 112.5, // 30 USD * 3.75 SAR/USD
    icon: FileText,
  },
  {
    id: "medical",
    title: "الترجمة الطبية",
    description: "تقارير طبية، وصفات، مقالات طبية",
    longDescription:
      "نقدم خدمات ترجمة متخصصة في المجال الطبي، بما في ذلك التقارير الطبية والوصفات والمقالات الطبية. نضمن الدقة في استخدام المصطلحات الطبية والحفاظ على سرية المعلومات.",
    startingPrice: 450, // 120 USD * 3.75 SAR/USD
    icon: Stethoscope,
  },
  {
    id: "legal",
    title: "الترجمة القانونية",
    description: "عقود، لوائح، وثائق رسمية",
    longDescription:
      "نوفر خدمات ترجمة قانونية احترافية، بما في ذلك العقود واللوائح والوثائق الرسمية. نضمن الدقة في استخدام المصطلحات القانونية والالتزام بالصيغ القانونية المعتمدة.",
    startingPrice: 562.5, // 150 USD * 3.75 SAR/USD
    icon: Scale,
  },
  {
    id: "financial",
    title: "الترجمة المالية والمحاسبية",
    description: "ميزانيات، تقارير مالية",
    longDescription:
      "نقدم خدمات ترجمة متخصصة في المجال المالي والمحاسبي، بما في ذلك الميزانيات والتقارير المالية. نضمن الدقة في استخدام المصطلحات المالية والمحاسبية المعتمدة.",
    startingPrice: 487.5, // 130 USD * 3.75 SAR/USD
    icon: BarChart2,
  },
  {
    id: "technical",
    title: "ترجمة تقنية",
    description: "كتيبات الأجهزة، أدلة الاستخدام، برامج",
    longDescription:
      "نوفر خدمات ترجمة تقنية متخصصة، بما في ذلك كتيبات الأجهزة وأدلة الاستخدام والبرامج. نضمن الدقة في استخدام المصطلحات التقنية وسهولة الفهم للمستخدم النهائي.",
    startingPrice: 412.5, // 110 USD * 3.75 SAR/USD
    icon: Cpu,
  },
  {
    id: "multimedia",
    title: "ترجمة وسائط متعددة",
    description: "ترجمة الفيديوهات، الدبلجة، الترجمة الفورية للأفلام",
    longDescription:
      "نقدم خدمات ترجمة شاملة للوسائط المتعددة، بما في ذلك ترجمة الفيديوهات والدبلجة والترجمة الفورية للأفلام. نضمن جودة عالية في الترجمة والتزامن الصوتي والبصري.",
    startingPrice: 750, // 200 USD * 3.75 SAR/USD
    icon: Film,
  },
  {
    id: "proofreading",
    title: "تدقيق لغوي وإملائي",
    description: "للنصوص العربية والإنجليزية",
    longDescription:
      "نوفر خدمات تدقيق لغوي وإملائي احترافية للنصوص العربية والإنجليزية. نضمن جودة عالية في التصحيح وتحسين الأسلوب اللغوي.",
    startingPrice: 150, // 40 USD * 3.75 SAR/USD
    icon: Edit3,
  },
  {
    id: "rewriting",
    title: "إعادة الصياغة والتحسين",
    description: "للمقالات والمحتوى الإعلاني",
    longDescription:
      "نقدم خدمات إعادة صياغة وتحسين للمقالات والمحتوى الإعلاني. نضمن تحسين جودة المحتوى وجاذبيته مع الحفاظ على الرسالة الأساسية.",
    startingPrice: 225, // 60 USD * 3.75 SAR/USD
    icon: Edit3,
  },
  {
    id: "content-writing",
    title: "كتابة المحتوى الاحترافي",
    description: "للمواقع والتقارير",
    longDescription:
      "نوفر خدمات كتابة محتوى احترافي للمواقع والتقارير. نضمن إنتاج محتوى عالي الجودة، جذاب وملائم لجمهورك المستهدف.",
    startingPrice: 300, // 80 USD * 3.75 SAR/USD
    icon: Edit3,
  },
  {
    id: "conference",
    title: "الترجمة الفورية للمؤتمرات",
    description: "والاجتماعات",
    longDescription:
      "نقدم خدمات ترجمة فورية عالية الجودة للمؤتمرات والاجتماعات. نضمن دقة الترجمة وسرعة الاستجابة لضمان تواصل فعال.",
    startingPrice: 562.5, // 150 USD * 3.75 SAR/USD
    icon: Mic,
  },
  {
    id: "remote",
    title: "الترجمة عبر الهاتف أو الإنترنت",
    description: "Zoom/Teams",
    longDescription:
      "نوفر خدمات ترجمة فورية عن بعد عبر الهاتف أو منصات الاجتماعات عبر الإنترنت مثل Zoom وTeams. نضمن جودة الصوت وموثوقية الخدمة.",
    startingPrice: 375, // 100 USD * 3.75 SAR/USD
    icon: Headphones,
  },
  {
    id: "website",
    title: "ترجمة مواقع الإنترنت",
    description: "بالكامل",
    longDescription:
      "نقدم خدمات ترجمة شاملة لمواقع الإنترنت، بما في ذلك المحتوى والواجهة وعناصر التصميم. نضمن تجربة مستخدم متسقة ومترابطة بجميع اللغات.",
    startingPrice: 750, // 200 USD * 3.75 SAR/USD
    icon: Globe,
  },
  {
    id: "ecommerce",
    title: "ترجمة المتاجر الإلكترونية",
    description: "Salla, Shopify, WooCommerce",
    longDescription:
      "نوفر خدمات ترجمة متخصصة للمتاجر الإلكترونية، بما في ذلك منصات مثل Salla وShopify وWooCommerce. نضمن ترجمة دقيقة لوصف المنتجات وواجهة المستخدم.",
    startingPrice: 1125, // 300 USD * 3.75 SAR/USD
    icon: ShoppingCart,
  },
  {
    id: "app",
    title: "ترجمة التطبيقات والبرامج",
    description: "لمختلف المنصات",
    longDescription:
      "نقدم خدمات ترجمة شاملة للتطبيقات والبرامج لمختلف المنصات. نضمن ترجمة دقيقة لواجهة المستخدم والمحتوى، مع مراعاة خصوصيات كل منصة.",
    startingPrice: 937.5, // 250 USD * 3.75 SAR/USD
    icon: Smartphone,
  },
  {
    id: "subtitles",
    title: "إضافة الترجمة إلى الفيديوهات",
    description: "Subtitles",
    longDescription:
      "نوفر خدمات إضافة الترجمة إلى الفيديوهات (Subtitles) بجودة عالية. نضمن دقة الترجمة وتزامنها مع المحتوى المرئي.",
    startingPrice: 375, // 100 USD * 3.75 SAR/USD
    icon: Video,
  },
  {
    id: "dubbing",
    title: "دبلجة وتعليق صوتي",
    description: "بلغات مختلفة",
    longDescription:
      "نقدم خدمات دبلجة وتعليق صوتي باللغات المختلفة. نضمن جودة عالية في الأداء الصوتي والتزامن مع المحتوى المرئي.",
    startingPrice: 562.5, // 150 USD * 3.75 SAR/USD
    icon: Headphones,
  },
]

const getServiceDetails = (id: string) => {
  return services.find((service) => service.id === id)
}

export default function ServiceDetails({ params }: { params: { id: string } }) {
  const [service, setService] = useState<any>(null)
  const router = useRouter()
  const { addToCart } = useCart()

  useEffect(() => {
    const serviceDetails = getServiceDetails(params.id)
    setService(serviceDetails)
  }, [params.id])

  if (!service) {
    return <div>جاري التحميل...</div>
  }

  const handleAddToCart = () => {
    addToCart({
      id: service.id,
      name: service.title,
      price: service.startingPrice,
      quantity: 1,
    })
    toast.success(`تمت إضافة "${service.title}" إلى سلة التسوق`)
  }

  const ServiceIcon = service.icon

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="container py-16">
      <motion.div variants={fadeIn} initial="initial" animate="animate">
        <Card className="overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-white p-3 rounded-full">
                <ServiceIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-primary-foreground/80">{service.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg mb-6">{service.longDescription}</p>
            <div className="bg-muted p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-lg mb-2">مميزات الخدمة:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>جودة عالية في الترجمة</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>التزام بالمواعيد النهائية</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>مراجعة دقيقة للمحتوى</span>
                </li>
              </ul>
            </div>
            <p className="font-semibold text-primary text-2xl mb-6">
              السعر يبدأ من {service.startingPrice.toFixed(2)} ريال سعودي
            </p>
            <Button onClick={handleAddToCart} size="lg" className="w-full">
              إضافة إلى السلة
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

