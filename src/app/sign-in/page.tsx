"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SignIn() {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    })
    if (res?.error) {
      setError("Invalid credentials")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="max-w-sm mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">Sign in</Button>
      </form>
    </div>
  )
}
