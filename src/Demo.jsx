import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



function Demo() {
  const [item, setItem] = useState('');
  const [arr, setArr] = useState([]);



  const Inputchange = (event) => {
    setItem(event.target.value);
  }

  const submit = () => {

    setArr((oldArr) => {
      return [...oldArr, item];
    });
    setItem('');
    console.log(arr);
  }

  const deleteItems = (id) => {

    // console.log("delete items");

    setArr((oldarr) => {
      return oldarr.filter((arrEle, index) => {
        return index !== id;
      })
    })
  }

  return (
    <>
      <div className='center-div'>
        <div className='heading'>
          <h1>ToDO List</h1>
        </div>
        <div className='maincontainer'>

          <span className='inputcontainer'>

            <input type={'text'} onChange={Inputchange} value={item} placeholder="Add Task" />

            <button className='buttoncontainer' onClick={submit}>+</button>
          </span>
          <div className='listcontainer'>
            <ol>
              {arr.map((val, index) => {
                console.log(val);
                return <li key={index} >{val} <span className='delete-btn rotate-btn' onClick={() => deleteItems(index)}><DeleteOutlineOutlinedIcon /></span></li>

              })}
              {console.log(arr)}
            </ol>

          </div>
        </div>
      </div>
    </>
  );

}

export default Demo;