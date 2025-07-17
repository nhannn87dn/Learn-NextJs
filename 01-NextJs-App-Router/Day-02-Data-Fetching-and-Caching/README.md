# Data Fetching and Caching

Học cách để Fetch API lấy dữ liệu trong Next App Route

## 🎯 1. Server and Client Components

### 1.1 Phân loại Component

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

Đọc thêm tại: <https://nextjs.org/docs/app/getting-started/server-and-client-components>

### 1.2 Khi nào thì dùng loại nào ?

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

Xem đầy đủ tại: <https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns>

## 🎯 2. Fetching Data

### 2.1 Với Server Components

Xem tại: <https://nextjs.org/docs/app/getting-started/fetching-data#with-the-fetch-api>

Bạn sử dụng `fetch` được custom sâu cho NextJs để fetch dữ liệu cho server component

```ts
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

Xem thêm về fetch() API: <https://nextjs.org/docs/app/api-reference/functions/fetch>

### 2.2 Với Client Components

Xem tại: <https://nextjs.org/docs/app/getting-started/fetching-data#streaming-data-with-the-use-hook>

### 2.3 Streaming

#### 2.3.1 Loading

<https://nextjs.org/docs/app/getting-started/fetching-data#with-loadingjs>

#### 2.3.2 Suspense

<https://nextjs.org/docs/app/getting-started/fetching-data#with-suspense>

---

## 🎯 3. Caching

Next.js 15 sử dụng bốn loại cache chính:

- **Request Memoization**: Lưu trữ kết quả của các yêu cầu `fetch` trong cùng một chu kỳ render.
- **Data Cache**: Lưu trữ dữ liệu từ các yêu cầu `fetch` trên đĩa hoặc bộ nhớ để tái sử dụng giữa các request.
- **Full Route Cache**: Lưu trữ HTML và React Server Components (RSC) Payload cho các route tĩnh tại thời điểm build.
- **Router Cache**: Lưu trữ trạng thái điều hướng phía client để cải thiện trải nghiệm người dùng.

### 3.1. Data Cache

Data Cache lưu trữ kết quả của các yêu cầu `fetch` trên đĩa (thư mục `.next/cache`) hoặc trong hệ thống cache tùy chỉnh, để tái sử dụng giữa các request khác nhau.

#### Cách hoạt động

- Mặc định, các yêu cầu `fetch` với `cache: 'force-cache'` hoặc không chỉ định tùy chọn cache sẽ được lưu trữ.
- Cache có thể được làm mới thông qua **revalidation**.

#### Ví dụ: Data Cache

```typescript
interface Data {
  id: number;
  title: string;
}

