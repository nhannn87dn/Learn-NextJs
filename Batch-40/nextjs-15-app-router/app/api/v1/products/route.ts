//GET ALL PRODUCTS
export async function GET(request: Request) {
    const data = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
        { id: 3, name: "Product 3" }
    ]
    return Response.json(data)
}

//DELETE delete PRODUCT
export async function DELETE(
    request: Request,
){
    const {id}  = await request.json()
    return Response.json(id)
}

//POST create PRODUCT
export async function POST(
    request: Request,
){
    const body = await request.json()
    return Response.json({ ...body})
}