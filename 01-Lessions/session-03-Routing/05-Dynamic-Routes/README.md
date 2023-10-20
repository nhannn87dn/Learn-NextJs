# Dynamic Routes

**Dynamic Routes** là một khái niệm ám chỉ cách các URL được xử lý và định tuyến trong một ứng dụng web động.

Dynamic Routes cho phép xây dựng các URL động dựa trên các thông tin hoặc tham số cụ thể.

| Route                   | Example URL | params        |
|-------------------------|-------------|---------------|
| app/blog/[slug]/page.js | /blog/bai-viet-1     | { slug: 'bai-viet-1' } |
| app/blog/[slug]/page.js | /blog/bai-viet-2     | { slug: 'bai-viet-3' } |
| app/blog/[slug]/page.js | /blog/bai-viet-3     | { slug: 'bai-viet-3' } |

Ví dụ bạn muốn có một hệ thống URL như cột `Example URL` và hiển nhiên là số lượng bài viết tăng lên hàng ngày, `slug` của bài viết không thể đoán trước được.

>`slug` được gọi là URL Friendly SEO, đường dẫn thân thiện cho SEO

==> Nên bạn không thể tạo route theo cách bình thường như đã nói ở phần trước.


***


## Các bước tạo một Dynamic Routes

### Bước 1 - Tạo cấu trúc file và thư mục


```html
app
├── blog
│   ├── [slug]
│       ├── page.tsx  
├── layout.jsx
|── page.tsx
```

### Bước 2 - Generating Static Params

là cách bạn chỉ cho NextJS hiểu `slug` trong trường hợp trên là gì

```tsx
//app/blog/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}

export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

```
Hàm `generateStaticParams()` lấy ra tất cả những bài viết, sau đó bạn lặp qua mảng và trả lại một object chứa slug như code ví dụ trên


Xem chi tiết hơn về **generateStaticParams**: <https://nextjs.org/docs/app/api-reference/functions/generate-static-params>


***

## Một số cách bắt Segments khác

### Catch-all Segments

`Slug` với nhiều biến thể

| Route                      | Example URL | params                    |
|----------------------------|-------------|---------------------------|
| app/shop/[...slug]/page.js | /shop/a     | { slug: ['a'] }           |
| app/shop/[...slug]/page.js | /shop/a/b   | { slug: ['a', 'b'] }      |
| app/shop/[...slug]/page.js | /shop/a/b/c | { slug: ['a', 'b', 'c'] } |

### Optional Catch-all Segments

Lấy luôn cả `parameter` gốc

| Route                        | Example URL | params                    |
|------------------------------|-------------|---------------------------|
| app/shop/[[...slug]]/page.js | /shop       | {}                        |
| app/shop/[[...slug]]/page.js | /shop/a     | { slug: ['a'] }           |
| app/shop/[[...slug]]/page.js | /shop/a/b   | { slug: ['a', 'b'] }      |
| app/shop/[[...slug]]/page.js | /shop/a/b/c | { slug: ['a', 'b', 'c'] } |


***


## TypeScript

```tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <h1>My Page</h1>
}
```

Các trường hợp:

| Route                             | params Type Definition                 |
|-----------------------------------|----------------------------------------|
| app/blog/[slug]/page.js           | { slug: string }                       |
| app/shop/[...slug]/page.js        | { slug: string[] }                     |
| app/[categoryId]/[itemId]/page.js | { categoryId: string, itemId: string } |


Xem thêm: <https://nextjs.org/docs/app/building-your-application/configuring/typescript#typescript-plugin>