
# Data Fetching

Xem Video: <https://www.youtube.com/watch?v=gSSsZReIFRk>

Next.js mở rộng hàm `fetch` cho phép bạn cấu hình `caching` và `revalidating` cho mỗi request lên server.

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
  const post = await getData()
 
  return <main>
    <h1>{post.title}</h1>
  </main>
}
```

**Bạn cần biết**

- Trong Router Handlers (các routes API), các request `fetch` sẽ không được ghi nhớ vì chúng không phải là React Component

## 🎯 Caching DATA

Mặc định Next.js tự động cache kết quả trả về từ `fetch` trong Data Cache trên server.

```ts
// 'force-cache' is the default, and can be omitted
fetch('https://...', { cache: 'force-cache' })
```

fetch với phương thức POST cũng được tự động cache, ngoại trừ bạn dùng nó trong Route Handler


## 🎯 Revalidating Data (Xác thực lại xử liệu)

Làm mới lại dữ liệu của bạn với 2 cách

### Time-based Revalidation

Bạn cấu hình thêm cho fetch như sau ở mỗi request

```js
fetch('https://...', { next: { revalidate: 3600 } })
```
revalidate: 3600  --> là thời gian (seconds) để request tự fetch làm mới lại dữ liệu

Để đở mất công cấu hình cho từng request bạn có thể làm như sau:

Tại layout.tsx hoặc page.tsx

```js
export const revalidate = 3600 // revalidate at most every hour
```

### On-demand Revalidation

Bạn có thể làm tươi data bằng cách sử dụng cache tag (revalidateTag) trong Route Handler hoặc Server Action.

```tsx
//app/page.tsx
export default async function Page() {
  const res = await fetch('https://...', { next: { tags: ['collection'] } })
  const data = await res.json()
  // ...
}
```

Trong Route Handler bạn nên sử dụng một secret key để để ngăn chặn việc làm tươi dữ liệu trái phép.

Ví dụ: API

```text
https://<your-site.com>/api/revalidate?tag=collection&secret=<token>
```
Sau đó bạn đối chiếu với secret từ hệ thống, nếu trùng khớp mới cho làm tươi.

```tsx
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
 
// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const tag = request.nextUrl.searchParams.get('tag')
 
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }
 
  if (!tag) {
    return NextResponse.json({ message: 'Missing tag param' }, { status: 400 })
  }
 
  revalidateTag(tag)
 
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
```

Ngoài ra, bạn có thể sử dụng revalidatePath để xác thực lại tất cả dữ liệu được liên kết với một đường dẫn.


```tsx
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
 
export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
 
  if (!path) {
    return NextResponse.json({ message: 'Missing path param' }, { status: 400 })
  }
 
  revalidatePath(path)
 
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
```

### Opting out of Data Caching

`fetch` sẽ không cache nếu:

*   The `cache: 'no-store'` is added to `fetch` requests.
*   The `revalidate: 0` option is added to individual `fetch` requests.
*   The `fetch` request is inside a Router Handler that uses the `POST` method.
*   The `fetch` request comes after the usage of `headers` or `cookies`.
*   The `const dynamic = 'force-dynamic'` route segment option is used.
*   The `fetchCache` route segment option is configured to skip cache by default.
*   The `fetch` request uses `Authorization` or `Cookie` headers and there's an uncached request above it in the component tree.

Ví dụ

```tsx
fetch('https://...', { cache: 'no-store' })
```

### Multiple fetch Requests

Nếu bạn có rất nhiều request `fetch` trong một route, bạn có thể cấu hình cache cho tất cả chúng

Tại  Layout hoặc Page

```tsx
// Add
export const dynamic = 'force-dynamic'
```

Ví dụ trên là data sẽ được fetch lại sau mỗi lần request 

Chi tiết các tùy chọn khác xem: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

## 🎯 Fetching data on the Server Với thư viện bên thứ 3

Bạn có thể cấu hình cache và revalidating cho các requests bằng cách sử dụng [Route Segment Config Option](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) và  React's `cache` function.

Dữ liệu của bạn được cache hay không sẽ phụ thuộc vào route tĩnh hay động. Nếu segment là tĩnh thì được cache, nếu động thì không

```tsx
import { cache } from 'react'
 
export const revalidate = 3600 // revalidate the data at most every hour

//Fetch data từ Database
export const getItemById = cache(async (id: string) => {
  const item = await db.item.findUnique({ id })
  return item
})
```

- ``revalidate`` = 3600 nghĩa là data sẽ cached and revalidated sau mỗi 1 giờ
- React `cache` function sẽ cache data lại

Có thể Hàm `getItemById` được gọi nhiều lần trong Layout.tsx hay Page.tsx nhưng chỉ có 1 lần truy vấn database được thực hiện

## 🎯 Fetching Data on the Client with Route Handlers

Nếu bạn cần fetch data trong một client component, bạn có thể gọi một Route Handler từ client. Route Handlers thực thi trên server và trả lại data cho client. Hữu ích khi bạn không muốn để lộ các thông tin nhạy cảm cho client như API tokens

## 🎯 Fetching Data on the Client sủ dụng thư viện thứ 3

Bạn cũng có thể fetch data cho client sử dụng thư viên thứ 3 như SWR, React Query 

Xem: https://nextjs.org/docs/app/building-your-application/deploying/static-exports#client-components

Tham khảo thêm: 

- https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#usepromise

- https://blog.logrocket.com/handling-data-fetching-next-js-useswr/
- https://codevoweb.com/setup-react-query-in-nextjs-13-app-directory/



