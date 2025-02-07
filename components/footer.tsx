import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">عن الشركة</h3>
            <p className="text-sm">خدمات الترجمة ترانسيا هي شركة رائدة في مجال الترجمة والخدمات اللغوية.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-primary transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-primary transition-colors">
                  عن الشركة
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <p className="text-sm mb-2">البريد الإلكتروني: info@transia.com</p>
            <p className="text-sm">الهاتف: +966 12 345 6789</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-sm">© 2025 خدمات الترجمة ترانسيا. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}

