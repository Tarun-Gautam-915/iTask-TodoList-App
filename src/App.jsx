import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS= (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished= (e) => {
    setShowFinished(!showFinished)
  }
  

   const handleChange= (e)=>{
      setTodo(e.target.value)
  }

  const handleAdd= ()=>{
      setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
      setTodo("")
      console.log(todos)
      saveToLS()
  }


  const handleCheckbox= (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos) 
    saveToLS()
  }
  
  const handleEdit= (e, id)=>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()    
  }
  
  const handleDelete= (e, id)=>{
      let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()     
  }

  
  return (
    <>
    <Navbar/>
      <div className="md:container md:mx-auto mx-3 bg-fuchsia-100 my-5 rounded-xl p-5 min-h-[80vh] md:w-[35%]">

        <h1 className='font-bold text-3xl text-center'>iTask - Manage your Todo' at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add A Todo</h2>
          <input onChange={handleChange} type="text" value={todo} className='w-full bg-white rounded-md px-4 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-fuchsia-600 disabled:bg-fuchsia-300 cursor-pointer hover:bg-fuchsia-800 px-3 py-1 rounded-md text-white font-bold text-md'>Save</button>
        </div>

        <div>
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='my-4' name="" id="" /> Show Finished
          <div className='h-[1px] bg-gray-300 mb-1 w-[95%] mx-auto'></div>
          <h1 className='yourTodo font-bold text-xl'>Your Todos</h1>
        </div>

        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todos to display</div> }
          {todos.map(item=>{
         

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">

              <div className="flex gap-5">
                <input onChange={handleCheckbox} name={item.id} type="checkbox" checked={item.isCompleted}  id="" />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>

              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-fuchsia-600 cursor-pointer hover:bg-fuchsia-800 px-3 py-1 mx-2 rounded-md text-white font-bold text-md'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-fuchsia-600 cursor-pointer hover:bg-fuchsia-800 px-3 py-1 mx-2 rounded-md text-white font-bold text-md'><MdDelete /></button>
              </div>

            </div>


          })}

        </div>

      </div>
      
    </>
  )
}

export default App
