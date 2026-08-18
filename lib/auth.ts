// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Email tidak ditemukan");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Password salah");
        }

        // Kembalikan semua data yang dibutuhkan client, termasuk phone & address
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          phone: user.phone,
          address: user.address,
        };
      },
    }),
  ],
  callbacks: {
    // 1. JWT Callback: Menyimpan data ke dalam token saat login & update
    async jwt({ token, user, trigger, session }) {
      // Saat pertama kali login (object user tersedia)
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.image = user.image;
        token.phone = (user as any).phone;
        token.address = (user as any).address;
      }

      // Saat fungsi update() dipanggil dari client-side (contoh: edit profil)
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.phone) token.phone = session.phone;
        if (session.address) token.address = session.address;
      }

      return token;
    },
    
    // 2. Session Callback: Meneruskan data dari token ke dalam object session
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).image = token.image;
        (session.user as any).phone = token.phone;
        (session.user as any).address = token.address;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};