const DataPage = async () => {
  const res = await fetch('https://api.example.com/data', {
    cache: 'force-cache', // Lưu trữ dữ liệu vĩnh viễn cho đến khi được làm mới
  });
  const data: Data[] = await res.json();
  return (
    <div>
      <h1>Data Cache</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataPage;
```

#### Tùy chỉnh Data Cache

- **`cache: 'force-cache'`**: Lưu trữ dữ liệu vĩnh viễn (mặc định cho SSG).
- **`cache: 'no-store'`**: Không lưu trữ, luôn gửi yêu cầu mới (phù hợp với dữ liệu thay đổi liên tục).
- **`next: { revalidate: number }`**: Làm mới cache sau một khoảng thời gian (tính bằng giây).
- **`next: { tags: string[] }`**: Gắn thẻ cho cache để làm mới theo nhóm.

### 3.2. Request Memoization

Request Memoization lưu trữ kết quả của các yêu cầu `fetch` trong cùng một chu kỳ render, giúp tránh gửi nhiều yêu cầu trùng lặp đến cùng một tài nguyên.

#### Cách hoạt động

- Áp dụng cho các yêu cầu `fetch` trong Server Components
- Cache tồn tại trong bộ nhớ (in-memory) và chỉ có hiệu lực trong một lần render.

#### Ví dụ: Request Memoization

```typescript
const fetchData = async () => {
  const res = await fetch('https://api.example.com/data', { cache: 'force-cache' });
  return res.json();
};

const HomePage = async () => {
  const data1 = await fetchData();
  const data2 = await fetchData(); // Không gửi yêu cầu mới, sử dụng kết quả từ cache
  return (
    <div>
      <h1>Request Memoization</h1>
      <pre>{JSON.stringify(data1)}</pre>
    </div>
  );
};

export default HomePage;
```

#### Lưu ý

- Chỉ hoạt động với `fetch`, không áp dụng cho các thư viện HTTP client khác (như `axios`).
- Cache tự động bị xóa sau mỗi chu kỳ render.

### 3.3. Full Route Cache

Full Route Cache lưu trữ HTML và RSC Payload của các route tĩnh tại thời điểm build, giúp phục vụ nội dung nhanh chóng mà không cần render lại.

#### Cách hoạt động

- Áp dụng cho các route sử dụng **Static Rendering** (tạo tại thời điểm build).
- Nội dung được lưu trong thư mục `.next/` và được phục vụ trực tiếp.

#### Ví dụ: Full Route Cache

```typescript

export const dynamic = 'force-static'; // Buộc route này sử dụng Static Rendering

const AboutPage= async () => {
  const res = await fetch('https://api.example.com/about', { cache: 'force-cache' });
  const data = await res.json();
  return (
    <div>
      <h1>Giới thiệu</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default AboutPage;
```

#### Lưu ý

- Sử dụng `dynamic = 'force-dynamic'` để vô hiệu hóa Full Route Cache nếu cần render động.
- Kết hợp với Incremental Static Regeneration (ISR) để làm mới cache.

### 3.4. Router Cache

Router Cache lưu trữ trạng thái điều hướng và RSC Payload phía client, giúp cải thiện hiệu suất khi người dùng điều hướng giữa các trang.

#### Cách hoạt động

- Lưu trữ trong bộ nhớ trình duyệt (client-side).
- Giảm số lượng yêu cầu gửi đến máy chủ khi điều hướng.

#### Tùy chỉnh Router Cache

- Điều chỉnh thời gian lưu trữ thông qua `next.config.ts`.

#### Ví dụ: Cấu hình Router Cache

```typescript
// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    routerCache: {
      maxInactiveAge: 60 * 60 * 1000, // Lưu cache trong 1 giờ
    },
  },
};

module.exports = nextConfig;
```

## 🎯 4. Revalidating

Để làm tươi cache có 3 cách:

### 4.1 `next.revalidate`

```js
export default async function Page() {
  const data = await fetch('https://...', { next: { revalidate: 3600 } })
}
```

### 4.2 `revalidateTag`

Đầu tiên bạn định nghĩa `tag` trong khi `fetch`
```
export async function getUserById(id: string) {
  const data = await fetch(`https://...`, {
    next: {
      tags: ['user'],
    },
  })
}
```
Sau đó gọi nó trong Server Action

```js
import { revalidateTag } from 'next/cache'
//server action
export async function updateUser(id: string) {
  // Mutate data
  revalidateTag('user')
}
```

hoặc  Route Handler 

```js
//app/api/revalidate/route.ts
import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
 
export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  revalidateTag(tag)
  return Response.json({ revalidated: true, now: Date.now() })
}
```

### 4.3 `revalidatePath`

cách này dùng trong 

- `Route Handler`

```js
import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
 
  if (path) {
    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
  }
 
  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}
```

- hoặc Server Action:

```js
//app/actions.ts
'use server'
 
import { revalidatePath } from 'next/cache'
 
export default async function submit() {
  await submitForm()
  revalidatePath('/')
}
```
## 🎯 5. No Caching

### 5.1 Phạm vi Request API với `fetch`

```typescript
const AboutPage= async () => {
  const res = await fetch('https://api.example.com/about', { cache: 'no-store' });
  const data = await res.json();
  return (
    <div>
      <h1>Giới thiệu</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default AboutPage;
```

### 5.2 Full Route với Sengment Config

Xem thêm tại: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic

```typescript

export const dynamic = 'force-dynamic'; 

const AboutPage= async () => {
  const res = await fetch('https://api.example.com/about', { cache: 'no-store' });
  const data = await res.json();
  return (
    <div>
      <h1>Giới thiệu</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default AboutPage;
```
