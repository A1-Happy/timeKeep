// components/TodoList.tsx
"use client";

import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodo: (todo: Todo) => void;
  darkMode: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, deleteTodo, editTodo, darkMode }) => {
  if (todos.length === 0) {
    return <p className="text-center text-gray-500">No ToDo items. Add one!</p>;
  }

  // Sort todos: incomplete first, then completed
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div>
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default TodoList;
