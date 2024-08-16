"use client";
import React from "react";
import { useForm } from "react-hook-form"
import useSWRMutation from 'swr/mutation'
import useSWR, { useSWRConfig } from 'swr';

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

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};


async function updateRequest(url: string, { arg }: { arg: FormData}) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
  }).then(res => res.json())
  }

const ProductEdit =  ({productId}: {productId: number}) => {

    const [message, setMessage] = React.useState('');
    const { mutate } = useSWRConfig();
    /**
     * Fetch data cũ về để update
     */
    const { data: product, error } = useSWR<FormData>(`https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products/${productId}`, fetcher);
  /**
   * Dùng useSWRMutation để update, thêm mới, xóa sản phẩm
   * {data, error, reset: resetState, trigger: updateProduct, isMutating: isCreated } = useSWRMutation()
   */
  const mutation = useSWRMutation(`https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products/${productId}`, updateRequest /*, options */)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) => {

       try {
          const result = await mutation.trigger(data);
          console.log('data',data,'result',result);

          if(result){
            //thông báo 
            setMessage('Product updated successfully');
            //làm mới data
            mutate(`https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products`);
            //reset form
            // reset({
            //   name: "",
            //   slug: "",
            //   desc: "",
            //   meterial: "",
            //   catId: "",
            //   price: ""
            // })
          }

        } catch (e) {
          setMessage('Product updated failed');
          // error handling
          console.log(e);
        }
   


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
        <input defaultValue={product?.name}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("name")} />
        </div>
       
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">Slug</label>
            <input defaultValue={product?.slug} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("slug")} />
        </div>
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">Desc</label>
            <input defaultValue={product?.desc} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("desc")} />
        </div>
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">meterial</label>
            <input defaultValue={product?.meterial} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("meterial")} />
        </div>
        <input defaultValue={product?.catId} type="hidden" {...register("catId")}  />
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">Price</label>
            <input defaultValue={product?.price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("price")} />
        </div>
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
          type="submit"
          disabled={mutation.isMutating}
        >
          {mutation.isMutating ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  )
}

export default ProductEdit