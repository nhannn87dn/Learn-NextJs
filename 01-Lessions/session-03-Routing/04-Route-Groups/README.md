
# Route Groups

Trong folder `app` khi bạn tạo các thưc mục lồng vào nhau thì có nghĩa bạn đang map nó với đường dẫn URL trên thanh trình duyệt. Tuy nhiên với NextJS 13.4 bạn có thể tạo một folder như một **Route Groups** để nhóm các routes lại thành một nhóm cho dễ quản lí mà không làm thay đổi đường dẫn URL

## Ví dụ

Bạn đang có hệ thống routes như sau

```html
app
├── layout.jsx
├── about
│   ├── page.tsx
├── blog
│   ├── page.tsx
├── account
│   │   ├── page.tsx
│   ├── page.tsx
```

Tương ứng bạn nhận được URL

- /
- /about
- /blog
- /account

Nhưng vì bạn muốn phân loại các routes trên thành các nhóm khác nhau để tiện bảo trì, dễ nhớ...

Khi đó bạn NHÓM nó lại như sau:

![group](img/route-group-organisation.avif)

=> Tên thư mục bạn bao quanh bằng cặp ngoặc tròn (folderName) như hình trên

Bạn kiểm tra thử URL /marketing có tồn tại không ?

## Layout theo nhóm

Khi bạn NHÓM (Route Groups) như vậy thì bạn hoàn toàn có thể tạo cho nhóm này một layout riêng

![group layout](img/route-group-opt-in-layouts.avif)


## Mutil Root Layout

Khi bạn nhóm như trên, và bạn muốn nó không phụ thuộc vào root layout của app. Thì bạn có thể xóa root layout ở app đi, và tạo riêng cho các nhóm mỗi root layout riêng

![root layout](img/route-group-multiple-root-layouts.avif)


Để làm vậy bạn layout này bạn cần thẻ `<html>` và `<body>` tương tự như code trong file root layout của app