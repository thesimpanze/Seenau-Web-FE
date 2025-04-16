import React, { useState } from "react";

function Task() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", completed: false, duration: 1 },
  ]);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({ title: "", duration: 1 });

  const handleAddTask = () => {
    const newId = tasks.length + 1;
    setTasks([
      ...tasks,
      { id: newId, title: `Task ${newId}`, completed: false, duration: 1 },
    ]);
  };

  const handleEditTask = (task) => {
    setIsEditing(task.id);
    setEditData({ title: task.title, duration: task.duration });
  };

  const handleSaveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === isEditing
          ? { ...task, title: editData.title, duration: editData.duration }
          : task
      )
    );
    setIsEditing(null);
  };

  const handleDeleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== isEditing));
    setIsEditing(null);
  };

  return (
    <div className="w-[40%] mt-10 relative">
      <div className="flex justify-between font-bold border-b-[3px] mb-3">
        <h3>Task</h3>
        <h3>Duration</h3>
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="border border-dashed p-3 mb-2 rounded-md flex justify-between items-center"
        >
          <div>
            <input type="checkbox" className="mr-2" />
            {task.title}
          </div>
          <div>{`0/${task.duration}`}</div>
          <button
            onClick={() => handleEditTask(task)}
            className="text-gray-500 hover:text-black text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M17.707 2.293a1 1 0 011.414 1.414l-12 12a1 1 0 01-.553.293l-4 1a1 1 0 01-1.25-1.25l1-4a1 1 0 01.293-.553l12-12a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}

      <button
        onClick={handleAddTask}
        className="border border-dotted p-3 w-full text-center rounded-md"
      >
        + Add task
      </button>

      {/* Modal Edit */}
      {isEditing !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 shadow-2xl">
          <div className="bg-white p-6 rounded-lg w-[300px] shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-xl"
              onClick={() => setIsEditing(null)}
            >
              &times;
            </button>
            <h2 className="font-bold mb-4">Details</h2>

            <div className="mb-3">
              <label className="block mb-1">Nama:</label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Duration:</label>
              <input
                type="number"
                min={1}
                value={editData.duration}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    duration: parseInt(e.target.value),
                  })
                }
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleSaveEdit}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleDeleteTask}
                className="border border-black px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
