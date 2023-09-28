"use client";

import Link from "next/link";
import { createTodo } from "@/actions/todos";
import { SubmitButton } from "./SubmitButton";

const AddForm = () => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        action={async (FormData) => {
          const res = await createTodo(FormData)
        }}
      >
        <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
      title
      </label>
      <input name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" />
    </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default AddForm;
