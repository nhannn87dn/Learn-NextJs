# Server and Client Composition Patterns

## Khi nào thì dùng Server và Client Components?

Bạn có thể dựa vào bảng sau để quyết định dùng loại nào

| What do you need to do?                                                      | Server Component | Client Component |
|------------------------------------------------------------------------------|------------------|------------------|
| Fetch data                                                                   |       ✅         |        ❌         |
| Access backend resources (directly)                                          |       ✅        |         ❌        |
| Keep sensitive information on the server (access tokens, API keys, etc)      |       ✅         |        ❌         |
| Keep large dependencies on the server / Reduce client-side JavaScript        |       ✅        |         ❌        |
| Add interactivity and event listeners (onClick(), onChange(), etc)           |       ❌          |       ✅         |
| Use State and Lifecycle Effects (useState(), useReducer(), useEffect(), etc) |       ❌          |       ✅         |
| Use browser-only APIs                                                        |       ❌          |       ✅         |
| Use custom hooks that depend on state, effects, or browser-only APIs         |       ❌          |       ✅          |
| Use React Class components                                                   |       ❌          |       ✅         |