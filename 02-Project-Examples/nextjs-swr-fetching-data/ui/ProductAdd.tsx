"use client";
import React from "react";
import { useForm } from "react-hook-form"
import useSWRMutation from 'swr/mutation'
import { useSWRConfig } from 'swr';


type FormData = {
    name: string;
    price: string;
    desc: string;
    meterial: string;
    catId: string;
    slug: string;
};



  async function sendRequest(url: string, { arg }: { arg: FormData}) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg)
    }).then(res => res.json())
  }
const ProductAdd = () => {
  const [message, setMessage] = React.useState('');

  const { mutate } = useSWRConfig();
  /**
   * Dùng useSWRMutation để update, thêm mới, xóa sản phẩm
   */
  const {data, error, reset: resetState, trigger: createProduct, isMutating: isCreated } = useSWRMutation('https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products', sendRequest, /* options */)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) => {

       try {
          const result = await createProduct(data);
          console.log(result);

          if(result){
            setMessage('Product created successfully');
            //làm mới data ở danh sách sản phẩm
            mutate(`https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products`);
            reset({
              name: "",
              slug: "",
              desc: "",
              meterial: "",
              catId: "",
              price: ""
            })
          }

        } catch (e) {
          setMessage('Product created failed');
          // error handling
          console.log(e);
        }
   


  });
  // firstName and lastName will have correct type

  return (
    <div>
      <h1 className="text-5xl font-bold">ProductAdd</h1>
      {message !== '' ? <div>{message}</div> : null}
      <form onSubmit={onSubmit}>
        <div>
        <label className="text-gray-700 text-sm font-bold mb-2">Name</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("name")} />
        </div>
       
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">Slug</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("slug")} />
        </div>
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">Desc</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("desc")} />
        </div>
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">meterial</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("meterial")} />
        </div>
        <input type="hidden" {...register("catId")} value={'19f97b19-5f4f-4cfc-9811-0a0de79dba73'} />
        <div>
            <label className="text-gray-700 text-sm font-bold mb-2">Price</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("price")} />
        </div>
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
          type="submit"
          disabled={isCreated}
        >
           {isCreated ? "Processing..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
