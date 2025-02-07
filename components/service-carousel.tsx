import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { toast } from "react-toastify"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

interface Service {
  id: string
  title: string
  description: string
  icon: React.ElementType
  startingPrice: number
}

interface ServiceCarouselProps {
  services: Service[]
  title: string
}

export function ServiceCarousel({ services, title }: ServiceCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 3, spacing: 15 },
      },
    },
    slides: { perView: 1 },
  })

  const { addToCart } = useCart()

  const handleAddToCart = (service: Service) => {
    addToCart({
      id: service.id,
      name: service.title,
      price: service.startingPrice,
      quantity: 1,
    })
    toast.success(`تمت إضافة "${service.title}" إلى سلة التسوق`)
  }

  return (
    <motion.section className="py-16 bg-muted" variants={fadeInUp} initial="initial" animate="animate">
      <div className="container relative">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <div ref={sliderRef} className="keen-slider">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.id} className="keen-slider__slide">
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center space-x-4 space-x-reverse">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{service.description}</CardDescription>
                    <p className="font-semibold text-primary">
                      الأسعار تبدأ من {service.startingPrice.toFixed(2)} ريال سعودي
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button className="w-full" variant="outline" onClick={() => handleAddToCart(service)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      إضافة إلى السلة
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )
          })}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                instanceRef.current?.prev()
              }}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                instanceRef.current?.next()
              }}
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </motion.section>
  )
}

