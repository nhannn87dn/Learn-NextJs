"use client";
import React from "react";
import { useForm } from "react-hook-form"
import { 
  useQuery,
  useMutation,  
  useQueryClient,
} from '@tanstack/react-query'



type FormData = {
  id: string;
  name: string;
  price: string;
  desc: string;
  createdAt: string;
  meterial: string;
  catId: string;
  slug: string;
};

const fetchData = async (id: string)=>{
  let url = `https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products/${id}`;
  return fetch(url).then(res => res.json());
}


const ProductEdit =  ({productId}: {productId: string}) => {

    const [message, setMessage] = React.useState('');
    
    const queryClient = useQueryClient();

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<FormData>();

    //Get product Detail
   const queryData = useQuery<FormData, Error>({ 
    queryKey: ['products_detail', productId], 
    queryFn: () => fetchData(productId),
    onSuccess: (productData: Partial<FormData>) => {
      Object.keys(productData).forEach((fieldName) => {
        setValue(fieldName as keyof FormData, productData[fieldName]);
      });
    }
  });

    console.log(queryData.data);

    


    //hàm call API update sản phẩm
    const updateData = (payload: FormData) =>
    fetch(`https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());

  
    // Mutations
    const updateMutation = useMutation({
      mutationFn: updateData,
      onSuccess: () => {
        console.log('Cập nhật thành công !');
        setMessage('Cập nhật thành công !');
        // Sau khi thêm mới thành công thì update lại danh sách danh mucj dựa vào queryKey
        queryClient.invalidateQueries({ queryKey: ['products'] });
        queryClient.invalidateQueries({ queryKey: ['products_detail', productId] });
        
      },
      onError: (err)=> {
        setMessage('Cập nhật có lỗi !');
        console.log('Cập nhật có lỗi !', err);
       
      }
    });
 
  //Submit form
  const onSubmit = handleSubmit(async (data) => {

      console.log(data);
      updateMutation.mutate(data)
   

  });

  return (
    <div>
        <h1 className="text-5xl">ProductEdit - ProductID: {productId}</h1>
        {message !== '' ? (
          <div className="bg-teal-100 border border-teal-500 text-teal-900 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{message}</span>
        </div>
        ) : null}
      <form onSubmit={onSubmit}>
        <div>
        <label className="text-gray-700 text-sm font-bold mb-2">Name</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("name")} />
        </div>
       
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">Slug</label>
            <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("slug")} />
        </div>
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">Desc</label>
            <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("desc")} />
        </div>
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">meterial</label>
            <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("meterial")} />
        </div>
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">Price</label>
            <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("price")} />
        </div>
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
          type="submit"
          disabled={updateMutation.isLoading}
        >
          {updateMutation.isLoading ? 'Submitting....': 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default ProductEdit