
//Get Single
export async function GET(request: Request,{ params }: { params: { id: number } }) {

    //Lấy thông tin từ params của request
    const id = params.id 

    const categories = [
        {id: 1, name: 'Laptop'},
        {id: 2, name: 'Mobile'}
    ]

    const category = categories.find(c => c.id == id)

    //
    return Response.json({ category })
}

//update by ID

export async function PUT(request: Request,{ params }: { params: { id: number } }) {

    //Lấy thông tin từ params của request
    const id = params.id 

    //
    return Response.json({ 
        id
     })
}

//delete by ID

export async function DELETE(request: Request,{ params }: { params: { id: number } }) {

    //Lấy thông tin từ params của request
    const id = params.id 



    //
    return Response.json({ 
        id
     })
}