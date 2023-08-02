# Component trong NextJs

Trong phiên bản 13, sử dụng App Router Component được chia làm 2 loại:

## 🎯 Server Component là gì ?

Server Components trong Next.js 13 là một cách để render các component trên phía server, giúp cải thiện tốc độ tải trang và SEO. Đây là một cải tiến so với tính năng Server-side Rendering (SSR) trước đó trong Next.js, và cung cấp hiệu suất và tính linh hoạt tốt hơn.

Với Server Components, bạn có thể render bất kỳ component nào trên máy chủ, bao gồm các trang, API và thậm chí là các component được render trên phía server. Điều này cho phép việc render trên phía server linh hoạt và hiệu quả hơn, và làm cho việc tối ưu ứng dụng của bạn cho các công cụ tìm kiếm trở nên dễ dàng hơn.

Một số lợi ích chính của việc sử dụng Server Components trong Next.js 13 bao gồm:

1. Cải thiện SEO: Bằng cách render các component trên máy chủ, các công cụ tìm kiếm có thể truy cập và lập chỉ mục các trang của bạn một cách hiệu quả hơn, dẫn đến cải thiện thứ hạng tìm kiếm trên các công cụ tìm kiếm.
2. Tải trang nhanh hơn: Server Components có thể giảm thiểu đáng kể thời gian cần thiết để tải các trang, cung cấp trải nghiệm người dùng tốt hơn.
3. Dễ dàng trong việc gỡ lỗi: Với Server Components, bạn có thể dễ dàng gỡ lỗi các component trên máy chủ, mà không cần sử dụng trình gỡ lỗi phía khách hàng.
4. Tính linh hoạt cao hơn: Server Components cho phép bạn render bất kỳ component nào trên máy chủ, cho phép bạn có tính linh hoạt hơn trong cách bạn xây dựng ứng dụng của mình.
5. Hiệu suất tốt hơn: Bằng cách render các component trên máy chủ, bạn có thể giảm số lượng dữ liệu cần được gửi qua mạng, dẫn đến hiệu suất tốt hơn.


## 🎯 Client Component là gì ?

Client component là một thành phần phần mềm được thiết kế để tương tác với một máy chủ hoặc một ứng dụng phía server, thường là qua mạng. Client component chịu trách nhiệm giao tiếp với máy chủ, gửi các yêu cầu và nhận phản hồi.

Trong kiến trúc client-server, client component thường là ứng dụng đối diện với người dùng tương tác với người dùng và hiển thị kết quả xử lý từ phía máy chủ. Client component có thể là trình duyệt web, ứng dụng di động hoặc ứng dụng trên máy tính.

Các chức năng chính của một client component bao gồm:

1. Giao tiếp: Client component giao tiếp với máy chủ bằng các giao thức khác nhau như HTTP, TCP / IP hoặc WebSocket. Nó gửi các yêu cầu đến máy chủ, nhận phản hồi và giải mã dữ liệu được trả về bởi máy chủ.
2. Giao diện người dùng: Client component cung cấp giao diện người dùng (UI) để người dùng tương tác với ứng dụng phía server. Nó hiển thị dữ liệu nhận được từ máy chủ, cho phép người dùng nhập dữ liệu hoặc thực hiện lựa chọn và gửi đầu vào của người dùng trở lại máy chủ để xử lý.
3. Xử lý dữ liệu: Client component có thể thực hiện một số xử lý dữ liệu, chẳng hạn như định dạng, lọc hoặc xác nhận trước khi gửi dữ liệu đó đến máy chủ. Nó cũng có thể thực hiện một số tính toán hoặc phép tính dựa trên dữ liệu nhận được từ máy chủ.
4. Quản lý trạng thái: Client component quản lý trạng thái của mình, chẳng hạn như lưu trữ các thông tin người dùng, thông tin phiên hoặc thông tin đăng nhập. Nó cũng có thể lưu dữ liệu nhận được từ máy chủ vào bộ nhớ đệm để giảm số lượng yêu cầu được gửi đến máy chủ.

Các ví dụ về client component bao gồm:

* Trình duyệt web tương tác với máy chủ web để hiển thị trang web và xử lý đầu vào của người dùng.
* Ứng dụng di động giao tiếp với máy chủ backend để lấy dữ liệu hoặc thực hiện các thao tác thay mặt người dùng.
* Ứng dụng trên máy tính kết nối với máy chủ từ xa để lấy dữ liệu hoặc thực hiện các tác vụ.

Tóm lại, client component là một phần quan trọng của kiến trúc client-server, chịu trách nhiệm giao tiếp với máy chủ, cung cấp giao diện người dùng, xử lý dữ liệu và quản lý trạng thái.