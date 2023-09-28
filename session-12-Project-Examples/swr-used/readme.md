# SWR

SWR (Stale-While-Revalidate) là một thư viện JavaScript được phát triển bởi Vercel, được sử dụng rộng rãi trong cộng đồng React và Next.js. SWR giúp quản lý việc fetch dữ liệu từ các endpoint và cung cấp tính năng caching, tái sử dụng và tự động cập nhật dữ liệu.

Dưới đây là một số tính năng chính của SWR:

1. Caching và tái sử dụng dữ liệu: SWR tự động lưu trữ dữ liệu đã fetch trong bộ nhớ cache trong quá trình sử dụng. Khi cần, SWR trả về dữ liệu từ cache, giúp giảm số lượng request. Nếu dữ liệu trong cache còn hợp lệ (không quá hạn), SWR sẽ trả về dữ liệu đó ngay lập tức mà không cần fetch lại.

2. Tự động cập nhật dữ liệu: SWR tự động theo dõi các request đã gửi và cập nhật dữ liệu khi có bất kỳ thay đổi nào. Khi có một request mới được gửi, SWR cập nhật dữ liệu trong cache và giao diện người dùng sẽ được tự động render lại với dữ liệu mới nhất.

3. Hỗ trợ cho việc xử lý lỗi: SWR cung cấp các cơ chế để xử lý lỗi trong quá trình fetch dữ liệu. Bạn có thể kiểm tra lỗi thông qua thuộc tính `error` và xử lý các trường hợp lỗi một cách linh hoạt.

4. Tùy chỉnh và tiện ích mở rộng: SWR cho phép bạn tùy chỉnh các cấu hình và hành vi của nó thông qua các tham số và options. Bạn có thể tuỳ chỉnh cách cache hoạt động, xử lý lỗi, thời gian tái sử dụng dữ liệu, và nhiều hơn nữa. Ngoài ra, SWR cũng hỗ trợ các tiện ích mở rộng như Pagination, Infinite Scrolling và Debouncing.

5. Hỗ trợ cho SSR (Server-Side Rendering): SWR cung cấp hỗ trợ tích hợp với Next.js và có thể được sử dụng trong cả phần server và client. Điều này cho phép bạn fetch dữ liệu trong quá trình SSR và tái sử dụng dữ liệu đó khi ứng dụng chạy phía client.

SWR là một thư viện mạnh mẽ và linh hoạt cho việc quản lý dữ liệu trong ứng dụng React và Next.js. Nó giúp tối ưu hóa việc fetch dữ liệu, cung cấp trải nghiệm người dùng mượt mà và giảm bớt công việc lặp lại khi làm việc với dữ liệu.

Xem bài viết: https://www.getfishtank.com/blog/navigating-useswr-in-nextjs-applications

## useSWR

Sử dụng useSWR để fetch dữ liệu:

```jsx
import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const MyComponent = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR('/api/data', fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  if (error) return <div>Đã xảy ra lỗi.</div>;
  if (!data) return <div>Đang tải dữ liệu...</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};
```

Sử dụng useSWR để fetch dữ liệu với nhiều tham số:

```javascript
const fetcher = async ([url, limit]) => {
  const response = await fetch(`${url}?_limit=${limit}`);
  const data = await response.json();
  return data;
};

const { data, isLoading, error } = useSWR(
  [`https://jsonplaceholder.typicode.com/comments`, limit],
  fetcher
);

```

## Caching with SWR

```javascript
import { SWRConfig } from "swr";

const App = () => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
    {/** app **/}
    </SWRConfig>
  );
};
```

Bạn có thể set provider khác nhau: IndexedDB, localStorage, JavaScript Map 

Xem bài viết: https://morioh.com/a/6a2bf729d081/how-to-use-swr-to-handle-data-in-nextjs






## useSWRMutation 

Sử dụng useSWRMutation để thực hiện các mutation (thay đổi) dữ liệu:

```jsx
import useSWR, { useSWRMutation, mutate } from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const MyComponent = () => {
  const { data, isLoading, error } = useSWR('/api/data', fetcher);
  const mutation = useSWRMutation('/api/data', fetcher);

  const handleUpdate = async () => {
    const updatedData = { title: 'New Title', description: 'New Description' };

    try {
      await mutation.mutate(updatedData);
      alert('Dữ liệu đã được cập nhật thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
    }
  };

  const handleDelete = async () => {
    await fetch('/api/data', { method: 'DELETE' });
    mutate('/api/data'); // Cập nhật cache sau khi xóa thành công
  };

  if (error) return <div>Đã xảy ra lỗi.</div>;
  if (!data) return <div>Đang tải dữ liệu...</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <button onClick={handleUpdate}>Cập nhật</button>
      <button onClick={handleDelete}>Xóa</button>
    </div>
  );
};
```

Trong ví dụ trên, chúng ta sử dụng useSWRMutation để tạo ra một mutation với endpoint '/api/data' và hàm fetcher. Hàm mutate được cung cấp bởi mutation object để thực hiện mutation dữ liệu. Khi mutation được gọi, SWR sẽ tự động cập nhật dữ liệu trong cache và cập nhật giao diện người dùng.

Dưới đây là ví dụ về cách sử dụng useSWRMutation kết hợp với useSWR và mutate trong TypeScript:

```tsx
import useSWR, { useSWRMutation, mutate } from 'swr';

