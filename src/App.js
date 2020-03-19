  
import React from 'react';
import { useState,useEffect } from 'react';
import {firestore} from './index'
import Task from './Taks'
import './Task.css'
import './App.css'
function App() {
  const [tasks, setTasks] = useState([])
    const [name,setName] =useState('')

    useEffect( ()=>{
      retriveData()
    },[])

    const retriveData =() =>{
      firestore.collection("tasks").onSnapshot( (snapshot) =>{
        console.log(snapshot.docs)

    let mytask= snapshot.docs.map( d =>{
          const {id,name} = d.data()
          console.log(id,name)
          return {id,name}
        } )
        setTasks(mytask)
      })
    }
    const deleteTask = (id) =>{
    firestore.collection("tasks").doc(id+"").delete()
    }

    const editTask = (id) => {
      firestore.collection("tasks").doc(id+"").set({id,name})
    }
  const renderTask = () => {
  

    if (tasks && tasks.length) {
      return tasks.map((task, index) => {
        return (
         <Task key ={index} task={task}
         deleteTask={deleteTask}
         editTask={editTask}
         />
        )
      })
    }
    else{ return (<li> No task </li>) }
      
  }
  const addTask = () =>{ 
    let id = (tasks.length === 0)?1:tasks[tasks.length-1].id +1 ;

    firestore.collection("tasks").doc(id+"").set( {id, name} )
  }
  
  return (
    <div >
      <h1 className ="name">MY LAB FIREBASE && HOSTING <td> by..USMAN SULONG 5935512036</td></h1>
      <input  class= "summit" type='text' name="name" onChange={ (e) =>{setName(e.target.value)}}/>
      <button class= "summit" onClick={addTask}>Summit</button>
     <ul className="dis">{renderTask()}</ul> 

    </div>
  );
}

export default App;