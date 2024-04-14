# Learn NextJs - App Router

## 🎯 Cách cài đặt Next.js

Doc: <https://nextjs.org/docs/getting-started/installation>

Để bắt đầu với Next.js, chúng ta cần cài đặt Node.js và npm trên máy tính của mình. Sau đó, có thể sử dụng lệnh sau để tạo một dự án Next.js mới:

```bash
npx create-next-app my-next-app
yarn create next-app my-next-app
```

Quá trình cài đặt sẽ có các bước:

```html
What is your project named? my-app
Would you like to use TypeScript? No / Yes ==> Yes
Would you like to use ESLint? No / Yes ==> Yes
Would you like to use Tailwind CSS? No / Yes ==> Yes
Would you like to use `src/` directory? No / Yes ==> No
Would you like to use App Router? (recommended) No / Yes ==> Yes
Would you like to customize the default import alias? No / Yes ==> Yes
What import alias would you like configured? @/* ==> @/*
```

Lưu ý: Trong quá trình tạo dự án, bạn sẽ có cơ hội chọn giữa JavaScript và TypeScript. Hãy chọn TypeScript nếu bạn muốn sử dụng Next.js với TypeScript.

Lệnh trên sẽ tạo một thư mục mới có tên "my-next-app

" và cài đặt các phụ thuộc cần thiết cho dự án Next.js. Bạn có thể điều hướng vào thư mục dự án và chạy lệnh sau để khởi chạy máy chủ phát triển:

```bash
cd my-next-app
npm install #cài đặt packages với npm
yarn #cài đặt packages với yarn
#sau đó 
npm run dev #start server với npm
yarn dev #start server với yarn
```

Sau khi máy chủ phát triển đã khởi chạy thành công, bạn có thể truy cập vào ứng dụng Next.js của mình bằng cách mở trình duyệt và truy cập địa chỉ http://localhost:3000.

---

## 🎯 Cấu trúc dự án

Bạn cần tuân thủ theo cách tổ chức project: cấu trúc thư mục, cặt đặt tên thư mục, file như Nextjs đã khuyến nghị.

Cụ thể xem: <https://nextjs.org/docs/getting-started/project-structure>

---

## 🎯 Hiển thị Hello World với NextJs

- Giải thích cách hoạt động của NextJs với App Router

- Thử tạo một component HelloWord xem NextJS có khác gì ReactJS không?

- Follow xử lý trong NextJS thế nào ?

---

## 🎯 Cách định nghĩa Routes

Xem chi tiết: https://nextjs.org/docs/app/building-your-application/routing/defining-routes

### 💥 Static Route

Cách tạo routes thông qua hình họa sau:

![routes](img/defining-routes.avif)

Bạn muốn có một URL: /dashboard: thì trong folder app bạn tạo một folder dashboard, và trong folder dashboard tạo tiếp một file pages.tsx


```html
├── app
│   ├── dashboard
│   │   ├── page.tsx
│   ├── page.tsx
```
**app/dashboard/page.tsx** có nội dung như sau:
```js
export default function Page() {
  return <h1>Hello, Dashboard Page!</h1>
}
```
Lưu ý: Bạn có thể đổi tên `Page` thành tên khác để phân biệt nếu muốn.


![router](img/router-defined.png)

Bạn muốn có một URL: `/dashboard/settings` thì trong folder dashboard bạn tạo một folder settings, và trong folder settings tạo tiếp một file `page.tsx`

```html
├── app
│   ├── dashboard
│   │   ├── page.tsx
│   │   ├── settings
│   │   │   ├── page.tsx
│   ├── page.tsx
```

Kết luận: 

- bạn muốn URL như thế nào thì trong folder app tạo thư mục tương ứng với cấu trúc của URL
- folder đó được hiểu là route khi và chỉ khi nó chứa file `page.tsx`

### 💥 Route Groups

Là cách tổ chức cấu trúc route nhưng không phát sinh `segment` (URL).

Giúp bạn phân vùng quản lý các routes có tính năng liên quan lại một nhóm.

![route-groups](img/route-groups.png)

Tổ chức folder trong cặp ngoặc tròn `)marketing)`

Xem chi tiết: https://nextjs.org/docs/app/building-your-application/routing/route-groups


### 💥 Dynamic Routes

Để tạo một `Dynamic routes` bạn tạo folder và đặt tên trong cặp nguộc vuông. Ví dụ: `[id]`, `[slug]`

Cấu trúc như sau:


```html
app
├── blog
│   ├── [slug]
│       ├── page.tsx  
├── layout.jsx
|── page.tsx
```
Bạn sẽ nhận được tương ứng

|  URL | Params        |
| ----------- | ------------- |
| /blog/a     | { slug: 'a' } |
| /blog/b     | { slug: 'b' } |
| /blog/c     | { slug: 'c' } |