interface Data {
  title: string;
  description: string;
}

const fetcher = async (url: string): Promise<Data> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const MyComponent = (): JSX.Element => {
  const { data, error } = useSWR<Data>('/api/data', fetcher);
  const mutation = useSWRMutation<Data, Error>('/api/data', fetcher);

  const handleUpdate = async (): Promise<void> => {
    const updatedData: Data = { title: 'New Title', description: 'New Description' };

    try {
      await mutation.mutate(updatedData);
      alert('Dữ liệu đã được cập nhật thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
    }
  };

  const handleDelete = async (): Promise<void> => {
    await fetch('/api/data', { method: 'DELETE' });
    mutate('/api/data'); // Cập nhật cache sau khi xóa thành công
  };

  if (error) return <div>Đã xảy ra lỗi.</div>;
  if (!data) return <div>Đang tải dữ liệu...</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <button onClick={handleUpdate}>Cập nhật</button>
      <button onClick={handleDelete}>Xóa</button>
    </div>
  );
};
```

## mutate 

Sử dụng mutate để cập nhật cache mà không cần fetch lại dữ liệu:

```jsx
const MyComponent = () => {
  const handleDelete = async () => {
    await fetch('/api/data', { method: 'DELETE' });
    mutate('/api/data'); // Cập nhật cache sau khi xóa thành công
  };

  return (
    <div>
      <button onClick={handleDelete}>Xóa</button>
    </div>
  );
};
```
Trong ví dụ trên, khi người dùng nhấp vào nút "Xóa", chúng ta gửi một request DELETE để xóa dữ liệu thông qua API endpoint '/api/data'. Sau khi xóa thành công, chúng ta sử dụng mutate để cập nhật cache, giúp cập nhật giao diện người dùng mà không cần fetch lại dữ liệu từ server.

Đảm bảo bạn đã tạo các API endpoints tương ứng cho việc fetch, mutation và xóa dữ liệu trong ứng dụng Next.js của bạn.



## Một số ví dụ

### Fetch 

```js
import useSWRMutation from 'swr/mutation'
 
async function getRequest(url) {
  return fetch(url, {
    method: 'GET',
  }).then(res => res.json())
}
 
function App() {
  const { data, trigger, isMutating } = useSWRMutation('/api/todo', getRequest)
 
  return (
    <button
      disabled={isMutating}
      onClick={async () => {
        try {
          const result = await trigger()
        } catch (e) {
          // error handling
        }
      }}
    >
      Get Todo List
    </button>
  )
}
```

### Pass down data to the fetcher function

```js
import useSWRMutation from 'swr/mutation'

interface Todo {
  title: string,
  isCompleted: boolean
}
 
async function postRequest(url, { arg }: { arg: Todo }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  }).then(res => res.json())
}
 
function App() {
  const { data, trigger: createTodo, isMutating: isCreating } = useSWRMutation('/api/todo', postRequest)
 
  return (
    <button
      disabled={isCreating}
      onClick={async () => {
        try {
          const newTodo: Todo = { 
            title: 'New Todo',
            isCompleted: false 
          }
          const result = await createTodo(newTodo)
        } catch (e) {
          // error handling
        }
      }}
    >
      Create Todo
    </button>
  )
}
```


```javascript
import useSWRMutation from 'swr/mutation'

interface Todo {
  title: string;
  isCompleted: boolean;
}

interface PutRequestArgs {
  requestBody: Todo;
  queryParams: {
    id: string
  };
};
 
async function putRequest(url, { arg }: { arg: PutRequestArgs }) {
  return fetch(url + '?' + new URLSearchParams(arg.queryParams), {
    method: 'PUT',
    body: JSON.stringify(arg.requestBody)
  }).then(res => res.json())
}
 
function App() {
  const { data, trigger: updateTodo, isMutating: isUpdating } = useSWRMutation('/api/todo', putRequest)
 
  return (
    <button
      disabled={isUpdating}
      onClick={async () => {
        try {
          const newTodo: Todo = { 
            title: 'New Todo',
            isCompleted: false 
          }
          const result = await updateTodo({ 
            requestBody: newTodo,
            queryParams: { id: 'todoIDToBeUpdated' } 
          })
        } catch (e) {
          // error handling
        }
      }}
    >
      Update Todo
    </button>
  )
}
```