# Pages and Layout

Xem code Mẫu: https://app-router.vercel.app/

## 🎯 Pages

Trong React chúng ta hay dùng index.js/index.tsx để làm entry point cho thư mục Component

Thì trong NextJS (App Router) họ chuyển qua dùng page.tsx

- page chấp nhận kiểu mở rộng .js, .jsx, .tsx
- pages mặc định là **Server Components** nhưng bạn có thể chuyển qua Client Components
- pages có thể fetch data để lấy thông tin qua API


## 🎯 Layouts

### 🔸 Thế nào là Layout

Layout là phần UI dùng chung cho toàn bộ trang hoặc một số trang. 

Layout thường chứa các thành phần giao diện như tiêu đề, chân trang, menu điều hướng và các thành phần giao diện khác mà được sử dụng trên nhiều trang khác nhau

Trong điều hướng, Layout giữ nguyên trạng thái, nó không được re-render

Có thể lồng nhiều các layout vào nhau

### 🔸 Định nghĩa 1 layout

Trong NextJS (app router) bạn muốn trang nào có layout riêng thì trong folder route bạn tạo một file `layout.tsx`

Ví dụ bạn muốn /dashboard có layout khác đi

![layout](img/layout-special-file.avif)

Trong folder dashboard tạo file layout.tsx, layout này sẽ dùng chung cho tất cả các URL bắt đầu là /dashboard/ Ví dụ: /dashboard/settings, /dashboard/products...

Còn không nó lấy `layout.tsx` ở app/layout.tsx làm layout chung cho toàn bộ trang. Cài này gọi là Root Layout

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

Xem thêm:

- https://nextjs.org/docs/app/building-your-application/optimizing/metadata

- https://nextjs.org/docs/app/api-reference/functions/generate-metadata

