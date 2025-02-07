import { getDictionary } from "@/lib/dictionary"
import HomeContent from "./home-content"
import type { Locale } from "./layout"

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return <HomeContent dict={dict} />
}

