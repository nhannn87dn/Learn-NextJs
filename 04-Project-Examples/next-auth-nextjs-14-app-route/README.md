# Next Auth

Hướng dẫn này áp dụng cho:

- next: 14.2.11
- next-auth: ^4.24.7

## Bước 1 - Cài đặt ứng dụng NextJs

### Cài đặt NextJs

Bạn nhập lệnh sau và Terminal

```bash
npx create-next-app@latest
```

Sau đó nhập tên project

```bash
√ What is your project named? ... next-auth-nextjs-app-route
```

Sau đó Enter rồi thực hiện chọn như sau:

```bash
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias (@/*)? ... No / Yes
√ What import alias would you like configured? ... @/*
```

Kết quả được một project NextJs có cấu trúc thư mục cơ bản:

```code
next-auth-nextjs-app-route/
├─ node_modules/
├─ public/
├─ app/
│  ├─ layoyut.tsx
│  ├─ global.css
│  ├─ page.tsx
├─ package.json
├─ README.md
```

## Bước 2 -  Custom lại các trang

Bạn mở file `app/globals.css` xóa hết các dòng css. Sau đó sửa thành như sau

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    button {
        @apply bg-indigo-500 hover:bg-indigo-600 py-1 px-3 rounded border-0 text-white
    }
    input {
        @apply py-1 px-3 rounded bg-white border border-slate-300
    }
}
```

Tiếp đó bạn tạo các trang theo cấu trúc sau đây

```code
app/
├─ auth/
│  ├─ login/
│  │  ├─ page.tsx
├─ customers/
│  ├─ profile/
│  │  ├─ page.tsx
│  ├─ orders/
│  │  ├─ page.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
├─ layout.tsx
├─ page.tsx
```

1. `app/page.tsx` sửa thành

```javascript
export default function Home() {
  return (
    <>
    <h1>Home Page</h1>
    </>
  );
}
```


2. `app/auth/login/page.tsx` sửa thành

```js
"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex max-w-[400px] mx-auto min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          type="text"
          autoComplete="off"
          required
          value={formData.email || ""}
          onChange={handleChange}
          className="w-full"
        />

        <input
          placeholder="Password"
          name="password"
          type="password"
          autoComplete="off"
          required
          value={formData.password || ""}
          onChange={handleChange}
          className="w-full"
        />

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default LoginPage;

```


3. `app/customer/page.tsx` sửa thành


```js
const CustomerProfilePage = () => {
  return (
      <>
      <h1>Dashboard Page</h1>
      <p>Welcome to the customer Dashboard page.</p>
      </>
  )
}

export default CustomerProfilePage
```

4. `app/customer/layout.tsx` sửa thành

```js
import Link from "next/link"

const CustomerLayout = ({children} : {children: React.ReactNode}) => {
    return (
      <div className="flex gap-x-5">
        <div className="customer_nav w-[200px] flex flex-col gap-y-4 bg-slate-200 p-4">
            <Link href={'/customers'}>Dashboard</Link>
            <Link href={'/customers/profile'}>Profile</Link>
            <Link href={'/customers/orders'}>Order</Link>
        </div>
        <div className="layout_content flex-1">
            {children}
        </div>
      </div>
    )
  }
  
  export default CustomerLayout
```

5. `app/customer/profile/page.tsx` sửa thành


```js
const CustomerProfilePage = () => {
  return (
    <div>page</div>
  )
}

export default CustomerProfilePage
```


6. `app/customer/orders/page.tsx` sửa thành


```js
const CustomerOrdersPage = () => {
    return (
      <div>CustomerOrdersPage</div>
    )
  }
  
  export default CustomerOrdersPage
```


7. Tạo một component Header `components/Header.tsx` sửa thành


```js
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Logo</h1>
        <div className="space-x-4">
          <Link href="/">
            Home
          </Link>
          <Link href="/customers">
            Customers
          </Link>
         {/* TODO: Thay đổi trạng thái sau khi login */}
          <Link href="/auth/login">
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}
```

8. Sửa file `app/layout.tsx` sửa thành

```js
import Link from "next/link"

const CustomerLayout = ({children} : {children: React.ReactNode}) => {
    return (
      <div className="flex gap-x-5">
        <div className="customer_nav w-[200px] flex flex-col gap-y-4 bg-slate-200 p-4">
            <Link href={'/customers'}>Dashboard</Link>
            <Link href={'/customers/profile'}>Profile</Link>
            <Link href={'/customers/orders'}>Order</Link>
        </div>
        <div className="layout_content flex-1">
            {children}
        </div>
      </div>
    )
  }
  
  export default CustomerLayout
