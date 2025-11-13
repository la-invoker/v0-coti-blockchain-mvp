import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Database, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Shield className="h-4 w-4" />
              Powered by COTI MPC
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Encrypted Grant Portal
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Submit and retrieve grant data securely on-chain using COTI&apos;s Multi-Party Computation technology
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg">
                <Link href="/submit">
                  <Lock className="mr-2 h-5 w-5" />
                  Submit Grant
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-transparent">
                <Link href="/grants">View All Grants</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose COTI MPC?</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">End-to-End Encryption</h3>
                  <p className="text-muted-foreground">
                    All grant data is encrypted client-side before submission. No plaintext ever touches the blockchain.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Database className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">On-Chain Storage</h3>
                  <p className="text-muted-foreground">
                    Encrypted data is permanently stored on the COTI blockchain with complete immutability.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-chart-3" />
                  </div>
                  <h3 className="text-xl font-semibold">Fast Retrieval</h3>
                  <p className="text-muted-foreground">
                    Decrypt and retrieve your grant data instantly using your MPC keys.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 border-t border-border">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground">Submit your first encrypted grant in minutes</p>
            <Button asChild size="lg">
              <Link href="/submit">Submit Your Grant Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            Built with COTI Testnet • MPC-Secured • On-Chain Encrypted Storage
          </p>
        </div>
      </footer>
    </div>
  )
}
