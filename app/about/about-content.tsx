"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Globe, Award, Zap } from "lucide-react"

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const AnimatedSection = ({ children, className = "" }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div ref={ref} animate={controls} initial="hidden" variants={staggerChildren} className={className}>
      {children}
    </motion.div>
  )
}

export default function AboutContent() {
  return (
    <div className="container py-16">
      <AnimatedSection>
        <motion.h1 className="text-4xl font-bold mb-8 text-center" variants={fadeInUp}>
          عن ترانسيا
        </motion.h1>
        <motion.p className="text-xl text-center mb-12 max-w-3xl mx-auto" variants={fadeInUp}>
          نحن نؤمن بقوة اللغة في ربط العالم وتسهيل التواصل بين الثقافات المختلفة
        </motion.p>
      </AnimatedSection>

      <AnimatedSection className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
        {[
          { icon: Users, title: "فريق محترف", description: "مترجمون ذوو خبرة في مجالات متخصصة" },
          { icon: Globe, title: "تغطية عالمية", description: "نقدم خدماتنا في أكثر من 50 لغة" },
          { icon: Award, title: "جودة عالية", description: "نلتزم بأعلى معايير الجودة في الترجمة" },
          { icon: Zap, title: "سرعة في التنفيذ", description: "نقدم خدماتنا بسرعة وكفاءة عالية" },
        ].map((item, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="h-full">
              <CardHeader>
                <item.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <motion.h2 className="text-3xl font-bold mb-6 text-center" variants={fadeInUp}>
          رؤيتنا
        </motion.h2>
        <motion.p className="text-lg text-center mb-8 max-w-3xl mx-auto" variants={fadeInUp}>
          نسعى لأن نكون الرائدين عالميًا في مجال الترجمة والخدمات اللغوية، ملتزمين بتقديم حلول مبتكرة تساعد عملائنا على
          التواصل بفعالية في السوق العالمية.
        </motion.p>
        <motion.div className="text-center" variants={fadeInUp}>
          <Button size="lg">
            اكتشف خدماتنا
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </motion.div>
      </AnimatedSection>

      <AnimatedSection>
        <motion.h2 className="text-3xl font-bold mb-6 text-center" variants={fadeInUp}>
          قصتنا
        </motion.h2>
        <motion.div className="grid gap-8 md:grid-cols-2 items-center" variants={fadeInUp}>
          <div>
            <p className="text-lg mb-4">
              بدأت ترانسيا رحلتها في عام 2010 كشركة صغيرة متخصصة في الترجمة، وسرعان ما نمت لتصبح واحدة من أكبر شركات
              الترجمة في المنطقة.
            </p>
            <p className="text-lg mb-4">
              على مر السنين، قمنا بتوسيع خدماتنا لتشمل مجموعة واسعة من الخدمات اللغوية، من الترجمة التحريرية إلى الترجمة
              الفورية والتحرير اللغوي وتوطين المحتوى.
            </p>
            <p className="text-lg">
              اليوم، نفخر بخدمة آلاف العملاء حول العالم، من الشركات الصغيرة إلى المؤسسات العالمية الكبرى.
            </p>
          </div>
          <motion.div
            className="relative h-80 overflow-hidden rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="صورة توضيحية لفريق ترانسيا"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </motion.div>
      </AnimatedSection>

      <AnimatedSection className="mt-16">
        <motion.h2 className="text-3xl font-bold mb-6 text-center" variants={fadeInUp}>
          انضم إلى فريقنا
        </motion.h2>
        <motion.p className="text-lg text-center mb-8 max-w-3xl mx-auto" variants={fadeInUp}>
          نحن دائمًا نبحث عن مواهب جديدة للانضمام إلى فريقنا المتنامي. إذا كنت شغوفًا باللغات والترجمة، فنحن نرحب بك
          للانضمام إلينا.
        </motion.p>
        <motion.div className="text-center" variants={fadeInUp}>
          <Button variant="outline" size="lg">
            استكشف الفرص المتاحة
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </motion.div>
      </AnimatedSection>
    </div>
  )
}