```


## Bước 3 - Xác thực với Next Auth

Theo cấu trúc Route

```code
app/
├─ auth/
│  ├─ login/
│  │  ├─ page.tsx
├─ customers/
│  ├─ profile/
│  │  ├─ page.tsx
│  ├─ orders/
│  │  ├─ page.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
├─ layout.tsx
├─ page.tsx
```

thì tất cả các URL bắt đầu là `/customers` cần phải bảo vệ. Tức là yêu cầu đăng nhập mới xem được các trang này.

Áp dụng thư viện `Next Auth` (Hệ sinh thái của Vercel) để xác thực

Xem tài liệu chính thức: https://next-auth.js.org/getting-started/example

### 3.1 Bước 1 - Cài đặt Next Auth

```bash
yarn add next-auth
# hoặc
npm i next-auth
```


### 3.2 Bước 2 - Tạo biến môi trường

Bạn mở file `next.config.mjs` sửa thành

```js
const nextConfig = {
    env: {
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_SECRET:'QDSbk0zExBkwRf2NgoesZ6XOvzD5qBf6tkF5dcZtkWk='
    }
};

export default nextConfig;

```

Cách tạo secret: https://next-auth.js.org/configuration/options#secret


### 3.3 Bước 3 - Cấu hình Credentials Provider

Do theo follow Backend chúng ta xác thực với bằng email và mật khẩu và trả lại token để client truyền lên header cho những request yêu cầu xác thực.

Do vậy chúng ta sử dụng `Credentials Provider` : https://next-auth.js.org/configuration/providers/credentials

Bạn tạo một file `auth.ts`


```code
next-auth-nextjs-app-route/
├─ node_modules/
├─ app/
│  ├─ layoyut.tsx
│  ├─ global.css
│  ├─ page.tsx
├─ auth.tsx
├─ package.json
├─ README.md
```

Tổng quan về code của nó như sau:

```js
import NextAuth from "next-auth"
import "next-auth/jwt"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [], //(1)
    callbacks: {},  //(2)
    session: {},  //(3)
    pages: {},  //(4)
    debug: process.env.NODE_ENV !== "production" ? true : false,  //(5)
}

