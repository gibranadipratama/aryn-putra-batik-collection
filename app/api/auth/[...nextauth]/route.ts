import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi");
        }

        // Cari user di database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Email tidak terdaftar");
        }

        // Cocokkan password
        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordMatch) {
          throw new Error("Password salah");
        }

        // Jika berhasil, kembalikan data user
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    // Memasukkan role ke dalam token dan session agar bisa dibaca di seluruh aplikasi
    async jwt({ token, user }) {
  if (user) {
    token.role = (user as any).role;
    token.id = user.id;
    token.image = (user as any).image; // <-- Masukkan image ke token
  }
  return token;
},
async session({ session, token }) {
  if (session.user) {
    (session.user as any).role = token.role;
    (session.user as any).id = token.id;
    session.user.image = token.image as string; // <-- Masukkan image ke session
  }
  return session;
}
  },
  pages: {
    signIn: "/login", 
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };