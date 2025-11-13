"use client"

import { Navigation } from "@/components/navigation"
import { GrantForm } from "@/components/grant-form"
import { useRouter } from "next/navigation"

export default function SubmitPage() {
  const router = useRouter()

  const handleSuccess = (id: number) => {
    setTimeout(() => {
      router.push(`/grants/${id}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Submit New Grant</h1>
            <p className="text-lg text-muted-foreground">
              Your grant data will be encrypted using COTI MPC before being stored on the blockchain
            </p>
          </div>

          <GrantForm onSuccess={handleSuccess} />
        </div>
      </main>
    </div>
  )
}
