import { Inter } from "next/font/google"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "@/app/globals.css"
import { getDictionary } from "@/lib/dictionary"
import ClientLayout from "./client-layout"
import type { Locale } from "./layout"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const locales = ["en", "ar"] as const

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <html lang={params.lang} dir={params.lang === "ar" ? "rtl" : "ltr"}>
      <body className={inter.className}>
        <ClientLayout dict={dict} lang={params.lang}>
          {children}
        </ClientLayout>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  )
}

