import { Suspense } from "react"
import RequestQuoteContent from "./request-quote-content"

export default function RequestQuotePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RequestQuoteContent />
    </Suspense>
  )
}

