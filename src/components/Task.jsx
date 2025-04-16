const Task = () =>{
    return(
        <div className="w-full flex items-center justify-center flex-col">
        <div className="flex justify-between px-2.5 w-[45%] pt-7 font-semibold text-lg ">
            <span>Task</span>
            <span>Duration</span>
        </div>
        <div className="w-[45%] border-b-black border-2 mt-0.5 mb-4"></div>
        <div className="flex justify-between px-2.5 py-2 w-[45%] font-semibold text-lg  border-dashed border-2 rounded-md">
            
            <label value="" className="space-x-1.5">
                <input type="checkbox" className="form-checkbox rounded focus:ring-0" />
            <span>Task 1</span>
            </label>
            <span>0/1</span>
        </div>
        </div>
    )
}
export default Task;