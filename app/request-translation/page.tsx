import { Suspense } from "react"
import RequestTranslationContent from "./request-translation-content"

export default function RequestTranslationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RequestTranslationContent />
    </Suspense>
  )
}

