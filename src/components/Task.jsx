import { useState, useEffect } from "react";
import EditTask from "./EditTask";
import BigPrimaryButton from "./BigPrimaryButton";
import { createTask, updateTask, deleteTask, getTasks } from "../services/API";

function Task() {
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isNewTask, setIsNewTask] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data?.message || err.message);
    }
  };

  const handleEditTask = (task) => {
    setTaskId(task._id);
    setEditingTask(task);
    setIsNewTask(false);
    setIsEditTaskOpen(true);
  };

  const handleAddTask = () => {
    setTaskId(null);
    setEditingTask({ name: "", duration: 0, category: "pemula", description: "" });
    setIsNewTask(true);
    setIsEditTaskOpen(true);
  };

  const handleCloseEditTask = () => {
    setIsEditTaskOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (formData) => {
    try {
      if (isNewTask) {
        let res = await createTask(formData.name, formData.duration, formData.category, formData.description);
        console.log(res.message)
        console.log(res.data)
      } else {
        await updateTask(taskId, formData.name, formData.duration, formData.category, formData.description);
      }
      fetchTasks();
      handleCloseEditTask();
    } catch (err) {
      console.error("Error saving task:", err.response?.data?.message || err.message);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(taskId);
      fetchTasks();
      handleCloseEditTask();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <div className="w-[40%]  mt-10 relative flex-col flex pb-10">
      <div className="flex justify-between font-bold border-b-2 mb-3">
        <h3>Task</h3>
        <h3>Duration</h3>
      </div>

      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div key={task._id} className="border border-dashed p-3 mb-2 rounded-md flex justify-between items-center">
            <div>
              <input type="checkbox" className="mr-2" />
              {task.name || task.title}
            </div>
            <div className="flex items-center gap-2">
              <div>{`0/${task.duration}`}</div>
              <button onClick={() => handleEditTask(task)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5Z" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19Z" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">No tasks yet</div>
      )}

      
        <BigPrimaryButton onClick={handleAddTask}>+ Add task</BigPrimaryButton>
      
      
      {isEditTaskOpen && (
        <EditTask
          task={editingTask}
          isNew={isNewTask}
          onClose={handleCloseEditTask}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default Task;