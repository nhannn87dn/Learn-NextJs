# Data Fetching

Học cách để Fetch API lấy dữ liệu trong Next App Route



## 🎯 Renderding

Components trong NextJs được chia thành 2 loại:

- `Server Components`:  Render UI phía máy chủ server
- `Client Components`:  Render UI phía trình duyệt client

Đơn giản bạn phân biệt 2 loại trên khi thử `console.log` ở mỗi loại.


Ví dụ về tạo một Server Component:

```jsx
const ServerComponent = ()=>{
  console.log('I am a ServerComponent');
  //Bạn sẽ thấy log bên terminal
  return (
    <div>I am a ServerComponent</div>
  )
}
```

Ví dụ về tạo một Client Component:

```jsx
'use client' // ==> Để khai báo một client component
const ClientComponent = ()=>{
  console.log('I am a ClientComponent');
  //Bạn sẽ thấy log bên trình duyệt
  return (
    <div>I am a ClientComponent</div>
  )
}
```

### 💥Server Rendering như thế nào?

Có 3 cách để một Server Component render: Static, Dynamic và Streaming

#### Static Rendering (Mặc định)

Với cách thức này routes sẽ được render thành file tĩnh trong quá trình bạn build `yarn build`. Dùng cho các nội dung tĩnh ít khi thay đổi.

#### Dynamic Rendering

Routes sẽ render lại mỗi khi có request từ client gửi lên

#### Streaming

Là cách thức cho phép bạn render UI từng phần. Giúp cải thiện hiệu suất tải ứng dụng.


Ưu điểm của mỗi loại bạn đọc chi tiết ở trang chủ: https://nextjs.org/docs/app/building-your-application/rendering/server-components

### 💥Khi nào thì dùng loại nào ?

Bạn có thể dựa vào bảng sau để quyết định dùng loại nào

| What do you need to do?                                                      | Server Component | Client Component |
| ---------------------------------------------------------------------------- | ---------------- | ---------------- |
| Fetch data                                                                   | ✅               | ❌               |
| Access backend resources (directly)                                          | ✅               | ❌               |
| Keep sensitive information on the server (access tokens, API keys, etc)      | ✅               | ❌               |
| Keep large dependencies on the server / Reduce client-side JavaScript        | ✅               | ❌               |
| Add interactivity and event listeners (onClick(), onChange(), etc)           | ❌               | ✅               |
| Use State and Lifecycle Effects (useState(), useReducer(), useEffect(), etc) | ❌               | ✅               |
| Use browser-only APIs                                                        | ❌               | ✅               |
| Use custom hooks that depend on state, effects, or browser-only APIs         | ❌               | ✅               |
| Use React Class components                                                   | ❌               | ✅               |

Xem đầy đủ tại: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns

---



### 💥 Một số lưu ý cần chú ý khi sử dụng các loại Component

**Đối với Server Component**

1. Sử dụng thư viện bên thứ 3

Đọc ở đây: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-third-party-packages-and-providers

2. Sử dụng  Context Providers

Đọc ở đây: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers


**Đối với Client Component**

1. Giữ cho Client component nằm sau ServerComponent

```jsx
// SearchBar is a Client Component
import SearchBar from './searchbar'
// Logo is a Server Component
import Logo from './logo'
 
// Layout is a Server Component by default
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Logo />
        <SearchBar />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

2. Truyền Props từ Server tới Client Components

Bạn có thể fetch API từ Server rồi truyền kết quả xuống cho Client Component sử dụng.

Xem chi tiết: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#passing-props-from-server-to-client-components-serialization


**Đan xen Server Component và Client Component**

Bạn cần biết rõ một điều là trong quá trình request đến response. Code của bạn di chuyển từ server tới client.

Các Server component sẽ được render trước ở máy chủ, bao gồm cả khi bạn nhúng một Client component vào Server component.

Các Client Components sẽ render sau Server component. Do vậy bạn không thể nhúng một Server Component vào một Client Component (nếu có fetch data)

Ví dụ KHÔNG ĐƯỢC

```jsx
'use client'
 
// Bạn không thể import Server Component vào một Client Component.
import ServerComponent from './Server-Component'
 
export default function ClientComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <ServerComponent />
    </>
  )
}
```

Nhưng bạn có thể chuyển thành như sau:

Ví dụ ĐƯỢC

```jsx
'use client'
 
import { useState } from 'react'
 
export default function ClientComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {children}
    </>
  )
}
```

Truyền Server Component đến Client Component dưới dạng `prop children`

```jsx
// Client Component.
import ClientComponent from './client-component'
import ServerComponent from './server-component'
 
// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```


## 🎯 DATA Fetching

Mối loại components có cách fetch data khác nhau.

### 💥Fetching Data phía Server

Bạn có thể sử dụng `fetch` với `async/await` rong Server Components, Route Handlers, và Server Actions.

Ví dụ

```tsx
async function getData(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const post = await getData(1);

  return (
    <main>
      <h1>{post.title}</h1>
    </main>
  );
}
```

Khi bạn dùng hàm `fetch` mặc định nó được NextJS hỗ trợ cache lại response.

Ngoài cách sử dụng hàm `fetch` bạn cũng có thể sử dụng các hình thức fetch API khác: Axios, ORM client, databse, CMS...

Bạn có thể cache với React Cache như sau:

```ts
import { cache } from "react";

export const getPost = cache(async (id: string) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.data;
});
```

`getPost` có thể được gọi nhiều lần nhưng nó chỉ gửi request đúng 1 lần. Vì đã được cache.

Để làm mới cache, bạn cần cấu hình thêm `revalidate` ở mỗi file `layout.tsx` hoặc `page.tsx`.

```tsx
import { getItem } from "@/utils/get-item";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const item = await getItem(id);
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


> Nếu bạn cần truyền các thông tin nhạy cảm vào request như token thì bạn nên gọi gián tiếp thông qua `Route Handler`

---

### 💥 CACHE DATA

Với NextJS App router mặc định DATA được cache khi sử dụng với `fetch`.

Để làm MỚI cache bạn cấu hình `revalidate` như sau:

```ts
fetch("https://...", { next: { revalidate: 3600 } });
```

Hoặc thêm biến revalidate ở đầu mỗi file `layout.tsx` hoặc cụ thể trong các `page.tsx`

```ts
export const revalidate = 3600; // revalidate at most every hour
```


## 🎯 Error Handling

Custom lại các trang hiển thị lỗi

Xem doc: https://nextjs.org/docs/app/building-your-application/routing/error-handling



## 🎯 Loading UI

Xem doc: https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming


## 🎯 Middleware

Xem doc: https://nextjs.org/docs/app/building-your-application/routing/middleware