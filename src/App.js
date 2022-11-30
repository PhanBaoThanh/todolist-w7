import './App.scss';
import {useState} from 'react'
import { TodoContext } from './Context/TodoContext';
import TodoItem from './TodoItem.js'

//empty
//add
//changed
//remove
//removeAll


function App() {
  const [data,setData] = useState([])
  const [id,setId] = useState(0)
  const [value,setValue] = useState("")
  const [isEdit,setIsEdit] = useState(false)
  const [idEdit,setIdEdit] = useState()
  const [choose,setChoose] = useState('all')
  const [count,setCount] = useState(0)

  const handleEnterValue = e => {
      if(e.keyCode === 13 && value !== "" && value != null){
        if(isEdit){
          let temp = data.map(item => item.id === idEdit ? {...item,info: value} : item)
          setData(temp)
          setIsEdit(false)
        }
        else{
          let temp = [
            ...data,
            {
              id: id,
              info: value,
              isCompleted: false
            }
          ]
          setData(temp)
          setId(prev => prev + 1)
        }
        setValue("")
      }
    
  }

  const showCountItem = () => {
    if(choose === 'all')
      return data.length
    else if(choose === 'active')
      return data.filter(item => !item.isCompleted).length
    else if(choose === 'completed')
      return data.filter(item => item.isCompleted).length
  }

  const handleClickAddItem = () => {
    if(value !== "" && value !== null){
      if(isEdit){
        let temp = data.map(item => item.id === idEdit ? {...item,info: value} : item)
        setData(temp)
        setIsEdit(false)
      }
      else{
        let temp = [
          ...data,
          {
            id: id,
            info: value,
            isCompleted: false
          }
        ]
        setData(temp)
        setId(prev => prev + 1)
      }
      setValue("")
    }
  }

  const handleChangeValue = (e) => {
    setValue(e.target.value)
  }

  const handleClickClearBtn = () => {
    setData([])
  }

  const handleClickClearCompleteItem = () => {
    setData(prev => prev.filter(item => !item.isCompleted))
  }

  const handleClickCompletedAll = () => {
    setData(prev => prev.map(item => ({
      ...item,
      isCompleted: true
    })))
  }

  return (
    <TodoContext.Provider value={{data,setData,isEdit,setIsEdit,setValue,idEdit,setIdEdit}}>
      <div className="App">
        <div className='header'>Todo List</div>
        <div className='todo'>

          <div className='chooseBtns'>
            <div className={`chooseBtn ${choose === 'all' ? 'activeBtn' : ''}`} onClick={() => setChoose('all')}>All</div>
            <div className={`chooseBtn ${choose === 'active' ? 'activeBtn' : ''}`} onClick={() => setChoose('active')}>Active</div>
            <div className={`chooseBtn ${choose === 'completed' ? 'activeBtn' : ''}`} onClick={() => setChoose('completed')}>Completed</div>
          </div>

          <div className='input'>
            <input value={value} type='text' className='inputItem' onChange={e => handleChangeValue(e)} onKeyDown={e => handleEnterValue(e)} />
            <button className='btn' onClick={handleClickAddItem}>Add</button>
          </div>

          <div className='list'>
            {
              choose === 'all' ? (
                data.map(item => (<TodoItem key={item.id} idItem={item.id} info={item.info} isCompleted={item.isCompleted}/>))
              ) : choose === 'active' ? (
                data.map(item => item.isCompleted ? (<></>) : (<TodoItem key={item.id} idItem={item.id} info={item.info} isCompleted={item.isCompleted}/>))
              ) : (
                data.map(item => item.isCompleted ? (<TodoItem key={item.id} idItem={item.id} info={item.info} isCompleted={item.isCompleted}/>) : (<></>))
              )
            }

            <p style={{paddingTop: '24px',marginBottom: '24px',borderTop: '1px solid #ccc'}}>{showCountItem()} Items</p>

            {
              data.length>0 && (
                <div className='btns'>
                  <div className='clearBtn'>
                    <p onClick={handleClickClearBtn}>Clear Items</p>
                  </div>
                  <div className='clearBtn'>
                    <p onClick={handleClickCompletedAll}>Completed All</p>
                  </div>
                  <div className='clearBtn'>
                    <p onClick={handleClickClearCompleteItem}>Clear Completed Items</p>
                  </div>
                </div>

              )
            }
            
          </div>

        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
