import { getDictionary } from "@/lib/dictionary"
import ServicesContent from "./services-content"
import type { Locale } from "../layout"

export default async function ServicesPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return <ServicesContent dict={dict} />
}

