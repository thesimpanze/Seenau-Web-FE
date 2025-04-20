import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";


const EditTask = ({ task, setIsEditing, handleEditTask, handleDeleteTask, editData, setEditData, handleSaveEdit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 shadow-2xl">
      <div className="bg-white p-6 rounded-lg w-[300px] shadow-lg relative">
        <button className="absolute top-2 right-3 text-xl" onClick={() => setIsEditing(null)}>
          &times;
        </button>
        <h2 className="font-bold mb-4">Details</h2>

        <div className="mb-3">
          <label className="block mb-1">Nama:</label>
          <input type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="w-full border border-gray-300 p-2 rounded" />
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
          <PrimaryButton onClick={handleSaveEdit} >
            Save
          </PrimaryButton>
          <SecondaryButton onClick={handleDeleteTask} >
            Delete
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
