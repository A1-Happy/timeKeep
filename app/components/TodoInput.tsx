// components/TodoInput.tsx
"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';

interface TodoInputProps {
  addTodo: (text: string) => void;
  updateTodo: (id: string, text: string) => void;
  isEditing: boolean;
  currentTodo: { id: string; text: string } | null;
  cancelEdit: () => void;
  darkMode: boolean;
}

const TodoInput: React.FC<TodoInputProps> = ({
  addTodo,
  updateTodo,
  isEditing,
  currentTodo,
  cancelEdit,
  darkMode,
}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isEditing && currentTodo) {
      setInput(currentTodo.text);
    } else {
      setInput('');
    }
  }, [isEditing, currentTodo]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    if (isEditing && currentTodo) {
      updateTodo(currentTodo.id, input);
    } else {
      addTodo(input);
    }
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        className={`flex-1 border rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
        }`}
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        type="submit"
        variant={darkMode ? "secondary" : "default"}
        className={`${darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        {isEditing ? 'Update' : 'Add'}
      </Button>
      {isEditing && (
        <Button
          type="button"
          variant={darkMode ? "outline" : "secondary"}
          onClick={cancelEdit}
          className={`ml-2 ${
            darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}
        >
          Cancel
        </Button>
      )}
    </form>
  );
};


export default TodoInput;
