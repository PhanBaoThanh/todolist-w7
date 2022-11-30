import React from 'react'
import './todo.scss'
import { useContext } from 'react'
import { TodoContext } from './Context/TodoContext'

const TodoItem = ({idItem,info,isCompleted}) => {
    const {
        data,
        setData,
        setIsEdit,
        setValue,
        setIdEdit
    } = useContext(TodoContext)

    const handleRemoveItem = () => {
        setData(data.filter(item => item.id !== idItem))
    }

    const handleClickEditBtn = () => {
        setIsEdit(true)
        setValue(info)
        setIdEdit(idItem)
    }

    const handleClickCompletedItem = id => {
        setData(prev => prev.map(item => item.id === id ? {...item,isCompleted: true} : item))
    }
  return (
    <div className='listItem'>
        <p style={{opacity: `${isCompleted ? '.6' : ''}`,textDecoration: `${isCompleted ? 'line-through' : ''}`}}>{info}</p>
        <div className='listBtn'>
            {
                !isCompleted && (
                    <>
                        <div className='listBtnItem green' onClick={handleClickEditBtn}>Edit</div>
                        <div className='listBtnItem green' onClick={() => handleClickCompletedItem(idItem)}>Completed</div>
                    </>
                )
            }
            <div className='listBtnItem red' onClick={handleRemoveItem}>Delete</div>
        </div>
    </div>
  )
}

export default TodoItem