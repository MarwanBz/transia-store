// import { Inter } from "next/font/google"
// import { ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import "@/app/globals.css"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import type React from "react"
// import { CartProvider } from "@/contexts/CartContext"

// const inter = Inter({ subsets: ["latin"] })

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="ar" dir="rtl">
//       <head>
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/react-simple-typewriter/1.0.1/react-simple-typewriter.min.css"
//         />
//       </head>
//       <body className={inter.className}>
//         <CartProvider>
//           <div className="flex min-h-screen flex-col">
//             <Header />
//             <main className="flex-1">{children}</main>
//             <Footer />
//           </div>
//           <ToastContainer position="bottom-right" />
//         </CartProvider>
//       </body>
//     </html>
//   )
// }

import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";

import { CartProvider } from "@/contexts/CartContext";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type React from "react";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ترانسيا - خدمات الترجمة الاحترافية",
  description:
    "نقدم خدمات ترجمة احترافية بأكثر من 50 لغة. جودة عالية وسرعة في التنفيذ لجميع أنواع الوثائق والمحتوى.",
  keywords: "ترجمة, خدمات لغوية, ترجمة احترافية, ترجمة عربية, ترجمة إنجليزية",
  authors: [{ name: "ترانسيا للترجمة" }],
  creator: "ترانسيا للترجمة",
  publisher: "ترانسيا للترجمة",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ترانسيا - خدمات الترجمة الاحترافية",
    description:
      "نقدم خدمات ترجمة احترافية بأكثر من 50 لغة. جودة عالية وسرعة في التنفيذ لجميع أنواع الوثائق والمحتوى.",
    url: "https://www.transia.com",
    siteName: "ترانسيا للترجمة",
    images: [
      {
        url: "https://www.transia.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ترانسيا للترجمة",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ترانسيا - خدمات الترجمة الاحترافية",
    description:
      "نقدم خدمات ترجمة احترافية بأكثر من 50 لغة. جودة عالية وسرعة في التنفيذ لجميع أنواع الوثائق والمحتوى.",
    images: ["https://www.transia.com/twitter-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-simple-typewriter/1.0.1/react-simple-typewriter.min.css"
        />
        <link rel="canonical" href="https://www.transia.com" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ToastContainer position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}

