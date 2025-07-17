# Getting Started và Installation trong Next.js 15

## 1. Giới thiệu về Next.js

### 1.1. Next.js là gì?
Next.js là một framework mạnh mẽ được xây dựng trên nền React, cung cấp các tính năng mở rộng để phát triển các ứng dụng web hiện đại, hiệu suất cao, và thân thiện với SEO. Next.js 15 là phiên bản mới nhất (tính đến tháng 7/2025), mang đến các cải tiến về hiệu suất, tích hợp Server Components, và khả năng tối ưu hóa vượt trội.

### 1.2. Tại sao Next.js vượt trội hơn React thuần?
React thuần là một thư viện giao diện người dùng (UI library) mạnh mẽ, nhưng nó chỉ tập trung vào việc xây dựng các thành phần giao diện (components) và quản lý trạng thái phía client. Next.js, ngược lại, là một framework hoàn chỉnh, cung cấp các tính năng bổ sung giúp đơn giản hóa và tối ưu hóa quá trình phát triển. Dưới đây là những điểm nổi bật của Next.js so với React thuần:

- **Server-Side Rendering (SSR), Static Site Generation (SSG) và Incremental Static Regeneration (ISR)**:  
  Next.js hỗ trợ render phía server và tạo trang tĩnh tại thời điểm build, cải thiện hiệu suất và SEO. React thuần yêu cầu thêm các thư viện như `react-dom/server` và cấu hình phức tạp để đạt được điều này.

- **Tích hợp sẵn các tính năng tối ưu hóa**:  
  Next.js cung cấp các công cụ như `<Image>` component để tối ưu hóa hình ảnh, `next/font` để tối ưu hóa font, và hệ thống cache thông minh (Data Cache, Full Route Cache), trong khi React thuần không có các tính năng này và cần tích hợp thêm thư viện bên thứ ba.

- **Hệ thống định tuyến tự động (App Router)**:  
  Next.js sử dụng cấu trúc thư mục trong `app/` để tự động tạo các route, không cần cấu hình thủ công như trong React với `react-router-dom`.

- **Hỗ trợ Server Components**:  
  Next.js 15 giới thiệu React Server Components, cho phép render các thành phần phía server, giảm tải JavaScript gửi đến client, cải thiện hiệu suất và trải nghiệm người dùng. React thuần không có tính năng này.

- **Tích hợp API Routes**:  
  Next.js cho phép tạo các API endpoint ngay trong dự án (`app/api/`), giúp xây dựng backend nhẹ mà không cần server riêng. React thuần yêu cầu một backend độc lập (như Node.js/Express).

- **Triển khai dễ dàng**:  
  Next.js được tối ưu hóa cho các nền tảng như Vercel, cung cấp triển khai nhanh chóng và tích hợp CI/CD. React thuần cần cấu hình thêm để triển khai trên các nền tảng tương tự.

- **Hỗ trợ SEO và OG Images**:  
  Next.js cung cấp các công cụ tích hợp để cấu hình metadata và OG images, giúp tối ưu hóa SEO mà không cần thư viện bổ sung như `react-helmet` trong React.

### 1.3. Các ứng dụng thực tiễn của Next.js
Next.js được sử dụng rộng rãi trong nhiều loại ứng dụng nhờ tính linh hoạt và hiệu suất cao:

- **Website thương mại điện tử**:  
  Next.js lý tưởng cho các trang như Shopee, Lazada, nhờ khả năng SSR và SSG để hiển thị sản phẩm nhanh chóng, hỗ trợ SEO, và tích hợp API Routes để xử lý giỏ hàng.

- **Blog và trang nội dung**:  
  Các trang như Medium, Hashnode sử dụng Next.js để tạo các blog tĩnh với SSG, giúp tải nhanh và tối ưu SEO.

- **Ứng dụng doanh nghiệp**:  
  Next.js phù hợp cho các dashboard quản lý hoặc ứng dụng nội bộ nhờ Server Components và khả năng xử lý dữ liệu phía server.

- **Ứng dụng thời gian thực**:  
  Kết hợp với WebSocket hoặc API Routes, Next.js có thể xây dựng các ứng dụng như chat, bảng điều khiển tài chính.

- **Landing pages và trang marketing**:  
  Nhờ tích hợp `<Image>`, `next/font`, và metadata, Next.js là lựa chọn hoàn hảo cho các trang quảng cáo cần tải nhanh và tối ưu hóa SEO.

- **Ứng dụng quốc tế hóa (i18n)**:  
  Next.js hỗ trợ sẵn i18n routing, phù hợp cho các ứng dụng đa ngôn 
ngôn ngữ như các trang web toàn cầu.

### 1.4. Khi nào nên chọn Next.js?
- Nếu bạn cần một ứng dụng web **tải nhanh**, **thân thiện với SEO**, và **dễ bảo trì**, Next.js là lựa chọn vượt trội.
- Nếu dự án của bạn chỉ cần một giao diện đơn giản, không cần SEO hoặc render phía server, React thuần có thể đủ. Tuy nhiên, với các dự án thực tế, Next.js thường tiết kiệm thời gian và công sức hơn nhờ các tính năng tích hợp.

