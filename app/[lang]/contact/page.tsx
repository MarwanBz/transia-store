import { getDictionary } from "@/lib/dictionary"
import ContactContent from "./contact-content"
import type { Locale } from "../layout"

export default async function ContactPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return <ContactContent dict={dict} />
}

