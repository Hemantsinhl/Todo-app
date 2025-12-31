import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, Setshowfinished] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  


  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const toggleFinished = (e) => {
    Setshowfinished(!showfinished)
  }
  
  
  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id == id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLs()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLs()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, iscompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLs()
  }

  const handleCheckbox = (e) => {
   let id = e.target.name
   let index = todos.findIndex(item=>{
    return item.id === id;
   })
   let newTodos = [...todos];
   newTodos[index].iscompleted = !newTodos[index].iscompleted;
   setTodos(newTodos)
   saveToLs()
  }
  

  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto max-w-7xl my-5 rounded-xl p-5 bg-violet-50 min-h-[80vh] md:w-[40%]">
      <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo flex flex-col gap-4">
          <h2 className='text-2xl font-bold mt-8 my-5'>Add a Todo</h2>
          <div className="flex">

          <input onChange={handleChange} value={todo} type="text" className='w-full bg-white rounded-lg px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 mx-2 text-sm font-bold disabled:bg-violet-700 p-2 py-1 text-white rounded-md'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} className='mt-6 mb-4' type="checkbox" checked={showfinished} /> Show Finished
        <hr className='mt-4 mb-4' />
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {


            return (showfinished || !item.iscompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-5'>

              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} />
              <div  className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 text-sm font-bold p-2 py-1 text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 text-sm font-bold p-2 py-1 text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
