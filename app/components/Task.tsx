"use client";
import React, { FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import Modal from "./Modal";
import { editTodo } from "../../api";
import { Itask } from "../../types/tasks";
import { deleteTodo } from "../../api"; // Ensure this import is correct
interface TaskProps {
  task: Itask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = React.useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = React.useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = React.useState<string>(task.text);
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    }).then((newTodo) => {
      // Optionally log the new todo
      // console.log("New task added:", newTodo);
      router.refresh();
      setOpenModalEdit(false);
    });

};
  const handleDeleteTask = async (id: string) => {
      // console.log("Deleting task with ID:", id);
      await deleteTodo(id);
      router.refresh();
      setOpenModalDelete(false);
  };
  return (
<tr data-testid={`task-${task.id}`}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={25}
          className="text-blue-500 hover:text-blue-500 cursor-pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modalAction">
              <input
                type="text"
                placeholder="Type here"
                className="input w-full"
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
              />
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <GoTrash
          size={25}
          className="text-red-500 hover:text-red-500 cursor-pointer"
          onClick={() => setOpenModalDelete(true)}
        />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className="text-lg">Are you sure you want to delete this task?</h3>
                    <div className="modalAction">
                        <button className="btn" onClick={() => handleDeleteTask(task.id)}>
                            Yes
                        </button>
                    </div>
        </Modal>
      </td>
    </tr>
  );
};
export default Task;