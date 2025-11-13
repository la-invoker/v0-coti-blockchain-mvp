"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { GrantCard } from "@/components/grant-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Database } from "lucide-react"
import type { GrantResponse } from "@/lib/coti/types"

export default function GrantsPage() {
  const [grants, setGrants] = useState<GrantResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        const response = await fetch("/api/grants")
        const data = await response.json()

        if (data.success) {
          setGrants(data.data)
        } else {
          setError(data.error || "Failed to load grants")
        }
      } catch (err) {
        setError("An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGrants()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Database className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">All Grants</h1>
            </div>
            <p className="text-lg text-muted-foreground">Browse all encrypted grants stored on the COTI blockchain</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full" />
                </div>
              ))}
            </div>
          ) : grants.length === 0 ? (
            <Alert>
              <Database className="h-4 w-4" />
              <AlertTitle>No Grants Found</AlertTitle>
              <AlertDescription>No grants have been submitted yet. Be the first to submit one!</AlertDescription>
            </Alert>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grants.map((grant) => (
                <GrantCard
                  key={grant.id}
                  id={grant.id}
                  title={grant.title}
                  description={grant.description}
                  author={grant.author}
                  created_at={grant.created_at}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
