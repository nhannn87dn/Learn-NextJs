
# Server Components

## Benefits of Server Rendering

Dưới đây là một số lợi ích của việc thực hiện công việc rendering trên máy chủ:

1. **Data Fetching (Truy xuất dữ liệu):** Server Components cho phép bạn di chuyển việc truy xuất dữ liệu lên server, gần nguồn dữ liệu của bạn. Điều này có thể cải thiện hiệu suất bằng cách giảm thời gian truy xuất dữ liệu cần thiết để render và số lượng yêu cầu mà Client cần thực hiện.

2. **Bảo mật:** Server Components cho phép bạn giữ dữ liệu nhạy cảm và logic xử lý trên ở Server, chẳng hạn như Tokens và  API key, tránh nguy cơ tiết lộ chúng cho Client.

3. **Caching (Bộ nhớ Đệm):** Bằng cách render tại Server, kết quả có thể được Cached và tái sử dụng trên các yêu cầu tiếp theo và giữa các người dùng. Điều này có thể cải thiện hiệu suất và giảm chi phí bằng cách giảm số lần render và truy xuất dữ liệu trên mỗi yêu cầu.

4. **Kích thước Bundle:** Server Components cho phép bạn giữ những phụ thuộc lớn mà trước đây có thể ảnh hưởng đến kích thước gói JavaScript của khách hàng trên server. Điều này có lợi cho người dùng có kết nối internet chậm hoặc thiết bị yếu, vì Client không cần tải xuống, phân tích và thực thi bất kỳ mã JavaScript nào cho Server Components.

5. **Tải trang ban đầu và First Contentful Paint (FCP):** Trên máy chủ, chúng ta có thể tạo HTML để cho phép người dùng xem trang ngay lập tức, mà không phải chờ đợi khách hàng tải xuống, phân tích và thực thi JavaScript cần thiết để render trang.

6. **Tối ưu hóa công cụ tìm kiếm và khả năng chia sẻ trên mạng xã hội:** HTML đã được render có thể được sử dụng bởi các bot công cụ tìm kiếm để chỉ mục trang của bạn và các bot mạng xã hội để tạo xem trước thẻ thông tin cho trang của bạn.

7. **Streaming (Phân luồng):** Server Components cho phép bạn chia nhỏ công việc render thành các phần và phân luồng chúng đến Client khi chúng sẵn sàng. Điều này cho phép người dùng xem các phần của trang sớm hơn mà không cần chờ đợi cho toàn bộ trang được render trên máy chủ.

## Server Rendering Strategies

Có 3 cách để server rendering: Static, Dynamic, and Streaming

### Static Rendering (Mặc định)

Các Routes sẽ rendered tại thời điểm build code hoặc chạy nền sau khi dữ liệu được revalidation

### Dynamic Rendering

Các Routes sẽ rendered lại sau mỗi requests dùng khi routes của bạn có thông tin cần cập nhật mới liên tục như cookies hoặc khi dùng URL's search params.

### Streaming

Cho phép bạn hiển thị dần dần các UI từ server, bằng cách chia nhỏ nội dùng các phần và gửi nó đến Client khi xử lí xong. CHo phép người dùng nhìn thấy từng phần UI trước khi toàn bộ nội dung được tải xong.

-----------------

Tài liệu tham khảo: 

- Next.js Server Actions (revalidatePath, useFormStatus & useOptimistic): <https://www.youtube.com/watch?v=RadgkoJrhu0&list=PLK5U0tyd34tBYZ1L6rplNfFNNQPwgCRR0>
- Using Forms in Next.js (Server Actions, Revalidating Data): https://www.youtube.com/watch?v=dDpZfOQBMaU
- Code ví dụ: https://github.com/vercel/next.js/tree/canary/examples/next-forms
- https://makerkit.dev/blog/tutorials/nextjs-server-actions