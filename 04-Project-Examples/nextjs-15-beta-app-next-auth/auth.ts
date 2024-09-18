import NextAuth from "next-auth"
import "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { UserType } from "./types/user";
import type {NextAuthConfig,  Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";


const config = {
  providers: [
    //Login Custom với email, password
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async(credentials) => {
          try {
                  if (!credentials?.email || !credentials.password) {
                      return null;
                  }

                  const payload = {
                      email: credentials.email,
                      password: credentials.password,
                  };
          
                  console.log('<<=== 🚀 payload ===>>',payload);
          
                  const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                      method: 'POST',
                      body: JSON.stringify(payload),
                      headers: {
                      'Content-Type': 'application/json',
                      },
                  });
          
                  const tokens = await res.json();
          
                  console.log('<<=== 🚀 tokens ===>>',tokens);
          
                  if (!res.ok) {
                      throw new Error("UnAuthorized");
                  }
                  // If no error and we have user data, return it
                  if (res.ok && tokens) {
                      const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile',
                      {
                      headers: {
                          'Authorization': `Bearer ${tokens.access_token}`,
                      },
                      });
                      let user = await res.json();
                      if (!res.ok) {
                          console.error("Error during authentication");
                          return null;
                      }
                      user = {...user, accessToken: tokens.access_token, refreshToken: tokens.refresh_token};
                      return user;
                  }
          
                  // Return null if user data could not be retrieved
                  return null;

          } catch (error) {
              console.error("Error during authentication", error);
              return null;
          }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      console.log('token', token);
      console.log('user', user);
      // Add the user properties to the token after signing in
      if (user) {
          token.id = parseInt(user.id as string);
          token.avatar = user.avatar;
          token.name = user.name;
          token.email = user.email;
          token.role = user.role;
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
      }
      return token;
  },
  async session({ session, token }: { session: Session; token: JWT }) {
      // Create a user object with token properties
      const userObject: AdapterUser = {
        id: token.id.toString(),
        avatar: token.avatar,
        name: token.name,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        role: token.role,
        email: token.email ? token.email : "", // Ensure email is not undefined
        emailVerified: null, // Required property, set to null if not used
      };

      // Add the user object to the session
      session.user = userObject;

      return session;
    },
  },
  pages: {
    signIn: "/login", //Dẫn đến trang login custom
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)


declare module "next-auth" {
  interface User extends UserType {}
}

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserType {}
}
