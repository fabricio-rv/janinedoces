import { Suspense } from "react"
import MonteSeuOvoClient from "./monte-seu-ovo-client"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <MonteSeuOvoClient />
    </Suspense>
  )
}