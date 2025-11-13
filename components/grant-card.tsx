import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Lock } from "lucide-react"
import Link from "next/link"

interface GrantCardProps {
  id: number
  title: string
  description: string
  author: string
  created_at: string
}

export function GrantCard({ id, title, description, author, created_at }: GrantCardProps) {
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link href={`/grants/${id}`} className="block group">
      <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </CardTitle>
              <CardDescription className="line-clamp-3">{description}</CardDescription>
            </div>
            <Badge variant="secondary" className="shrink-0">
              <Lock className="h-3 w-3 mr-1" />#{id}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="truncate">{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
