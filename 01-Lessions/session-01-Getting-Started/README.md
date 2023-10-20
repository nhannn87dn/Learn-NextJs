# Giới thiệu về NextJs


## 🎯 Next.js là gì?

Next.js là một framework phát triển ứng dụng web phía máy chủ (server-side) và phía máy khách (client-side) dựa trên React. Nó được xây dựng trên cơ sở của React và cung cấp các tính năng mạnh mẽ như pre-rendering, routing (định tuyến), và server-side rendering (SSR). Next.js cho phép chúng ta xây dựng các ứng dụng web động với hiệu suất cao, SEO tốt, và trải nghiệm người dùng tốt hơn.

## 🎯 Điểm nổi bật của Next.js


1. Pre-rendering và Static Site Generation (SSG): Next.js hỗ trợ pre-rendering, cho phép tạo ra các trang tĩnh được tải trước, giúp tăng tốc độ tải trang và cải thiện trải nghiệm người dùng. Ngoài ra, Next.js cũng hỗ trợ Static Site Generation (SSG), cho phép tạo ra các trang tĩnh tại thời điểm build trước, tiết kiệm tài nguyên máy chủ và tăng khả năng tìm kiếm.

2. Server-side Rendering (SSR): Next.js cung cấp khả năng render trang phía máy chủ, cho phép dữ liệu được tải trước và trả về dưới dạng HTML hoàn chỉnh cho máy khách. Điều này giúp cải thiện SEO và cung cấp trải nghiệm tốt ngay từ lần đầu tải trang.

3. Incremental Static Generation (ISG): Next.js cung cấp tính năng ISG, cho phép tạo ra các trang tĩnh tại thời điểm yêu cầu. Khi có yêu cầu truy cập vào một trang chưa được tạo trước, Next.js sẽ tạo trang đó và lưu lại để sử dụng cho các lần truy cập sau.

4. Automatic Code Splitting: Next.js tự động chia nhỏ mã nguồn thành các phân đoạn (chunks), chỉ tải các phân đoạn cần thiết cho từng trang, giúp tối ưu hóa tốc độ tải trang và tiết kiệm băng thông mạng.

5. Hot Module Replacement (HMR): Next.js hỗ trợ HMR, cho phép cập nhật các module trong quá trình phát triển mà không cần làm tải lại toàn bộ trang, giúp tiết kiệm thời gian và tăng năng suất phát triển.

6. Định tuyến dựa trên tệp: Next.js cung cấp một hệ thống định tuyến dựa trên cấu trúc thư mục, giúp xây dựng các URL thân thiện với người dùng và dễ quản lý.

7. Tích hợp TypeScript: Next.js tích hợp sẵn hỗ trợ cho TypeScript, cho phép viết mã có tính nhất quán, dễ bảo trì và chắc chắn hơn.

8. Tối ưu hóa hiệu suất: Next.js tập trung vào việc tối ưu hiệu

## 🎯 Showcase

Chi tiết: <https://nextjs.org/showcase>

## Code Mẫu 

https://app-router.vercel.app/

## 🎯 Cách cài đặt Next.js

Doc: <https://nextjs.org/docs/getting-started/installation>

Để bắt đầu với Next.js, chúng ta cần cài đặt Node.js và npm trên máy tính của mình. Sau đó, có thể sử dụng lệnh sau để tạo một dự án Next.js mới:

```bash
npx create-next-app my-next-app
yarn create next-app my-next-app
```

Quá trình cài đặt sẽ có các bước:

```html
What is your project named? my-app
Would you like to use TypeScript? No / Yes ==> Yes
Would you like to use ESLint? No / Yes ==> Yes
Would you like to use Tailwind CSS? No / Yes ==> Yes
Would you like to use `src/` directory? No / Yes ==> No
Would you like to use App Router? (recommended) No / Yes ==> Yes
Would you like to customize the default import alias? No / Yes ==> Yes
What import alias would you like configured? @/* ==> @/*
```

Lưu ý: Trong quá trình tạo dự án, bạn sẽ có cơ hội chọn giữa JavaScript và TypeScript. Hãy chọn TypeScript nếu bạn muốn sử dụng Next.js với TypeScript.

Lệnh trên sẽ tạo một thư mục mới có tên "my-next-app

" và cài đặt các phụ thuộc cần thiết cho dự án Next.js. Bạn có thể điều hướng vào thư mục dự án và chạy lệnh sau để khởi chạy máy chủ phát triển:

```bash
cd my-next-app
npm install #cài đặt packages với npm
yarn #cài đặt packages với yarn
#sau đó 
npm run dev #start server với npm
yarn dev #start server với yarn
```

Sau khi máy chủ phát triển đã khởi chạy thành công, bạn có thể truy cập vào ứng dụng Next.js của mình bằng cách mở trình duyệt và truy cập địa chỉ http://localhost:3000.

## 🎯 Cấu trúc dự án

Doc: <https://nextjs.org/docs/getting-started/project-structure>


## 🎯 Hiển thị Hello World với NextJs

- Thử tạo một component HelloWord xem NextJS có khác gì ReactJS không?

- Follow xử lý trong NextJS thế nào ?


## 🎯 Một số lưu ý cần nắm
Xem một số thay đổi trong NextJS 13: https://nextjs.org/docs/getting-started/react-essentials

## Links tham khảo

- [Next.js 13: complete guide to Server Components and the App Directory](https://makerkit.dev/blog/tutorials/nextjs13)