import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductCardProps {
  id: string
  name: string
  price: number | null
  image: string
  currency: string
  addToCartLabel: string
}

export function ProductCard({ id, name, price, image, currency, addToCartLabel }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="line-clamp-1">{name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {price !== null ? `${currency}${price.toFixed(2)}` : "Price not available"}
        </p>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full" variant="outline">
          {addToCartLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}

