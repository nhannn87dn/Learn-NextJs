
# Route Handlers

Là tính năng cho phép bạn tạo ra hệ thống API ngay trong chính ứng dụng NextJS với cách tạo ra các route API như cách tạo ra các route thông thường

| Route                      | API URL        |
|----------------------------|----------------|
| app/api/products/route.ts  | /api/products  |
| app/api/products/[id]/route.ts | /api/products/1 |

Ví dụ về 


```ts
//app/api/products/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest){
  const products = [
    {id: 1, name: 'iPhone 11', price: 10},
    {id: 2, name: 'iPhone 12', price: 20},
    {id: 3, name: 'iPhone 13', price: 30}
  ];
    return NextResponse.json({ok: true, data: products, total: 3, page: 1 })
}


export async function POST(request: NextRequest){
    const body = await req.json()//body
   
    return NextResponse.json({ok: true, message: 'Add Success', data: JSON.stringify(body)})

}

export async function PUT(request: NextRequest){
    const body = await req.json()//body
   
    return NextResponse.json({ok: true, message: 'Update Success', data: null})

}

export async function DELETE(request: NextRequest){
   
    return NextResponse.json({ok: true, message: 'Delete Success',data: null})

}

```