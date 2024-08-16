# Learn NextJs - Page Router

## 🎯 Cách cài đặt Next.tsx

Để bắt đầu với Next.tsx, chúng ta cần cài đặt Node.tsx và npm trên máy tính của mình. Sau đó, có thể sử dụng lệnh sau để tạo một dự án Next.tsx mới:

```bash
npx create-next-app my-next-app
yarn create next-app my-next-app
```

Quá trình cài đặt sẽ có các bước:

```html
What is your project named? my-app Would you like to use TypeScript? No / Yes
==> Yes Would you like to use ESLint? No / Yes ==> Yes Would you like to use
Tailwind CSS? No / Yes ==> Yes Would you like to use `src/` directory? No / Yes
==> Yes Would you like to use App Router? (recommended) No / Yes ==> No Would
you like to customize the default import alias? No / Yes ==> Yes What import
alias would you like configured? @/* ==> @/*
```

Lưu ý: Trong quá trình tạo dự án, bạn sẽ có cơ hội chọn giữa JavaScript và TypeScript. Hãy chọn TypeScript nếu bạn muốn sử dụng Next.tsx với TypeScript.

Lệnh trên sẽ tạo một thư mục mới có tên "my-next-app

" và cài đặt các phụ thuộc cần thiết cho dự án Next.tsx. Bạn có thể điều hướng vào thư mục dự án và chạy lệnh sau để khởi chạy máy chủ phát triển:

```bash
cd my-next-app
npm install #cài đặt packages với npm
yarn #cài đặt packages với yarn
#sau đó
npm run dev #start server với npm
yarn dev #start server với yarn
```

Sau khi máy chủ phát triển đã khởi chạy thành công, bạn có thể truy cập vào ứng dụng Next.tsx của mình bằng cách mở trình duyệt và truy cập địa chỉ http://localhost:3000.

---

## 🎯 Cấu trúc dự án

Bạn cần tuân thủ theo cách tổ chức project: cấu trúc thư mục, cặt đặt tên thư mục, file như Nextjs đã khuyến nghị.

Cụ thể xem: <https://nextjs.org/docs/getting-started/project-structure#pages-routing-conventions>

Cách tổ chức cấu trúc theo page router sẽ như sau

```html
my-nextjs-app/ ├── pages/ # Thư mục bắt buộc │ ├── _app.tsx # Bắt buộc: Custom
App component │ ├── _document.tsx # Tùy chọn: Custom Document component │ ├──
_error.tsx # Tùy chọn: Custom Error Page │ ├── index.tsx # Bắt buộc: Trang chủ │
├── 404.tsx # Tùy chọn: Trang 404 │ ├── 500.tsx # Tùy chọn: Trang 500 │ ├── api/
# Tùy chọn: API routes │ │ └── hello.ts # Tùy chọn: Ví dụ API endpoint │ └──
(tên-thư-mục)/ # Tùy chọn: Thư mục cho các routes con │ └── page.tsx # Bắt buộc
nếu có route con ├── public/ # Tùy chọn: Tệp tĩnh như hình ảnh, favicon ├──
styles/ # Tùy chọn: Tệp CSS cho ứng dụng │ └── globals.css # Tùy chọn: CSS toàn
cục ├── components/ # Tùy chọn: Các thành phần React tái sử dụng ├── lib/ # Tùy
chọn: Thư viện mã dùng chung ├── utils/ # Tùy chọn: Tiện ích và helper functions
├── hooks/ # Tùy chọn: Custom React hooks ├── context/ # Tùy chọn: React context
providers ├── package.json # Bắt buộc: Thông tin dự án và phụ thuộc ├──
next.config.js # Tùy chọn: Cấu hình Next.js ├── tsconfig.json # Bắt buộc: Cấu
hình TypeScript ├── next-env.d.ts # Bắt buộc: Khai báo TypeScript cho Next.js
├── .eslintrc.json # Tùy chọn: Cấu hình ESLint ├── .gitignore # Tùy chọn: Tệp
gitignore ├── .env # Tùy chọn: Biến môi trường ├── .env.local # Tùy chọn: Biến
môi trường cục bộ ├── .env.production # Tùy chọn: Biến môi trường sản xuất ├──
.env.development # Tùy chọn: Biến môi trường phát triển ├── middleware.ts # Tùy
chọn: Middleware của Next.js ├── instrumentation.ts # Tùy chọn: OpenTelemetry và
file instrumentation └── jsconfig.json # Tùy chọn: Cấu hình JavaScript
```

## 🎯 Cách định nghĩa Routes

Xem chi tiết: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts

Để định nghĩa 1 route bạn cần khai báo cấu trúc thư mục trong `pages`

### 💥 Static Route

