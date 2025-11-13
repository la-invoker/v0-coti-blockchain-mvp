"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Lock } from "lucide-react"

export function GrantForm({ onSuccess }: { onSuccess?: (id: number) => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [author, setAuthor] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/grants/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          author: author || undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Grant Submitted Successfully",
          description: `Your grant has been encrypted and stored on-chain. ID: ${data.data.id}`,
        })
        // Reset form
        setTitle("")
        setDescription("")
        setAuthor("")
        onSuccess?.(data.data.id)
      } else {
        toast({
          title: "Submission Failed",
          description: data.error || "Failed to submit grant",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          <CardTitle className="text-2xl">Submit Encrypted Grant</CardTitle>
        </div>
        <CardDescription>Your grant data will be encrypted using COTI MPC and securely stored on-chain</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Grant Title *</Label>
            <Input
              id="title"
              placeholder="Enter grant title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your grant proposal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isSubmitting}
              className="min-h-32 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author (Optional)</Label>
            <Input
              id="author"
              placeholder="Your name or organization"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">If not provided, your wallet address will be used</p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Encrypting & Submitting...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Submit Encrypted Grant
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
