import React from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext } from "react";
import { todoContext } from "../Wrapper";

const Create = () => {
  const [todos, settodos] = useContext(todoContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    data.id = nanoid();
    data.completed = false;

    const copytodos = [...todos];
    copytodos.push(data);
    settodos(copytodos);

    toast.success("Todo Created Succesfully!😍");
    reset();
  };

  return (
    <div className="w-full max-w-md mb-8">
      <h1 className="text-4xl text-amber-300 font-bold mb-6">📝 TODO APP</h1>
      <form onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4">
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Your Todo Here..."
           className="p-2 rounded outline-cyan-500 bg-gray-800 text-white placeholder-gray-400"
        />
         {errors.title && <span className="text-red-400 text-sm">*Title is required</span>}
        <button type="submit"  className="bg-blue-600 hover:bg-blue-700 p-2 rounded">Create Todo</button>
      </form>
     
    </div>
  );
};

export default Create;
