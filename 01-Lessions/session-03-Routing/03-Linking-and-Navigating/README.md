# Linking and Navigating

Có 2 cách để chuyển hướng giữa các routes trong NextJS:

- Sử dụng `<Link>` Component
- Sử dụng `useRouter` Hook

Doc: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating

## `<Link>` Component

Bản chất Link Component chính là thẻ `a` 

```js
//app/page.tsx
import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

### Actived link

Ví dụ bạn chuyển sang trang Blog thì bạn phải active blog lên cho người dùng thấy

```js

'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function Navigation({ navLinks }) {
  //Lấy url hiện tại
  const pathname = usePathname()
 
  return (
    <>
      {navLinks.map((link) => {
        //so sánh url của Link với URL hiện tại trên trình duyệt
        const isActive = pathname === link.href
 
        return (
          <Link
            className={isActive ? 'text-blue' : 'text-black'}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        )
      })}
    </>
  )
}
```


### Bookmark Link

Khi bạn cần nhảy tới một `id` thì sử dụng như sau

```js
<Link href="/dashboard#settings">Settings</Link>
 
// Output
<a href="/dashboard#settings">Settings</a>
```


## useRouter() Hook

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

Cách này áp dụng khi bạn cần chuyển trang mà không phải do người dùng chọn. Ví dụ sau khi login thành công thì chuyển hướng đến dashboard

Xem chi tiết cách sử dụng: <https://nextjs.org/docs/app/api-reference/functions/use-router>

## Cách Routing và Navigation làm việc

Chi tiết đọc: <https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works>