`slug` được là param và giá trị của nó biến động theo phần `segment` phía sau `/blog/` khi bạn truyền lên URL.

Xem chi tiết: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes


### 💥 Route Handlers

Route Handlers cho phép bạn tạo ra request và response API.

Hay hiểu đơn giản nó có thể làm công việc backend, tạo ra hệ thống RESTFUL API như NodeJs và ExpressJs

#### Định nghĩa một Resource API


```html
app
├── api
│   ├── users
│       ├── route.ts  
├── layout.jsx
|── page.tsx
```

Đơn giản, chỉ cần bạn tạo một folder bên trong app và đặt vào đó một file có tên `route.ts` thì NextJS hiểu đó là một Route handler

Ví dụ về một resource API Users


```html
app
├── api
│   ├── users
│   │   ├── [id]
│   │   │   ├── route.ts
│       ├── route.ts  
├── layout.jsx
|── page.tsx
```
Trong đó `api/users/route.ts` như sau:

```ts
const users = [
    {id: 1, name: 'David'},
    {id: 2, name: 'Tom'}
]
//GET api/users
export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  // query is "Tom" for /api/users?name=Tom

    /**
     * Ở đây bạn có thể liên kết trược tiếp với Dababase
     * Hoặc có thể gọi API
     *  */
   
    //getAll
    return Response.json(users)
}

//POST api/users

export async function POST(request: Request) {
    const body = await request.json();
    return Response.json(body)
}
```

Trong đó `api/users/[id]/route.ts` như sau:

```ts
const users = [
    {id: 1, name: 'David'},
    {id: 2, name: 'Tom'}
]
//GET api/users/:id
export async function GET(request: Request,
    { params }: { params: { id: string } }) {

    const id = params.id
    console.log('API users/:id',id);
    /**
     * Ở đây bạn có thể liên kết trược tiếp với Dababase
     * Hoặc có thể gọi API
     *  */
    //getById
    if(id){
        const user = users.find(u=> u.id == parseInt(id));
        return Response.json(user)
    }
    return Response.json({
        message: 'ID not undefined'
    })
    
}

//PUT api/users/:id
export async function PUT(request: Request,
    { params }: { params: { id: string } }) {

}

//DELETE api/users/:id
export async function DELETE(request: Request,
    { params }: { params: { id: string } }) {

}
```


Bạn có thể tìm thấy tất cả vấn đề liên quan tại: https://nextjs.org/docs/app/building-your-application/routing/route-handlers


---

## 🎯 Pages

Trong NextJS (App Router) `page.tsx` được xem như là EntryPoint

- page chấp nhận kiểu mở rộng .js, .jsx, .tsx
- page mặc định là **Server Components** nhưng bạn có thể chuyển qua Client Components
- pages có thể fetch data để lấy thông tin qua API

Xem chi tiết: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages

---

## 🎯 Link và Navigation

Có 2 cách để chuyển hướng giữa các routes trong NextJS:

- Sử dụng `<Link>` Component
- Sử dụng `useRouter` hook (Client Components)
- Sử dụng `redirect` function (Server Components)
- Sử dụng native History API

### 💥 Link

Ví dụ:

```tsx
/* app/page.tsx */
import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

Xem chi tiết: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#link-component

### 💥 useRouter() Hook

Hook này chỉ cho phép sử dụng trong Client Components


```js
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}

```

Xem chi tiết: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#userouter-hook

### 💥 redirect function

Hàm này này chỉ cho phép sử dụng trong Server Components

```tsx
import { redirect } from 'next/navigation'
 
async function fetchTeam(id: string) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}
 
