import React, { useContext } from "react";
import { toast } from "react-toastify";
import { todoContext } from "../Wrapper";

const Read = () => {
  const [todos, settodos] = useContext(todoContext);

  const deleteHandler = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    settodos(filteredTodos);

    toast.error("Todo Deleted🤦‍♀️");
  };

  const clearTodos = () => {
    settodos([]);

    toast.warn("Oops All Todo Deleted!💀")
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl text-green-600  font-semibold">PENDING TODOS</h1>
        <button onClick={clearTodos}  className="text-lg font-bold bg-blue-300 rounded-2xl p-2 text-red-400 hover:text-red-500">Clear All Todos</button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li key={todo.id}
          className="flex justify-between items-center bg-black p-3 rounded">
            <span>
              <span className="mr-2 text-gray-400">{index + 1}.</span>
              {todo.title}
            </span>
            <button onClick={() => deleteHandler(todo.id)}
              className="text-red-600 hover:text-red-900 text-md">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Read;