Ví dụ như bên dưới chúng ta có route trang chủ /

```html
src/ ├── pages/ │ ├── index.tsx (route: /) │ ├── _app.tsx │ ├── _document.tsx
```

Ví dụ để tạo thêm route `/blog` bạn cần tạo như sau:

```html
src/ ├── pages/ │ ├── index.tsx (route: /) │ ├── _app.tsx │ ├── _document.tsx │
└── blog/ │ ├── index.tsx (route: /blog)
```

Để hiểu 1 thư mục là một segment thì bên trong folder phải có chứa file `index.tsx` hoặc `index.jsx`

Hay còn gọi entry point là `index.tsx`

```tsx
export default function Blog() {
  return <div>Blog Page</div>;
}
```

### 💥 Dynamic Routes

Để tạo một `Dynamic routes` bạn tạo folder và đặt tên trong cặp nguộc vuông. Ví dụ: `[id]`, `[slug]`

Cấu trúc như sau:

````html
```html src/ ├── pages/ │ └── blog/ │ └── [slug] │ └── index.tsx
````

Bạn sẽ nhận được tương ứng

| URL     | Params        |
| ------- | ------------- |
| /blog/a | { slug: 'a' } |
| /blog/b | { slug: 'b' } |
| /blog/c | { slug: 'c' } |

`slug` được là param và giá trị của nó biến động theo phần `segment` phía sau `/blog/` khi bạn truyền lên URL.

Chi tiết xem thêm: https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes

### 💥 API Routes

API Routes cho phép bạn tạo ra request và response API.

Hay hiểu đơn giản nó có thể làm công việc backend, tạo ra hệ thống RESTFUL API như NodeJs và ExpressJs

#### Định nghĩa một Resource API

Để định nghĩa 1 Resource API bạn sẽ phải khai báo bên trong `pages/api/`.

```html
src/ ├── pages/ │ ├── index.tsx (route: /) │ ├── _app.tsx │ ├── _document.tsx │
├── api/ │ │ ├──users/ │ │ ├──index.ts (route: /api/users) │ │ ├── [id]/ │ │
├──index.ts (route: /api/users/:id)
```

Trong đó `api/users/index.ts` như sau:

```ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const payload = req.body;
  switch (req.method) {
    //Tương đương với getAll Users
    case "GET":
      //some code...
      res.status(200).json({ message: "get" });
      break;
    //Tương đương tạo mới Users
    case "POST":
      //some code...
      res.status(200).json({ message: "create" });
      break;
    default:
      res.status(405).end(`${method} Not Allowed`);
      break;
  }
}
```

Trong đó `api/users/[id]/index.ts` như sau:

```ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const payload = req.body;

  switch (req.method) {
    //Tương đương với get User --> getById
    case "GET":
      //some code...
      res.status(200).json({ message: "get" });
      break;
    //Upadte user by Id
    case "PUT":
      //some code...
      res.status(200).json({ message: "update" });
      break;
    //Delte user by Id
    case "DELETE":
      //some code...
      res.status(200).json({ message: "delete" });
      break;
    default:
      res.status(405).end(`${method} Not Allowed`);
      break;
  }
}
```

Chi tiết về cách sử dụng Request và Response xem tại link: https://nextjs.org/docs/pages/building-your-application/routing/api-routes

## 🎯 Pages

Trong NextJS (App Router) `index.tsx` được xem như là EntryPoint

- page chấp nhận kiểu mở rộng .js, .jsx, .tsx
- page mặc định là **Client Components**

Xem chi tiết: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts

---

## 🎯 Link và Navigation

Có 2 cách để chuyển hướng giữa các routes trong NextJS:

- Sử dụng `<Link>` Component
- Sử dụng `useRouter` hook (Client Components)

### 💥 Link

Ví dụ:

```tsx
/* app/page.tsx */
import Link from "next/link";

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>;
}
```

Xem chi tiết: https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating

### 💥 useRouter() Hook

Hook này chỉ cho phép sử dụng trong Client Components

```js
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/dashboard")}>
      Dashboard
    </button>
  );
}
```

Xem chi tiết: https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating#imperative-routing

## 🎯 Layouts

### 🔸 Định nghĩa 1 layout

Trong NextJS (Page router) bạn muốn trang nào có layout riêng thì bạn tổ chức như bên ReactJs

Ví dụ: `components/layouts/DefaultLayout/index.tsx`

```tsx
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

### 🔸 Global Layout

Layout chung cho toàn bộ pages, bạn cấu hình `pages/_app.tsx`

```tsx
import DefaultLayout from "../components/layouts/DefaultLayout";

export default function MyApp({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}
```

### 🔸 Layout riêng cho từng page

Xem chi tiết: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#per-page-layouts
