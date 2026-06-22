import { Metadata } from "next";

//server component
type IProduct = {
    _id: string;
    product_name: string;
    price: number;
    discount: number;
    thumbnail: string;
    slug: string;
}

type IResponse = {
    success: boolean;
    data: IProduct;
    message: string;
}

type  Params = {
  params: Promise<{ slug: string }>
  //searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
     const slug = (await params).slug;
     const response = await fetch(`http://localhost:8080/api/v1/products/detail/${slug}`);
     const data: IResponse = await response.json();
     return {
        title: data.data.product_name,
        description: `Product detail page for ${data.data.product_name}`,
     }
}


const ProductDetail = async({
  params,
}: Params) => {
    //gọi api lấy chi tiết sản phẩm theo slug
    const { slug } = await params

    const response = await fetch(`http://localhost:8080/api/v1/products/detail/${slug}`, {
        cache: 'force-cache', //bật cache cho request này, lần sau gọi lại sẽ lấy từ cache
        next: { revalidate: 60 }, //thời gian cache là 60s, sau 60s sẽ gọi lại api để lấy dữ liệu mới
    });
    const data: IResponse = await response.json();
    console.log('<<=== 🚀 data ===>>',data);
  return (
    <div>
        <h1>Product name: {data.data.product_name}</h1>
    </div>
  )
}

export default ProductDetail