# Forms and Mutations

Forms enable you to create and update data in web applications. Next.js provides a powerful way to handle form submissions and data mutations using Server Actions.

Forms được bật bạn có thể tạo, update data trong ứng dụng. Next.js cung cấp một phương thức mạnh mẽ để bạn submit và biến đổi data bằng cách sử dụng **Server Action**

Chi tiết xem:

- https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations

- Using Forms in Next.js (Server Actions, Revalidating Data): https://www.youtube.com/watch?v=dDpZfOQBMaU
- Code ví dụ: https://github.com/vercel/next.js/tree/canary/examples/next-forms


## How Server Actions Work

Với **Server Action** bạn không cần tạo các API endpoint thủ công, thay vào đó bạn định nghĩa các **asynchronous server functions**, bạn có thể gọi trực tiếp chúng từ trong components

**Server Action** có thể định nghĩa trong Server Components hoạc được gọi từ Client Components. Định nghĩa action trong một  Server Component cho phép Form hoạt động mà không cần đến JavaScript.

Enable Server Actions in your next.config.js file:

```js
module.exports = {
  experimental: {
    serverActions: true,
  },
}
```

Chi tiết Example cách sử dụng xem link sau: https://github.com/vercel/next.js/tree/canary/examples/next-forms/app