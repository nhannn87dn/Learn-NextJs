import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
});

export const config = {
  matcher: ["/customers/:path*"], // Áp dụng middleware cho tất cả các route bắt đầu bằng /customers
};
