import React, { useState } from 'react'
import './App.css';
import Template from './components/Template';
import TodoList from './components/TodoList.js';
import TodoInsert from './components/TodoInsers'
import { BsFillPlusCircleFill } from "react-icons/bs";

let nextId = 4;

const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "React",
      checked : true
    },
    {
      id: 2,
      text: "github 배포",
      checked : false
    },
    {
      id: 3,
      text: "Todo List 손보기",
      checked : false
    }
  ]);
  
  const onInsertToggle = () => {
    if(selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle(prev => !prev);
  }

  const onInsertTodo = (text) => {
    if(text === "") {
      return alert("할 일을 입력해 주세요.")
    } else {
      const todo = {
        id: nextId,
        text,
        checked: false
      }
      setTodos(todos => todos.concat(todo));
      nextId++;
    }
  };

  const onCheckToggle = id => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const onChangeSelectedTodo = todo => {
    setSelectedTodo(todo);
  };

  const onRemove = id => {
    onInsertToggle();
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  return (
    <main className='main'>
      <Template>
        <TodoList
          todos={todos}
          onCheckToggle={onCheckToggle}
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}
        />
        <div className="AddTodoButton" onClick={onInsertToggle}>
          <BsFillPlusCircleFill />
        </div>
        {insertToggle && (
          <TodoInsert
            selectedTodo={selectedTodo}
            onInsertToggle={onInsertToggle}
            onInsertTodo={onInsertTodo}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        )}
      </Template>
    </main>
  );
};

export default App;