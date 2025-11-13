import Link from "next/link"
import { Shield } from "lucide-react"

export function Navigation() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl hover:text-primary transition-colors">
            <Shield className="h-6 w-6 text-primary" />
            <span>COTI Grant Portal</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/grants" className="text-sm font-medium hover:text-primary transition-colors">
              All Grants
            </Link>
            <Link href="/submit" className="text-sm font-medium hover:text-primary transition-colors">
              Submit
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
