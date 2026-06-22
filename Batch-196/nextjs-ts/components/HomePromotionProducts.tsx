import { formatVND } from "@/lib/formatCurrency";
import Image from "next/image";
import Link from "next/link";

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
    data: IProduct[];
    message: string;
}

const HomePromotionProducts = async () => {
    const response = await fetch(
        'http://localhost:8080/api/v1/products/home/promotions?limit=5',
        {
            cache: 'force-cache', //bật cache cho request này, lần sau gọi lại sẽ lấy từ cache
            next: { revalidate: 60 }, //thời gian cache là 60s, sau 60s sẽ gọi lại api để lấy dữ liệu mới
        }
    );
    const data: IResponse = await response.json();
    console.log('<<=== 🚀 data ===>>',data);
  return (
    <div>
        {
            data.data.map((product) => {
                return <Link href={`/products/${product.slug}`} key={product._id} className="border p-4 mb-4">
                    <Image width={200} height={200} src={product.thumbnail} alt={product.product_name} className="w-full h-48 object-cover mb-2" />
                    <h3 className="text-lg font-bold">{product.product_name} - {product._id}</h3>
                    <p className="text-gray-500 font-bold">{formatVND(product.price)}</p>
                </Link>
            })
        }
    </div>
  )
}

export default HomePromotionProducts