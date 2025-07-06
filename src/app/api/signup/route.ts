import { NextResponse } from "next/server"
import { users } from "@/data/users"

export async function POST(request: Request) {
  const body = await request.json()
  const { firstName, lastName, email, password } = body
  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }
  if (users.find((u) => u.email === email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }
  users.push({ firstName, lastName, email, password })
  return NextResponse.json({ success: true })
}
