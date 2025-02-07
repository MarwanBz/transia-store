"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Clock, FileText, Users } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import dynamic from "next/dynamic"
import type { Dictionary } from "@/lib/dictionary"

const QuoteRequest = dynamic(() => import("@/components/quote-request"), { ssr: false })

const featuredProducts = [
  { id: "1", name: "Stylish Watch", price: 199.99, image: "/placeholder.svg?height=300&width=300" },
  { id: "2", name: "Designer Sunglasses", price: 149.99, image: "/placeholder.svg?height=300&width=300" },
  { id: "3", name: "Leather Wallet", price: 79.99, image: "/placeholder.svg?height=300&width=300" },
  { id: "4", name: "Wireless Earbuds", price: 129.99, image: "/placeholder.svg?height=300&width=300" },
]

export default function HomeContent({ dict }: { dict: Dictionary }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="container flex flex-col items-center justify-center space-y-8 py-32 text-center">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ff000008,#00000008)]" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">{dict.hero.title}</h1>
          <p className="max-w-[600px] text-lg text-muted-foreground">{dict.hero.subtitle}</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            {dict.hero.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <div className="container py-16">
          <h2 className="mb-8 text-3xl font-bold tracking-tighter text-center">{dict.featuredProducts.title}</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                currency={dict.currency}
                addToCartLabel={dict.featuredProducts.addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-t">
        <div className="container py-16">
          <h2 className="mb-8 text-3xl font-bold tracking-tighter text-center">{dict.services.title}</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <Globe className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-semibold">{dict.services.languages.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{dict.services.languages.description}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FileText className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-semibold">{dict.services.documents.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{dict.services.documents.description}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-semibold">{dict.services.turnaround.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{dict.services.turnaround.description}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-semibold">{dict.services.experts.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{dict.services.experts.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Section */}
      <section className="bg-muted">
        <div className="container py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold tracking-tighter">{dict.quoteRequest.title}</h2>
              <p className="text-lg text-muted-foreground">{dict.quoteRequest.description}</p>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <QuoteRequest dict={dict.quoteRequest} languages={dict.languages} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter">{dict.cta.title}</h2>
          <p className="mb-8 text-lg">{dict.cta.description}</p>
          <Button size="lg" variant="secondary">
            {dict.cta.button}
          </Button>
        </div>
      </section>
    </div>
  )
}

