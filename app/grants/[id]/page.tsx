"use client"

import { useEffect, useState, use } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Calendar, User, Lock, Shield } from "lucide-react"
import Link from "next/link"
import type { GrantResponse } from "@/lib/coti/types"

export default function GrantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [grant, setGrant] = useState<GrantResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGrant = async () => {
      try {
        const response = await fetch(`/api/grants/${resolvedParams.id}`)
        const data = await response.json()

        if (data.success) {
          setGrant(data.data)
        } else {
          setError(data.error || "Failed to load grant")
        }
      } catch (err) {
        setError("An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGrant()
  }, [resolvedParams.id])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Button asChild variant="ghost">
            <Link href="/grants">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Grants
            </Link>
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : grant ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-5 w-5 text-primary shrink-0" />
                        <Badge variant="secondary">Grant #{grant.id}</Badge>
                      </div>
                      <CardTitle className="text-3xl mb-2">{grant.title}</CardTitle>
                      <CardDescription className="text-base">
                        This grant data is encrypted and stored on the COTI blockchain
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                    <p className="text-base leading-relaxed">{grant.description}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Author</p>
                        <p className="font-medium truncate">{grant.author}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Calendar className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Created</p>
                        <p className="font-medium">
                          {new Date(grant.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div className="space-y-2">
                      <h3 className="font-semibold">Encrypted with COTI MPC</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        This grant was encrypted using Multi-Party Computation before being stored on the COTI
                        blockchain. The plaintext data never appears on-chain, ensuring complete privacy and security
                        for sensitive grant information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
      </main>
    </div>
  )
}
