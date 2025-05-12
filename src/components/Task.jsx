import { useState } from "react";
import EditTask from "./EditTask";
import PrimaryButton from "./PrimaryButton";
import BigPrimaryButton from "./BigPrimaryButton";
import { createTask } from "../services/API";


function Task() {
  const [tasks, setTasks] = useState([{ id: 1, title: "Task 1", completed: false, duration: 1 }]);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({ title: "", duration: 1 });

  const handleAddTask = async (e) => {
    
    try{
      let res = await createTask('Task', 60, 'penting', 'belajar')
      console.log(res.data.message)
    }
    catch(err){
      console.log(err.response?.data?.message || err.message)
    }
    
  };

  const handleEditTask = (task) => {
    setIsEditing(task.id);
    setEditData({ title: task.title, duration: task.duration });
  };

  const handleSaveEdit = () => {
    setTasks(tasks.map((task) => (task.id === isEditing ? { ...task, title: editData.title, duration: editData.duration } : task)));
    setIsEditing(null);
  };

  const handleDeleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== isEditing));
    setIsEditing(null);
  };

  return (
    <div className="w-[40%] mt-10 relative flex-col flex ">
      <div className="flex justify-between font-bold border-b-[3px] mb-3">
        <h3>Task</h3>
        <h3>Duration</h3>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className="border border-dashed p-3 mb-2 rounded-md flex justify-between items-center">
          <div>
            <input type="checkbox" className="mr-2" />
            {task.title}
          </div>
          <div className="flex ">
            <div>{`0/${task.duration}`}</div>
            <button onClick={handleAddTask} >
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5Z" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19Z" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <BigPrimaryButton onClick={handleAddTask} >
        + Add task
      </BigPrimaryButton>

      {/* Modal Edit */}
      {isEditing !== null && (
        <EditTask task={tasks.find((t) => t.id === isEditing)} setIsEditing={setIsEditing} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} editData={editData} setEditData={setEditData} handleSaveEdit={handleSaveEdit} />
      )}
    </div>
  );
}

export default Task;
