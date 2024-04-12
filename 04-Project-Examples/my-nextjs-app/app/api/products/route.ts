//app/api/products/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest){
  const products = [
    {id: 1, name: 'iPhone 11', price: 10},
    {id: 2, name: 'iPhone 12', price: 20},
    {id: 3, name: 'iPhone 13', price: 30}
  ];
    return NextResponse.json({ok: true, data: products, total: 3, page: 1 })
}


export async function POST(req: NextRequest){
    const body = await req.json()//body
   
    return NextResponse.json({ok: true, message: 'Add Success', data: JSON.stringify(body)})

}

export async function PUT(req: NextRequest){
    const body = await req.json()//body
   
    return NextResponse.json({ok: true, message: 'Update Success', data: null})

}

export async function DELETE(req: NextRequest){
   
    return NextResponse.json({ok: true, message: 'Delete Success',data: null})

}