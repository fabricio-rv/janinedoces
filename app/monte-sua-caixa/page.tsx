import { Suspense } from "react"
import MonteSuaCaixaClient from "./monte-sua-caixa-client"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <MonteSuaCaixaClient />
    </Suspense>
  )
}
