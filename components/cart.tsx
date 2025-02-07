"use client"

import { useState } from "react"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"

export function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartItems, removeFromCart, getCartTotal } = useCart()
  const router = useRouter()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>سلة التسوق</SheetTitle>
          <SheetDescription>لديك {totalItems} خدمات في سلة التسوق</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground"> (x{item.quantity})</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{(item.price * item.quantity).toFixed(2)} ريال سعودي</span>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {cartItems.length === 0 && <p>سلة التسوق فارغة</p>}
        </div>
        <div className="mt-6">
          <p className="font-bold">المجموع: {getCartTotal().toFixed(2)} ريال سعودي</p>
        </div>
        <Button className="mt-4 w-full" disabled={cartItems.length === 0} onClick={() => router.push("/checkout")}>
          إتمام الشراء
        </Button>
      </SheetContent>
    </Sheet>
  )
}

