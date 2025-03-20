//GET Single PRODUCT
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: number }> }
  ) {
    const { id } = await params 

    const data = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
        { id: 3, name: "Product 3" }
    ]
    return Response.json(data.find((product) => product.id == id))
  }

//PUT update PRODUCT
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: number }> }
){
    const { id } = await params
    const body = await request.json()
    return Response.json({ ...body, id })
}

