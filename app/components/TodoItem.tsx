// components/TodoItem.tsx
"use client";

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { cn } from "@/lib/utils";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
  darkMode: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, deleteTodo, editTodo, darkMode }) => {
  return (
    <div className={`flex items-center justify-between ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md p-4 rounded mb-2`}>
      <div className="flex items-center">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => toggleComplete(todo.id)}
          className={cn(
            "mr-3",
            darkMode
              ? "border-white data-[state=checked]:bg-white data-[state=checked]:text-gray-800"
              : "border-gray-400 data-[state=checked]:bg-black data-[state=checked]:text-white"
          )}
        />
        <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.text}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => editTodo(todo)}
          className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}`}
          aria-label="Edit Todo"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
          aria-label="Delete Todo"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
