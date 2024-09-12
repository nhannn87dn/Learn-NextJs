import { type NextRequest } from 'next/server'
//Get All
export async function GET(request: NextRequest) {

    console.log(request);

    const searchParams = request.nextUrl.searchParams
    //Lấy tham số page
    const page = searchParams.get('page')

    const categories = [
        {id: 1, name: 'Laptop'},
        {id: 2, name: 'Mobile'}
    ]

    //
    return Response.json({ 
        categories,
        queryPrams: {
            page
        }
     })
}

//create

export async function POST(request: Request) {

    //Thông tin gửi lên từ body
    const body = await request.json()
    
    return Response.json({ 
        message: 'create POST',
        body
     })
}