# Client Components

Client Components chó phép bạn render nội dung tại Client tại mỗi requests. Trong Next.js client rendering là tùy chọn 

## Benefits of Client Rendering

Có 2 điểm chú ý cho việc rendering tại client

- **Interactivity**: Client Components có thể sử dụng state, effects, các sự kiện event listeners, nghĩa là chúng có thể cung cấp các phản hồi ngay hoặc update UI người dùng.

- **Browser APIs**: Client Components có truy cập đến các browser APIs, như geolocation hoặc localStorage

## Using Client Components in Next.js

Khai báo: `'use client'` ngày đầu file

```tsx
'use client'
 
import { useState } from 'react'
 
export default function Counter() {
  const [count, setCount] = useState(0)
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```