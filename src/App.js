import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

//todo to use state inside of a function
// a hook called useState is used

//todo useEffect is a hook which is used
// when want something to happen when the page loads


import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTasks from './components/AddTask';
import Footer from './components/Footer';
import About from "./components/About";


import React from 'react'

//todo Note here variables are accessed using {}
//todo Note how props are passed to the component



function App() {

    //todo this is how we make tasks array
    // a part of our Component
    // Note here tasks array denotes the state of our Component Task
    // and that state can only be modified using setTasks Function
    // This state is extracted out to the Top Component so that
    // we can use these state in other components..this is APP level state

    const [showAddTask,setShowAddTask] = useState(false);


    const [tasks,setTasks] = useState( [])

    //todo here the first parameter is the Function that manipulates the STATE on page load
    // and second parameter is the dependency array
    useEffect(()=>{
        const getTasks = async ()=>{
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        }
          getTasks();
    },[])


    //todo Fetch Tasks
    const fetchTasks = async ()=>{
        const res = await fetch('http://localhost:5000/tasks');
        const data = await res.json();
        console.log(data);
        return data;
    }

    const fetchTask = async (id)=>{
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();
        console.log(data);
        return data;
    }


    //todo Add a task
    const addTask =async (task)=>{

        const  res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(task),
        })

        const data = await res.json();
        setTasks([...tasks,data]);

       //todo this adding the task to the state
       // changes will disapper on page reload
       // const id = Math.floor(Math.random()*10000)+1;
       // const newTask = {id,...task};
       // setTasks([...tasks,newTask]);
    }


    //todo Note how we are passing a function
    // as a proc to the component
    const deleteTask = async (id)=>{


        //todo this is actual deletion using the json server
        // i.e. the result will persist even when the page reloads
        await fetch(`http://localhost:5000/tasks/${id}`,{
            method:'DELETE',

        })


        //todo Note how the state of the component
        // is manipulated using setTask

        setTasks(tasks.filter((task)=> task.id!==id));
    }

    //todo Toggle Reminder
    const toggleReminder =  async (id)=>{
        const taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(updTask)
        })

        const data = await res.json();

        console.log(id);
      setTasks(tasks.map((task)=> task.id === id ?{ ...task, reminder : data.reminder}:task ))
    }


//todo Note using procs ...states are passed down
// and actions (functions) are passed up

  return (
      //todo Note here we can return only one element,
      // there can be multiple elements inside that element
  <Router>
      <div className="container">
      <Header
          onAdd={()=> setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
      />

       <Route path='/' exact render={(props)=>(
           <>
               { showAddTask  && <AddTasks onAdd={addTask}/>}
               { tasks.length>0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
                   :'No tasks To Show'}
           </>
       )}/>
       <Route path='/about' component={About}/>
       <Footer/>
    </div>
  </Router>
  );
}



//todo this is older syntax using class
// class App extends React.Component{
//   render() {
//     return <h1>Hello From a Class</h1>
//   }
// }

export default App;