export default async function Profile({ params }: { params: { id: string } }) {
  const team = await fetchTeam(params.id)
  if (!team) {
    redirect('/login')
  }
 
  // ...
}
```

Xem chi tiết: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#redirect-function

### 💥 native History API

Xem chi tiết: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#using-the-native-history-api

---
Xem thêm  chuyển hướng tại:

- https://nextjs.org/docs/app/building-your-application/routing/redirecting

---

## 🎯 Layouts

### 🔸 Định nghĩa 1 layout

Trong NextJS (app router) bạn muốn trang nào có layout riêng thì trong folder route bạn tạo một file `layout.tsx`

Ví dụ bạn muốn /dashboard có layout khác đi

![layout](img/layout-special-file.avif)

Trong folder dashboard tạo file layout.tsx, layout này sẽ dùng chung cho tất cả các URL bắt đầu là /dashboard/ Ví dụ: /dashboard/settings, /dashboard/products...

Còn không nó lấy `layout.tsx` ở `app/layout.tsx` làm layout chung cho toàn bộ trang. Cài này gọi là `Root Layout`

Và lưu ý răng component trong layout.tsx nên để một children prop để nó có thể hiển thị thành phần con


```js
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
 
      {children}
    </section>
  )
}
```

### 🔸 Lưu ý với layout

- layout chấp nhận kiểu mở rộng .js, .jsx, .tsx
- layout mặc định là **Server Components** nhưng bạn có thể chuyển qua Client Components
- layout có thể fetch data để lấy thông tin qua API
- Bạn không thể share data giữa layout cha và con, tuy nhiên bạn có thể fetch data giống nhau 1 hoặc nhiều lần, React sẽ tự động loại bỏ những yêu cầu để không ảnh hưởng đến hiệu suất
- 

### 🔸 Templates

Templates cũng giống như layouts để wrap các layout con hoặc page. Không giống như Layout, Templates sẽ re-render lại mỗi khi bạn chuyển hướng

Khuyến nghị: sử dụng layouts thay vì templates trừ khi bạn có lí do để sử dụng template

Cách để định nghĩa ra một template thì tương tự như layout

![template](img/template-special-file.avif)

app/template.tsx

```js
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

The rendered output of a route segment with a layout and a template will be as such:

```js
<Layout>
  {/* Note that the template is given a unique key. */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```

### 🔸SEO Meta Tag

Tại mỗi pages bạn có thể thay đổi thông tin trên thẻ head như meta title, meta description riêng cho từng trang như sau:


```js
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Dashboard Page',
}
 
export default function Dashboard() {
  return '...'
}

```
Cách trên mới chỉ là static Metadata, ngoài ra chúng ta còn có thể tạo Metadata động theo dynamic Route

## 🎯 Custom Page HTTP Error

Bạn có thể thay đổi giao diện của trang thông báo lỗi `404`, `500`

Bằng cách tạo ra 2 pages như cấu trúc sau:

```html
├── app
│   ├── 404.tsx
│   ├── 400.tsx
│   ├── page.tsx
```

### pages/404.tsx

```tsx
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

### pages/500.tsx

```tsx
export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>
}
```

Xem chi tiết: https://nextjs.org/docs/pages/building-your-application/routing/custom-error#404-page


## 🎯 Styling và Static Files

### 💥 Styling

Cách để tổ chức Css trong NextJs

Chi tiết xem: https://nextjs.org/docs/app/building-your-application/styling


### 💥 Static Files

Cách tổ để tổ chức tài nguyên tĩnh:

- Images: trong public
- Images: từ nguồn bên ngoài
- Fonts: Google Fonts, Local fonts

Chi tiết xem: https://nextjs.org/docs/app/building-your-application/optimizing

---
=========================================

## 🎯 Renderding

Components trong NextJs được chia thành 2 loại:

- `Server Components`: Render UI phía máy chủ server
- `Client Components`: Render UI phía trình duyệt client

Đơn giản bạn phân biệt 2 loại trên khi thử `console.log` ở mỗi loại.

Ưu điểm của mỗi loại bạn đọc chi tiết ở trang chủ: https://nextjs.org/docs/app/building-your-application/rendering/server-components

### 💥Khi nào thì dùng loại nào ?


Bạn có thể dựa vào bảng sau để quyết định dùng loại nào

| What do you need to do?                                                      | Server Component | Client Component |
|------------------------------------------------------------------------------|------------------|------------------|
| Fetch data                                                                   |       ✅         |        ❌         |
| Access backend resources (directly)                                          |       ✅        |         ❌        |
| Keep sensitive information on the server (access tokens, API keys, etc)      |       ✅         |        ❌         |
| Keep large dependencies on the server / Reduce client-side JavaScript        |       ✅        |         ❌        |
| Add interactivity and event listeners (onClick(), onChange(), etc)           |       ❌          |       ✅         |
| Use State and Lifecycle Effects (useState(), useReducer(), useEffect(), etc) |       ❌          |       ✅         |
| Use browser-only APIs                                                        |       ❌          |       ✅         |
| Use custom hooks that depend on state, effects, or browser-only APIs         |       ❌          |       ✅          |
| Use React Class components                                                   |       ❌          |       ✅         |

Xem đầy đủ tại: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns

---

## 🎯 DATA Fetching 

Mối loại components có cách fetch data khác nhau.

### 💥Fetching Data phía Server

Bạn có thể sử dụng `fetch` với  `async/await` rong Server Components,  Route Handlers, và Server Actions.


Ví dụ


```tsx
async function getData(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const post = await getData(1);
 
  return <main>
    <h1>{post.title}</h1>
  </main>
}
```
Khi bạn dùng hàm `fetch` mặc định nó được NextJS hỗ trợ cache lại response.


Ngoài cách sử dụng hàm `fetch` bạn cũng có thể sử dụng các hình thức fetch API khác: Axios, ORM client, databse, CMS...

Bạn có thể cache với React Cache như sau:

```ts
import { cache } from 'react'
 
