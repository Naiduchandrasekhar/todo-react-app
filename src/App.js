import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [task, setTask] = useState("")
  const [todos, setTodos] = useState([])
  const [itemAdded, setItemAdded] = useState(false)
  const [clearAllItems, setClearAllItems] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("todoTasks")) {
      const storedList = JSON.parse(localStorage.getItem("todoTasks"));
      setTodos(storedList)
    }
  }, [])

  const handleChange = (e) => {
    setTask(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (task) {
      const newTodo = { id: new Date().toLocaleTimeString(), title: task }
      setTodos([...todos, newTodo])
      localStorage.setItem("todoTasks", JSON.stringify([...todos, newTodo]))
      setItemAdded(true)
      setTimeout(() => {
        setItemAdded(false)
        setTask("")
      }, 1000)
    }
  }
  const deleteTodo = (i) => {
    const filterTodo = todos.filter((todo, index) => index !== i)
    setTodos(filterTodo)
    localStorage.setItem("todoTasks", JSON.stringify(filterTodo))
  }

  const clearAll = () => {
    setTodos([])
    localStorage.removeItem("todoTasks")
    setClearAllItems(true)
      setTimeout(() => {
        setClearAllItems(false)
        setTask("")
      }, 1000)
  }

  return (
    <div className="App">
      <h1 className='heading'>Todo Management Application</h1>
      <p className='item'>{itemAdded && `Added ${task} successfully to your todo list`}</p>
      {clearAllItems && <p className='item'>Cleared All Tasks</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} name="task" required onChange={handleChange} /> &nbsp;&nbsp;
        <input type="submit" value="Add" className='addButton' />
      </form>
      <div>
        You have {
          !todos.length ? "no tasks"
            : todos.length === 1 ? "1 task"
              : todos.length > 1 ? `${todos.length} tasks`
                : null
        }
      </div>
      <div>
        {todos.length > 0 && todos.map((todo, index) => {
          return <div className='todoTasks' key={index}>
            <h4 className='todo'>{todo.title}</h4>
            <h5>Time: {todo.id}</h5>
            <button className='buttonDelete' onClick={() => deleteTodo(index)}>Delete</button>
          </div>
        })}
      </div>
      <div>
        {!todos.length ? null : (
          <div>
            <button className='clearAllButton' onClick={clearAll}>Clear All</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
