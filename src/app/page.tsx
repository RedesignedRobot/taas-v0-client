import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Welcome to TaaS</h1>
      <p className="text-muted-foreground">A simple authentication demo.</p>
      <div className="flex gap-4">
        <Link href="/sign-in">
          <Button size="lg">Sign In</Button>
        </Link>
        <Link href="/sign-up">
          <Button size="lg" variant="outline">Sign Up</Button>
        </Link>
      </div>
    </main>
  )
}
