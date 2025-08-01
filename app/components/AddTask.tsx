"use client"
import { AiOutlinePlus } from 'react-icons/ai'
import TodoList from './TodoList'
import { Itask } from "../../types/tasks"
import Modal from "./Modal"
import React, { FormEventHandler } from "react";
import { addTodo } from "@/api";
import { useRouter } from 'next/navigation';

interface AddTaskProps {
  tasks: Itask[];
}

const AddTask: React.FC<AddTaskProps> = ({ tasks }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = React.useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: `task_${Math.random() * 1000}`,
      text: newTaskValue,
    }).then((newTodo) => {
      // console.log('New task added:', newTodo);
      setNewTaskValue("");
      setModalOpen(false);
      router.refresh();
    }).catch((error) => {
      console.error('Error adding new task:', error);
    } );
  }
  return (
    <>
      <div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">ADD NEW TASK
          <AiOutlinePlus className='ml-2 mt-1' size = {18} /> 
        </button>
        <Modal  modalOpen={modalOpen} setModalOpen={setModalOpen}>
         <form onSubmit={(e) => handleSubmitNewTodo(e)} >
          <h3 className='font-bold text-lg'>Add new task</h3>
          <div className="modalAction">
           <input type="text" placeholder="Type here" className="input" w-full 
           value={newTaskValue} onChange={e => setNewTaskValue(e.target.value)} />
           <button className="btn" type="submit">Submit</button>
          </div>
         </form>
        </Modal>
      </div>
      <TodoList tasks={tasks} />
    </>
  )
}

export default AddTask