export const getPost = cache(async (id: string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  return response.data
})
```
`getPost` có thể được gọi nhiều lần nhưng nó chỉ gửi request đúng 1 lần. Vì đã được cache.

Để làm mới cache, bạn cần cấu hình thêm `revalidate` ở mỗi file `layout.tsx` hoặc `page.tsx`.

```tsx
import { getItem } from '@/utils/get-item'
 
export const revalidate = 3600 // revalidate the data at most every hour
 
export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const item = await getItem(id)
  // ...
}
```



> Lưu ý: `SWR`, `React Query` được viết dưới dụng HOOK nên bạn không thể sử dụng nó trong Server Component.



### 💥Fetching Data phía Client

Với Client Component bạn có thể fetch data từ 2 nguồn:

- API được tạo ra bởi: Route Handler
- API từ nguồn bên ngoài

Sử dụng `useEffect` hoặc `SWR`, `React Query`

LƯU Ý QUAN TRỌNG:

> Khuyến nghị Bạn không sử dụng hàm `fetch` trong Client component khi dùng với `useEffect` hoặc `SWR`, `React Query`. Thay vào đó dùng `axios`

---

### 💥 CACHE DATA

 Với NextJS App router mặc định DATA được cache khi sử dụng với `fetch`.

Để làm MỚI cache bạn cấu hình `revalidate` như sau:

```ts
fetch('https://...', { next: { revalidate: 3600 } })
```

Hoặc thêm biến revalidate ở đầu mỗi file `layout.tsx` hoặc cụ thể trong các `page.tsx`

```ts
export const revalidate = 3600 // revalidate at most every hour
```

NẾU bạn sử dụng Server Actions thì có thể sử dụng cache có định danh tag.

```tsx
// app/page.tsx
export default async function Page() {
  const res = await fetch('https://...', { next: { tags: ['collection'] } })
  const data = await res.json()
  // ...
}
```
Trong Server Action bạn làm tươi nội dung cho page.tsx như sau:

```ts
// app/action.ts
'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function action() {
  revalidateTag('collection')
}
```
LƯU Ý: Dùng hàm `fetch` bên trong các Server Action thì KHÔNG CACHE.

`fetch` sẽ không cache nếu:

*   The `cache: 'no-store'` is added to `fetch` requests.
*   The `revalidate: 0` option is added to individual `fetch` requests.
*   The `fetch` request is inside a Router Handler that uses the `POST` method.
*   The `fetch` request comes after the usage of `headers` or `cookies`.
*   The `const dynamic = 'force-dynamic'` route segment option is used.
*   The `fetchCache` route segment option is configured to skip cache by default.
*   The `fetch` request uses `Authorization` or `Cookie` headers and there's an uncached request above it in the component tree.

---


## 🎯 Server Actions và Mutations

Đây là tính năng NÂNG CAO trong NextJS. Dùng khi bạn muốn tạo ứng dụng FullStack hoàn toàn với NextJs.

Server Actions giúp bạn truy vấn dữ liệu trực tiếp với Database.

Giống như cách bạn tạo ứng dụng NodeJS, Express với các loại Database: MongoDB, SQL Server, PostgreSQL...

Xem Video về Server Actions: https://www.youtube.com/watch?si=cJZHlUu_jFhCzHUg&v=dDpZfOQBMaU&feature=youtu.be

Trong Doccument của NextJS --> cũng chỉ mới giới thiệu về cách sử dụng Server Actions, chứ CHƯA có phần nào nói về cách kết nối với Database  một cách chính thức.


Nguồn tìm hiểu Server Actions với Databases:

- https://github.com/vercel/next.js/tree/canary/examples/next-forms/app
- https://github.com/nirmal1064/nextjs-server-actions-tutorial
- https://github.com/azukiazusa1/nextjs-server-actions-example
- https://github.com/Sarmad426/Todo-list-app


HD tạo PostgreSQL trên Vercel: https://nextjs.org/learn/dashboard-app/setting-up-your-database


## 🎯 next.config.js Options

Xem chi tiết: https://nextjs.org/docs/app/api-reference/next-config-js


## 🎯 Cấu hình Dịch vụ Google

- Google Tag Manager
- Google Analytics
- Google Maps Embed
- YouTube Embed

Xem chi tiết: https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries

## 🎯 Learn NextJS App Router

Xem tại link: https://nextjs.org/learn

Videos: https://www.youtube.com/watch?v=uQeidE2LA1s&list=PL6bwFJ82M6FXjyBTVi6WSCWin8q_g_8RR