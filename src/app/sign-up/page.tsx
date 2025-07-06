"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SignUp() {
  const router = useRouter()
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" })
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push("/sign-in")
    } else {
      const data = await res.json()
      setError(data.error || "Error")
    }
  }

  return (
    <div className="max-w-sm mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">Create account</Button>
      </form>
    </div>
  )
}
