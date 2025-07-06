import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { users } from "@/data/users"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials) return null
        const user = users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        )
        if (user) {
          return { id: user.email, name: `${user.firstName} ${user.lastName}`, email: user.email }
        }
        return null
      }
    })
  ],
  session: { strategy: "jwt" }
})

export { handler as GET, handler as POST }
