import { useEffect, useState } from 'react';
import './App.css';
import Demo from './Demo';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Tick from './Tick';
import {tickIt} from './Tick';



function Todo() {

  //use state for set data
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);
  const [editTask, setEditTask] = useState([list]);

  const [name, setName] = useState('Remove All');

  //api
  const url = "https://jsonplaceholder.typicode.com/todos";


  //fetch data using useEffect
  useEffect(() => {
        fetch(url).then((response) => {
            let data = response.json();
            return data;
        })
          .then((data) => {
              let result = data;
              let updateData = result.map((item) => {
                item.flag = true;
                return item;
            });
            
            setEditTask(updateData);
            setList(updateData);
           
          });
  }, []);

  // setEditTask([...list]);

  const type_task = (event) => {
      console.log(event.target.value);
      setTask(event.target.value);
  }

  //function for Add Todo Task Using add Button

  const addTask = () => {
        if (!task) {
          alert('Plz Enter Valid Task..!!!! ');
          return;
        }

        fetch(url, {          //fetch data

          //adding method type
          method: 'POST',

          //Adding body or content to send
          body: JSON.stringify({
            userId: 1,
            id: Date.now(),
            title: task,
            completed: false,
          }),

          //Adding headers to the request

          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })

          //converting to JSON

          .then((response) => response.json())

          //displaying results to console

          .then((json) => {
            let newTask = json;
            newTask.flag = true;

            setEditTask([newTask,...list]);
            // setList([newTask, ...list]);          
            
          });

          //empty input box
        setTask('');
        setName('Remove All');     

  }

  //function for delete task

  const deleteTask = (id) => {
        setEditTask(() => {
          return editTask.filter((old, index) => {
            return id !== index;
          })
        });

        setTask('');
       
        if (editTask.length <= 0) {
          setName('Check List');
        }
  }

  //function for Edit task 

  const edit_txt = (item, id) => {
        let index = editTask.indexOf(item);
        console.log(item, "   " + id);

        setTask(item);

        fetch(`url/${item.id}`, {
          method: 'PUT',
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(item),
        })
          .then((response) => response.json())
          .then((data) => {
            let result = data;

            setEditTask(() => {
              return editTask.filter((old, index) => {
                return id !== index;
              })
            });

            setEditTask([...editTask,task]);
            editTask[id] = result;
          })

  }

//rename check list and  remove all
  const chk_remove = () => {

      // console.log('remove');
      setList([]);
      setEditTask([]);
      setName('Check List');

  }

  const [lineData,setLineData]=useState(true);
console.log(editTask);
  const tickIt=(id,flag)=>{   
          editTask[id].flag=false;
          console.log(id);
          setLineData(()=>{
            return flag?false:true
          })          
           
  }

  const clear_txt=()=>{
    setTask('');
  }
  //render
  return (
      <>
        <div className='main_container'>
        <div className='heading' ><img src='https://cdn-icons-png.flaticon.com/512/4552/4552699.png'/>  </div>
              <div className='container'>

                  
                  
                  <input type='text' value={task} onChange={type_task} placeholder='✍️ Add task here..' />

                  <button className='add_btn' onClick={addTask}> + </button>
                  <button onClick={clear_txt} className='chk_btn' data-sm-link-text='remove all'>Clear Text</button>
                  <button onClick={chk_remove} className='chk_btn' data-sm-link-text='remove all'>{name}</button>
               </div>

                <span className='list'>
                      {editTask.map((dataItems, index) => {
                        return( 
                              <div className='list_items' key={index} >

                                    <span  className='checkcircle' onClick={()=>tickIt(dataItems.id,dataItems.flag)} ><CheckCircleOutlineIcon /></span>

                                    <span className='data_items'  style={{textDecoration:!dataItems.flag ? "line-through" :"none"}}  >{dataItems.title}</span>

                                    <span className='delete_span'>
                                        <span className='edit_icon' onClick={() => edit_txt(dataItems.title, dataItems.id)}> <EditIcon /></span>
                                        <span className='del_icon' onClick={() => deleteTask(index)}><DeleteIcon /></span>
                                    </span>

                            </div>
                      )})}
                </span>
                
        </div>
      </>

  );
}

export default Todo;
