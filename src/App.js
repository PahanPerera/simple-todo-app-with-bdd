import {
  PlusIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

const initTodos = [
  {
    id: "1",
    name: "Buy groceries",
    isCompleted: false,
  },
  {
    id: "2",
    name: "Buy a gift",
    isCompleted: true,
  },
];

function App() {
  const [todos, setTodos] = useState(initTodos);
  const [text, setText] = useState("");

  const toggleIsCompleted = (id) => {
    const updated = [...todos];
    updated.forEach((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    setTodos(updated);
  };

  return (
    <main className="font-mono flex justify-center align-center">
      <section className=" max-w-2xl m-16 rounded-lg shadow-lg p-12 bg-white w-full">
        <header className="mb-12">
          <h1 id="header" className=" text-3xl">
            Hi John
          </h1>
          <p className="text-teal-500 text-sm" id="todoCountText">
            You have {todos.length} items
          </p>
        </header>
        <div className="p-2 flex items-center border rounded-full divide-x-2 border-teal-500">
          <input
            type="text"
            name="addTodoInput"
            className="w-full px-4 text-lg focus:outline-none rounded-full"
            placeholder="Type here..."
            onChange={(e) => setText(e.target.value)}
          />
          <div
            id="addTodoBtn"
            className="p-2 cursor-pointer bg-teal-500 rounded-full border-none text-white"
            onClick={() => {
              if (!text) return;
              setTodos([
                {
                  id: String(todos.length + 1),
                  name: text,
                  isCompleted: false,
                },
                ...todos,
              ]);
              setText("");
            }}
          >
            <PlusIcon className="w-8 h-8" />
          </div>
        </div>
        <ul
          className="py-8 flex flex-col gap-2 divide-y divide-dashed text-lg"
          id="todoList"
        >
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center  py-4 px-6 "
              id={todo.isCompleted ? "completedTodo" : "pendingTodo"}
            >
              {todo.isCompleted ? (
                <span id="text" className="line-through">
                  {todo.name}
                </span>
              ) : (
                <span id="text">{todo.name}</span>
              )}
              <span className="flex-1"></span>
              <div
                className="text-gray-300 cursor-pointer"
                id="actionBtn"
                onClick={() => {
                  toggleIsCompleted(todo.id);
                }}
              >
                {todo.isCompleted ? (
                  <PlusCircleIcon className="w-6 h-6 " />
                ) : (
                  <MinusCircleIcon className="w-6 h-6" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
