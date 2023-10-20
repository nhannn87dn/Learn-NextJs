# Routing trong NextJS

Xem code Mẫu: https://app-router.vercel.app/

- Với NextJS bạn không phải cài đặt React Router nữa mà nó sử dụng file-system để tạo router. Mỗi folder trong app sẽ là các routes

- Mặc định trong **app Folder** có một file **page.tsx** file này chính là trang chủ. page.tsx được hiểu là entry point của thư mục app


Bây giờ bạn thử Hello với NextJS từ trang chủ xem sao.
Thay nội dung app/page.tsx thành:

```js
export default function Home() {
  return <h1>Hello, Next.js!</h1>
}
```

Bạn truy cập vào link: http://localhost:3000/ sẽ thấy `Hello, Next.js!` xuất hiện ra màn hình trang chủ.

## 🎯 Cách định nghĩa Routes

Cách tạo routes thông qua hình họa sau:

![routes](img/defining-routes.avif)

Bạn muốn có một URL: /dashboard: thì trong folder app bạn tạo một folder dashboard, và trong folder dashboard tạo tiếp một file pages.tsx


```html
├── app
│   ├── dashboard
│   │   ├── page.tsx
│   ├── page.tsx
```
**app/dashboard/page.tsx** có nội dung như sau:
```js
export default function Dashboard() {
  return <h1>Hello, Dashboard Page!</h1>
}
```

Bạn muốn có một URL: /dashboard/settings: thì trong folder dashboard bạn tạo một folder settings, và trong folder settings tạo tiếp một file pages.tsx

```html
├── app
│   ├── dashboard
│   │   ├── page.tsx
│   │   ├── settings
│   │   │   ├── page.tsx
│   ├── page.tsx
```

Kết luận: bạn muốn URL như thế nào thì trong folder app tạo thư mục tương ứng với cấu trúc của URL


## 🎯 Cách tổ chức file, thư mục đúng Convention

Xem chi tiết: <https://nextjs.org/docs/app/building-your-application/routing/colocation>

## 🎯 Links tham khảo

- [Next.js 13: complete guide to Server Components and the App Directory](https://makerkit.dev/blog/tutorials/nextjs13)