---

## 2. Getting Started với Next.js 15

### 2.1. Yêu cầu hệ thống
Để bắt đầu với Next.js 15, bạn cần:
- **Node.js**: Phiên bản 18.17 trở lên (khuyến nghị sử dụng phiên bản LTS mới nhất).
- **npm** hoặc **yarn** (hoặc **pnpm** nếu bạn thích).
- Một trình soạn thảo mã nguồn như VS Code.
- Kết nối internet để tải các gói phụ thuộc.

### 2.2. Cài đặt Next.js
Next.js cung cấp công cụ `create-next-app` để nhanh chóng thiết lập một dự án mới với cấu hình mặc định.

#### Bước 1: Tạo dự án mới
Mở terminal và chạy lệnh sau:

```bash
npx create-next-app@latest
```

Bạn sẽ được hỏi một số câu hỏi để cấu hình dự án:

```
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

#### Bước 2: Di chuyển vào thư mục dự án
```bash
cd my-next-app
```

#### Bước 3: Chạy ứng dụng
```bash
npm run dev
```

Mở trình duyệt và truy cập `http://localhost:3000`. Bạn sẽ thấy trang chào mừng mặc định của Next.js.

### 2.3. Cấu trúc dự án cơ bản
Sau khi tạo dự án, cấu trúc thư mục sẽ như sau:

```
my-next-app/
├── app/
│   ├── layout.tsx       # Root layout cho toàn bộ ứng dụng
│   ├── page.tsx         # Trang chủ (route "/")
│   ├── globals.css     # CSS toàn cục
├── public/             # Tài nguyên tĩnh (hình ảnh, favicon, etc.)
├── next.config.ts      # Cấu hình Next.js
├── package.json        # Quản lý phụ thuộc
```

- **app/**: Chứa các route, layout, và logic chính của ứng dụng (App Router).
- **public/**: Lưu trữ các tệp tĩnh như hình ảnh, được phục vụ tại `/`.
- **next.config.ts**: Tùy chỉnh cấu hình như cache, middleware, hoặc i18n.

### 2.4. Thử nghiệm đầu tiên
Hãy chỉnh sửa `app/page.ts` để tạo trang chủ tùy chỉnh:

```javascript
// app/page.tsx
export default function Home() {
  return (
    <div>
      <h1>Chào mừng đến với Next.js 15!</h1>
      <p>Đây là ứng dụng đầu tiên của bạn.</p>
    </div>
  );
}
```

Lưu tệp, và trang sẽ tự động cập nhật nhờ tính năng **Hot Module Replacement** (HMR) của Next.js.

---

## 3. Cấu trúc dự án

Khi bạn tạo một dự án Next.js 15 bằng lệnh npx create-next-app@latest, cấu trúc thư mục mặc định sẽ trông như sau:


```
my-next-app/
├── app/
│   ├── layout.js         # Root layout cho toàn bộ ứng dụng
│   ├── page.js           # Trang mặc định cho route "/"
│   ├── globals.css       # File CSS toàn cục
│   ├── favicon.ico       # Icon của ứng dụng
├── public/               # Thư mục chứa tài nguyên tĩnh
│   ├── images/           # Hình ảnh tĩnh
│   ├── favicon.ico       # Icon mặc định
├── .next/                # Thư mục build (tạo tự động, không chỉnh sửa)
├── node_modules/         # Các phụ thuộc của dự án
├── next.config.js        # File cấu hình Next.js
├── package.json          # Quản lý phụ thuộc và script
├── README.md             # Tài liệu dự án
```

Chi tiết xem: https://nextjs.org/docs/app/getting-started/project-structure

---

## 4. Layouts và Pages

### 4.1 Pages

Xem chi tiết: https://nextjs.org/docs/app/api-reference/file-conventions/page

#### 4.1.1 Static Page

Xem tại: https://nextjs.org/docs/app/getting-started/layouts-and-pages#creating-a-page

#### 4.1.2 Dynamic Page

Xem tại: https://nextjs.org/docs/app/getting-started/layouts-and-pages#creating-a-dynamic-segment

#### 4.2.3 Handing Route Data

- Dynamic segments: https://nextjs.org/docs/app/getting-started/layouts-and-pages#creating-a-dynamic-segment
- Search Params: https://nextjs.org/docs/app/getting-started/layouts-and-pages#rendering-with-search-params

#### 4.1.4 Chủ đề liên quan

- Route Groups: https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
-Route Segment Config: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

---

### 4.2 Layouts

Xem chi tiết: https://nextjs.org/docs/app/api-reference/file-conventions/layout

### 4.2.1 Root Layouts

Xem tại: https://nextjs.org/docs/app/getting-started/layouts-and-pages#creating-a-layout

### 4.2.1 Nesting layouts

Xem tại: https://nextjs.org/docs/app/getting-started/layouts-and-pages#nesting-layouts

### 4.2.3 Multi Root layouts

Xem tại: 

- https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
- https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layout

## 5. Linking and Navigating

Xem tại: https://nextjs.org/docs/app/getting-started/linking-and-navigating

## 6. Route Handlers

Xem tại: https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware#route-handlers