export const {auth} = NextAuth(authOptions)
```

Dưới đây là giải thích chi tiết các thuộc tính trong đối tượng `authOptions` với kiểu dữ liệu `NextAuthOptions` của NextAuth.js:

### 1. **providers**:
   - Đây là một **mảng** chứa danh sách các provider mà ứng dụng sẽ sử dụng để đăng nhập người dùng.
   - Các provider có thể là **OAuth** (Google, Facebook, GitHub, v.v.), **Email** hoặc các dịch vụ **credentials** (dùng username/password).
   - Mỗi provider sẽ có một cấu hình riêng để xử lý việc xác thực (authentication).

   Ví dụ thêm một số provider:
   ```js
   providers: [
     Providers.Google({
       clientId: process.env.GOOGLE_CLIENT_ID,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     }),
     Providers.GitHub({
       clientId: process.env.GITHUB_CLIENT_ID,
       clientSecret: process.env.GITHUB_CLIENT_SECRET,
     })
   ]
   ```

### 2. **callbacks**:
   - Đây là một đối tượng chứa các **hàm callback** để tùy chỉnh hành vi của NextAuth trong các giai đoạn khác nhau của quá trình xác thực.
   - Một số callback phổ biến:
     - `signIn`: Được gọi khi người dùng đăng nhập.
     - `redirect`: Được gọi khi cần chuyển hướng người dùng sau khi đăng nhập.
     - `session`: Được gọi khi phiên (session) được kiểm tra hoặc cập nhật.
     - `jwt`: Được gọi khi JWT (JSON Web Token) được tạo hoặc cập nhật.

   Ví dụ:
   ```js
   callbacks: {
     async signIn(user, account, profile) {
       // Kiểm tra xem người dùng có quyền đăng nhập hay không
       return true;
     },
     async session(session, token) {
       // Tùy chỉnh thông tin phiên trước khi trả về cho client
       session.userId = token.sub;
       return session;
     },
     async jwt(token, user) {
       // Lưu trữ thông tin vào token JWT
       if (user) {
         token.userId = user.id;
       }
       return token;
     }
   }
   ```

### 3. **session**:
   - Thuộc tính này được dùng để cấu hình cách NextAuth xử lý **session**.
   - Có hai cách quản lý session chính:
     - **JWT (JSON Web Token)**: Mặc định NextAuth sử dụng JWT để quản lý session.
     - **Database session**: Bạn có thể chọn lưu session trong cơ sở dữ liệu.

   Ví dụ:
   ```js
   session: {
     strategy: "jwt", // Dùng JWT cho session
     maxAge: 30 * 24 * 60 * 60, // Thời gian sống của session (30 ngày)
     updateAge: 24 * 60 * 60, // Cập nhật session mỗi ngày
   }
   ```

### 4. **pages**:
   - Cung cấp các đường dẫn (URL) tùy chỉnh cho các trang mặc định của NextAuth như đăng nhập, đăng xuất, lỗi, v.v.
   - Bạn có thể chỉ định các URL để NextAuth chuyển hướng người dùng đến các trang tùy chỉnh thay vì các trang mặc định.

   Ví dụ:
   ```js
   pages: {
     signIn: '/auth/signin', // Trang đăng nhập tùy chỉnh
     error: '/auth/error', // Trang lỗi tùy chỉnh
     signOut: '/auth/signout', // Trang đăng xuất tùy chỉnh
   }
   ```

### 5. **debug**:
   - Thuộc tính này là một **boolean** cho phép bật chế độ **gỡ lỗi** (debug mode).
   - Nếu `debug: true`, NextAuth sẽ ghi lại các thông tin lỗi, trạng thái, và các hoạt động bên trong quá trình xác thực.
   - Thông thường, bạn sẽ bật debug trong môi trường phát triển và tắt nó trong môi trường sản xuất.

   Ví dụ:
   ```js
   debug: process.env.NODE_ENV !== "production" ? true : false
   ```

   Điều này có nghĩa là khi ứng dụng đang ở chế độ phát triển (`NODE_ENV !== "production"`), chế độ debug sẽ được bật.

---

Cuối cùng code đầy đủ của `auth.ts` như sau:


```js
import NextAuth from "next-auth"
import "next-auth/jwt"
import type { NextAuthOptions, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";


interface UserType {
    id: number;
    name: string;
    email: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
}

//Export ra cho API Route và SessionProvider dùng
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
              id: token.id.toString(),
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

//Export ra để sử dụng trong các server component
export const {auth} = NextAuth(authOptions)


// Tùy chỉnh mở rộng lại TypeScript
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
```


### 3.3 Bước 3 - Thêm API route

Bạn tạo file `api/auth/[...nextauth]/route.ts`

Xem tài liệu: https://next-auth.js.org/configuration/initialization#route-handlers-app

```js
import NextAuth from "next-auth"
import {authOptions} from '@/auth'
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

### 3.4 Bước 4 - Thêm Middleware

Mục đích của `Middleware` để bảo vệ các routes cần yêu cầu xác thực.

Tạo file `middleware.ts` ngang cấp với `auth.ts`

```js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
});

export const config = {
  matcher: ["/customers/:path*"], // Áp dụng middleware cho tất cả các route bắt đầu bằng /customers
};
```


### 3.5 Bước 5 - Chạy thử

Sau khi làm hết các bước trên, bạn thử login với tài khoản tại: https://fakeapi.platzi.com/en/rest/auth-jwt/

- Nếu thành công thì nó chuyển sang trang `/customers`
- Nếu đăng nhập thất bại thì nó chuyển sang `/api/auth/error`

## Bước 4 - Tối ưu UX-UI

### Bạn cần tối ưu vấn đề gì ?

1. Liên kết Login trên header, sau khi login thành công thì nó cần chuyển trạng thái thành: Tên của User + Avatar nếu có + Nút Logout.
2. Nếu Login không đúng tài khoản thì phải báo lỗi tại form login cho người dùng thấy và nhập lại.

### Giải quyết vấn đề

#### Vấn đề 1

Bạn Tạo một component `/components/UserArea.tsx` với nội dung như sau:

```js
'use client'
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react";

const UserArea =  () => {
  //DOc: https://next-auth.js.org/getting-started/client#usesession
    const { data: session } = useSession();
    if(!session?.user){
        return (
            <>
             <Link href="/auth/login">
            Login
            </Link>
            </>
        )
    }
    return (
        <>
        <strong>{session.user.name}</strong>
        <button onClick={()=>{
            signOut()
        }}>Logout</button>
        </>
    )
 
}

export default UserArea
```

- Component này sử dụng Hook nên bạn cần chuyển nó thành `client component` với `use client`
- Để Hook `useSession` hoạt động được các bạn cần làm một bước nữa là cấu hình SessionProvider (Xem: https://next-auth.js.org/getting-started/client#usesession)

Bạn tạo một file `components/providers/authSessionProviders.tsx` với nội dung sau:

```js
"use client";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
```

Sau đó cấu hình lại file `app/layout.tsx` như sau:

```js
//Import vào trên đầy
import { NextAuthProvider } from "@/components/providers/authSessionProviders";
```

Sau đó sửa lại phần thân. `NextAuthProvider` Bao lấy các thành phần cần sử dụng session vào trong (làm children)

```js
<html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
            <Header />
            <main className="container mx-auto my-4">
            {children}
            </main>
        </NextAuthProvider>
      </body>
    </html>
```

Tiếp đến sửa lại Link Login trên `Header.tsx` thành

```js
//IMport lên đầu
import UserArea from './UserArea';
```

Đổi thành sử dụng component `UserArea`

```js
{/* <Link href="/login">
    Login
  </Link> */}
<UserArea />
```

#### Vấn đề 2

Bạn sửa phần `app/auth/login/page.tsx` thành như sau:


```js
//Đổi lại là Server Component
import LoginForm from "@/components/LoginForm";
import {getServerAuthSession} from '@/auth'
import { permanentRedirect } from 'next/navigation'

const Page = async () => {
  const authSession = await getServerAuthSession(); //(1)
  //Nếu đã login rồi thì trả về lại trang customer
  if(authSession?.user){
    permanentRedirect(`/customers`)
  }
  return <LoginForm />
}

export default Page
```

Trong đó `LoginForm` được tách thành `client component` với code như sau:

```js
"use client";
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent,  useState } from "react";


type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/customers';
  const [msg, setMsg] = useState('');
  const router = useRouter()



  const [loading, setLoading] = useState({
    emailLoading: false,
    googleLoading: false,
    facebookLoading: false
  });


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading({
      ...loading,
      emailLoading: true,
    });
    /*
    Hàm signIn() sẽ return lại trạng thái login
    Dựa vào đó để handle
    */
    const resSignIn = await signIn("credentials", {
      redirect: false, // tắt tự động chuyển, để handle lỗi login
      email: formData.email,
      password: formData.password,
      callbackUrl: callbackUrl
    });

    console.log(resSignIn);
    if (!resSignIn?.error) {
      setLoading({
        ...loading,
        emailLoading: false,
      });
      setMsg('Login thành công !');
      //Tự mình làm chuyển hướng khi login thành công
      router.push(callbackUrl);
    } else {
      setLoading({
        ...loading,
        emailLoading: false,
      });
      setMsg('invalid email or password');
    }
  };

  return (
    <div className="flex max-w-[400px] mx-auto min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {msg !== '' && <p className="py-3 my-4 text-orange-500">{msg}</p>}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          type="text"
          autoComplete="off"
          required
          value={formData.email || ""}
          onChange={handleChange}
          className="w-full"
        />

        <input
          placeholder="Password"
          name="password"
          type="password"
          autoComplete="off"
          required
          value={formData.password || ""}
          onChange={handleChange}
          className="w-full"
        />

    <button className="w-full" type="submit" disabled={loading.emailLoading}>
        {loading.emailLoading ? 'SignInning...' : 'Sign In'}
      </button>
      </form>
    </div>
  );
};

export default LoginForm;

```

Được bổ sung một số state để làm cho UI trở nên UX hơn.


## Bước 5 - Sử dụng Session của Next Auth

Session nắm giữ những thông tin của User sau khi login thành công. Bạn có thể sử dụng các thông tin này để hiển thị, gọi API.

### Session cho Client Component

- Sử dụng `useSession()`: https://next-auth.js.org/getting-started/client#usesession
- Sử dụng `getSession`: https://next-auth.js.org/getting-started/client#getsession

### Session cho Server Component, Route Handlers

- Sử dụng `getServerSession`: https://next-auth.js.org/configuration/nextjs#getserversession