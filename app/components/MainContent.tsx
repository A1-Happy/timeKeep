import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoInput from './TodoInput';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface MainContentProps {
  darkMode: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ darkMode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<{ id: string; text: string } | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('/api/todos');
      const fetchedTodos = await response.json();
      setTodos(fetchedTodos);
    };
    fetchTodos();
  }, []);

  const addTodo = async (text: string) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const newTodo = await response.json();
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: !todoToUpdate.completed }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    }
  };

  const deleteTodo = async (id: string) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (todo: Todo) => {
    setIsEditing(true);
    setCurrentTodo({ id: todo.id, text: todo.text });
  };

  const updateTodo = async (id: string, text: string) => {
    const response = await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, text }),
    });
    const updatedTodo = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    setIsEditing(false);
    setCurrentTodo(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentTodo(null);
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-xl`}>
        <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tasks</h2>
        <TodoInput
          addTodo={addTodo}
          updateTodo={updateTodo}
          isEditing={isEditing}
          currentTodo={currentTodo}
          cancelEdit={cancelEdit}
          darkMode={darkMode}
        />
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default MainContent;
