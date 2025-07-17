# Optimizations and Deployment

## 🎯 Loading Performance

Next.js 15 sử dụng **App Router** và có ba chế độ render chính:
- **Static Rendering**: Trang được render hoàn toàn tại build time, lưu trữ trong **Full Route Cache** (thư mục `.next/`), và phục vụ dưới dạng file tĩnh. Điều này tương ứng với **Static Site Generation (SSG)**.
- **Dynamic Rendering**: Trang được render tại request time, không tạo file tĩnh trước, và không sử dụng Full Route Cache.
- **Incremental Static Regeneration (ISR)**: Kết hợp Static Rendering với khả năng làm mới dữ liệu định kỳ tại runtime, sử dụng `next: { revalidate }`.

Mặc định, Next.js 15 sử dụng chế độ **`auto`**, nghĩa là nó sẽ cố gắng render tĩnh (SSG) nếu không có yếu tố động (như `cookies()`, `headers()`, hoặc dynamic params không được định nghĩa qua `generateStaticParams`). Nếu có yếu tố động, route sẽ chuyển sang Dynamic Rendering.

Nắm được nó để bạn kiểm soát được hiệu suất tải trang. Nếu dữ liệu của bạn không cần cập nhật `real time` như dữ liệu chứng khoán thì phương án tối ưu nhất nên chọn là **Incremental Static Regeneration (ISR)**

### ISR với static route

```ts
// app/products/page.tsx
export const dynamic = 'force-static'; // Ép buộc route sử dụng Static Rendering, đảm bảo HTML và RSC Payload được tạo và lưu trong Full Route Cache tại build time

interface Product {
  id: number;
  name: string;
}

const ProductsPage = async () => {
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache',
    next: { revalidate: 3600 },
  });
  const products: Product[] = await res.json();

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
```

1. **`dynamic = 'force-static'`**: Ép buộc route sử dụng Static Rendering, đảm bảo HTML và RSC Payload được tạo và lưu trong **Full Route Cache** tại build time.
2. **Không có yếu tố động**: Route `/products` không sử dụng dynamic params, `cookies()`, `headers()`, hoặc các yếu tố khác khiến route render động.
3. **`next: { revalidate: 3600 }`**: Kích hoạt ISR, cho phép dữ liệu được làm mới định kỳ, nhưng không ngăn việc tạo file tĩnh tại build time.


### ISR với dynamic route

```ts
//app/blog/[id]/page.tsx
interface Post {
  id: string
  title: string
  content: string
}
 
// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60
 
// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths
 
export async function generateStaticParams() {
  const posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json()
  )
  return posts.map((post) => ({
    id: String(post.id),
  }))
}
 
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post: Post = await fetch(`https://api.vercel.app/blog/${id}`).then(
    (res) => res.json()
  )
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
```

Khi sử dụng `generateStaticParams` bạn không cần phải `dynamic = 'force-static'` nữa nextjs tự hiểu sẽ render file tĩnh.




## 🎯 Image

Xem doc: https://nextjs.org/docs/app/getting-started/images

## 🎯 Video

Xem doc: https://nextjs.org/docs/app/guides/videos

## 🎯 Font

Xem doc: https://nextjs.org/docs/app/getting-started/fonts

## 🎯 SEO Metadata

Xem doc: https://nextjs.org/docs/app/getting-started/metadata-and-og-images


## 🎯 Lazy Loading

Xem doc: https://nextjs.org/docs/app/guides/lazy-loading

---

## 🎯 Configuring

### 💥 Environment Variables - Biến môi trường

Xem doc: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

### 💥  next.config.js Options

Xem Doc: https://nextjs.org/docs/app/api-reference/next-config-js


## 🎯 Deploying to Vercel

Hướng dẫn deploy NextJS App lên Vercel