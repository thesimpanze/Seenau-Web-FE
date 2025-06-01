import { useState, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const EditTask = ({ task, isNew, onClose, onSave, onDelete }) => {
  const [alert, setAlert] = useState('')
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    category: "",
    description: ""
  });

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || task.title || "",
        duration: task.duration || "",
        category: task.category || "pemula", // Default value
        description: task.description || ""
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "duration" ? (value === "" ? "" : parseInt(value, 10) || 0) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setAlert("Task name tidak boleh kosong");
      return;
    }
    
    if (!formData.category.trim()) {
      setAlert("Category tidak boleh kosong");
      return;
    }
    
    if (!formData.description.trim()) {
      setAlert("Description tidak boleh kosong");
      return;
    }
    
    const duration = parseInt(formData.duration, 10) || 0;
    if (duration <= 0) {
      setAlert("Durasi harus lebih dari 0 menit");
      return;
    }
    
    // Save task
    onSave({
      ...formData,
      duration
    });
  };
  console.log(task.id)
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 px-10 md:px-0">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg relative flex flex-col gap-2">
        <button 
          className="absolute top-2 right-3 text-xl font-bold" 
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="font-bold text-center text-lg">{isNew ? "Task Baru" : "Edit Task"}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="">
            <label className="block mb-1 font-medium">Name:</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded" 
              placeholder="Enter task name"
              autoFocus
            />
          </div>

          <div className="">
            <label className="block mb-1 font-medium">Category:</label>
            <input type="text"
              name="category"
              value={'penting'}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded" disabled
            />
             
            
          </div>

          <div className="">
            <label className="block mb-1 font-medium">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded" 
              placeholder="Enter task description"
              rows="3"
            />
          </div>

          <div className="  ">
            <label className="block mb-1 font-medium">Duration (minutes):</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter duration"
              min="1"
            />
          </div>
          {alert && (
            <span className="text-red-500 text-sm">
              {alert}
            </span>
          )}

          <div className="flex justify-between gap-2 ">
            <PrimaryButton type="submit">
              {isNew ? "Add Task" : "Save Changes"}
            </PrimaryButton>
            
            {!isNew && (
              <SecondaryButton type="button" onClick={onDelete}>
                Delete
              </SecondaryButton>
            )}

            
            {isNew && (
              <SecondaryButton type="button" onClick={onClose}>
                Cancel
              </SecondaryButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;