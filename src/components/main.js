import React, { useState }  from 'react';

function Task(props) {
  return(
       <>
       <div className='bg-light  border rounded border-dark m-1 p-1 text-capitalize ' style={{textDecoration: props.item.completed?"line-through":""}}>
         <ul className='list-group'>
           <li className='list-item d-flex justify-content-between'>
             {props.item.title} 
             <div>
                <input style={{height:"31px", width:"30px"}} onClick={()=>props.Complete(props.index)} className='form-check-input mx-1 mt-0' type="checkbox" name="" id="check" />
                <button style={{width:"30px"}} className='btn  btn-sm btn-danger' onClick={()=>props.remove(props.index)}>X</button>
             </div>  
           </li>
         </ul>
       </div>   
      </>
  );
}

 function AddTask(props) {
   const[value,setValue]=useState("");
   const handleSubmit=e=>{
     e.preventDefault();
     if(!value) return;
     props.add(value);
     setValue('');
   }
  return (
    <>
     <form >
      <div className=' text-center mt-4'>
              <input className="form-control-sm " type="text" placeholder="Enter the task" aria-label=".form-control-lg example" value={value} onChange={e=>setValue(e.target.value)}></input>
              <button onClick={handleSubmit} className='btn-dark btn-sm mx-1'>Add</button>
      </div>
      </form>
    </>
  )

}


export default function Main() {

  const [tasks,setTasks]=useState([
    {
      title:"Go to the Gym And exercise",
      completed: false
    },
    {
      title:"learn new technology",
      completed: false
    },
    {
      title:"hangout with friends",
      completed: false
    },



  ]);

const add=title=>{
  const newTasks=[...tasks,{title, completed:false}];
  setTasks(newTasks);
}
const newTasks=[...tasks];
const CompleteTask=index=>{
  
  if(newTasks[index].completed===false){
     newTasks[index].completed=true;
  setTasks(newTasks);
  }
  else{
    newTasks[index].completed=false;
    setTasks(newTasks);
  }
 
}
const RemoveTask=index=>{

    newTasks.splice(index,1);
    setTasks(newTasks);
}

return (
      <>
        <div style={{margin:"120px auto"}} className='container  p-3 '>
          <div  className='container p-2  bg-primary'>
            <h2 className='text-center mt-4'>Welcome to Todo App</h2>
            <AddTask add={add} />
            <div className='  d-flex justify-content-around  mt-4'>
              <h5 className='text-center '>Completed ({tasks.filter(task=>task.completed).length})</h5>
              <h5  className='text-center'>Pending ({tasks.filter(task=>!task.completed).length})</h5>
            </div>
            <div className='container mt-3 '>
              {tasks.map((item, index)=>(
               <Task item={item} index={index} key={index} Complete={CompleteTask} remove={RemoveTask} />
              ))}
            </div>
          </div>
        </div>
      </>
  )
}
