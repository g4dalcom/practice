import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import './App.css';

function App() {
  const [animationParent] = useAutoAnimate();
  const [todoParent] = useAutoAnimate();
  const [raceParent] = useAutoAnimate();

  const [arr, setArr] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  const clickHandle = () => {
    setArr((arr) => arr.slice().sort(() => Math.random() - 0.5));
  };

  const submitHandle = (e) => {
    e.preventDefault();
    setTodos((todos) => [
      ...todos,
      {
        id: todos.length + 1,
        text: todo,
      },
    ]);
    setTodo('');
  };

  const deleteTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Karina',
      vote: 0,
    },
    {
      id: 2,
      name: 'Winter',
      vote: 0,
    },
    {
      id: 3,
      name: 'Giselle',
      vote: 0,
    },
    {
      id: 4,
      name: 'Ningning',
      vote: 0,
    },
  ]);

  const sortedUsers = users.sort((a, b) =>
    b.vote.toString().localeCompare(a.vote.toString())
  );

  const voteUser = (id) => {
    setUsers((users) =>
      users.map((user) => {
        if (user.id === id) {
          user.vote += 1;
          console.log(user.vote);
        }
        return user;
      })
    );
  };

  return (
    <>
      <div className='w-[400px] mx-auto py-10'>
        <h3 className='mb-4 text-2xl font-bold'>Raceeee!</h3>
        <div ref={raceParent} className='grid gap-y-2'>
          {sortedUsers.map((user) => (
            <div
              key={user.id}
              className='px-4 h-10 text-sm border border-purple-600 text-purple-400 rounded bg-purple-500/10 flex items-center justify-between'
            >
              {user.name}
              <button
                onClick={() => voteUser(user.id)}
                className='text-white underline'
              >
                Vote({user.vote})
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='w-[400px] mx-auto py-10'>
        <h3 className='mb-4 text-2xl font-bold'>Todo List</h3>
        <form onSubmit={submitHandle} className='flex gap-x-4'>
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type='text'
            className='flex-1 h-10 rounded bg-gray-700 text-sm px-4'
            placeholder='Write a Todo...'
          ></input>
          <button
            disabled={!todo}
            className='disabled:opacity-50 h-10 px-6 rounded text-sm bg-blue-600'
          >
            Add
          </button>
        </form>

        <div ref={todoParent} className='flex flex-col gap-y-4 mt-4'>
          {todos.map((todo) => (
            <div
              key={todo.id}
              className='h-10 flex-shrink-0 rounded bg-blue-500/20 border border-blue-500 flex items-center justify-between px-4'
            >
              {todo.text}
              <button
                onClick={() => deleteTodo(todo.id)}
                className='text-xs text-red-300 underline'
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={animationParent}
        className='grid w-[400px] mx-auto py-4 grid-cols-4 gap-4'
      >
        {arr.map((item) => (
          <div
            key={item}
            className='bg-gray-700 w-full aspect-square flex items-center justify-center rounded'
          >
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={clickHandle}
        className='h-10 flex items-center justify-center text-sm bg-blue-600 text=white w-[400px] mx-auto rounded'
      >
        Random!
      </button>
    </>
  );
}

export default App;
