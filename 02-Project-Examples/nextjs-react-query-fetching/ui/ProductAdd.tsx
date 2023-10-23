"use client";
import React from "react";
import { useForm } from "react-hook-form"
import { 
  useMutation,  
  useQueryClient,
} from '@tanstack/react-query'



type FormData = {
  name: string;
  price: string;
  desc: string;
  meterial: string;
  catId: string;
  slug: string;
};



const ProductAdd = () => {
  const [message, setMessage] = React.useState('');

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();


  const onSubmit = handleSubmit(async (data) => {
    addMutation.mutate(data);
  });


  const queryClient = useQueryClient();

  const fetchCreate = async (formData: FormData) => fetch(`https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
}).then((response) => response.json());

  // Mutations
  const addMutation = useMutation({
    mutationFn: fetchCreate,
    onSuccess: (data) => {
      console.log('addMutation onSuccess',data);
      setMessage('addMutation onSuccess');
      // Sau khi thêm mới thành công thì update lại danh sách sản phẩm dựa vào queryKey
      queryClient.invalidateQueries({ queryKey: ['products']});
      //reset form
      reset();
    },
    onError: (err)=> {
      console.log('Thêm mới có lỗi !', err);
      setMessage('Thêm mới có lỗi !');
    }
  })


 
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
          disabled={addMutation.isLoading}
        >
           {addMutation.isLoading ? 'Proccesing' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
