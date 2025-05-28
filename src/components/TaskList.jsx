import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { getTasks } from "../services/API";
import useAxios from "../hooks/useAxios";

const TaskList = () => {
  const {
    data: tasks,
    loading,
    error,
    refetch,
  } = useAxios({
    url: "task/?limit=10",
    method: "GET",
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error: {error}</p>
        <button onClick={refetch} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Try Again
        </button>
      </div>
    );
  }

  if (!tasks?.length) {
    return <div className="text-center p-4">No tasks found</div>;
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
