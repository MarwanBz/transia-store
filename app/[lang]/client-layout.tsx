"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { ReactNode } from "react"
import type { Locale } from "./layout"
import type { Dictionary } from "@/lib/dictionary"

export default function ClientLayout({
  children,
  dict,
  lang,
}: { children: ReactNode; dict: Dictionary; lang: Locale }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header dict={dict.navigation} lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict.navigation} lang={lang} />
    </div>
  )
}

