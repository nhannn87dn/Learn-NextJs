import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
}

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: "/login", //Dẫn đến trang login custom
    // error: "/auth/error", // Custom error page
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async(credentials) => {
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
            throw new Error("UnAuthorized");
          }
          user = {...user, accessToken: tokens.access_token, refreshToken: tokens.refresh_token};
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    
    async jwt({ token, user} : { token: JWT; user: User }) {
      console.log('callbacks jwt', token, user);
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      console.log('callbacks session', token);
      // Create a user object with token properties
      const userObject: AdapterUser = {
        id: token.id,
        avatar: token.avatar,
        name: token.name,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        email: token.email ? token.email : "", // Ensure email is not undefined
        emailVerified: null, // Required property, set to null if not used
      };

      // Add the user object to the session
      session.user = userObject;
      return session;
    },
  },
};



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
