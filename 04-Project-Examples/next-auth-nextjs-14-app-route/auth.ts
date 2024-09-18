import NextAuth, { getServerSession } from "next-auth"
import "next-auth/jwt"
import type { NextAuthOptions, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";


interface UserType {
    id: string;
    name: string;
    email: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text", placeholder: "Email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
               const { email, password } = credentials as {
                email: string
                password: string
               };
               const payload = {
                email,
                password
              };
              //GỌI API để login xác thực
              const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              //Handle lỗi nếu gọi API thất bại
              if (!response.ok) {
                throw new Error("UnAuthorized");
              }
              // Nếu thành công thì trích xuất lấy tokens: access_token, refresh_token
              const tokensResponse = await response.json();

              //Gọi API lấy profile của User đã login
                const resProfile = await fetch('https://api.escuelajs.co/api/v1/auth/profile',
                {
                  headers: {
                    'Authorization': `Bearer ${tokensResponse.access_token}`,
                  },
                });

                if (!resProfile.ok) {
                    throw new Error("UnAuthorized");
                }

                let user = await resProfile.json();
                //Mở rộng user, thêm 2 thuộc tính accessToken và refreshToken
                user = {...user, accessToken: tokensResponse.access_token, refreshToken: tokensResponse.refresh_token};
                return user;

                // Return null if user data could not be retrieved
                return null;
            }
          }),
    ],
    //Xem doc: https://next-auth.js.org/configuration/options#callbacks
    callbacks: {
        async jwt({ token, user} : { token: JWT; user: User }) {
            console.log('callbacks jwt', token, user);
            if (user) {
                return {
                ...token,
                //Bổ sung vào token 2 thuộc tính accessToken, refreshToken
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
    //Xem doc: https://next-auth.js.org/configuration/options#session
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    // Xem doc: https://next-auth.js.org/configuration/options#pages
    pages: {
        signIn: "/auth/login",
    },
    //Xem doc: https://next-auth.js.org/configuration/options#debug
    debug: process.env.NODE_ENV !== "production" ? true : false,
}

export const {handlers, auth} = NextAuth(authOptions)

export const getServerAuthSession = () => getServerSession(authOptions); 


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