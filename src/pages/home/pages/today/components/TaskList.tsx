import { FaCalendarAlt } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { db } from "../../../../../firebase/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { tasks2 } from "../../../data/tasks";
interface Task {
  id: string;
  title: string;
  completed: boolean;
  date?: string;
  subtasks?: number;
  category?: string;
}

type TaskListProps = {
  tasks: Task[]; 
};


const TaskList = ({ tasks }: TaskListProps) => {
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Personal":
        return "bg-red2";
      case "List 1":
        return "bg-yellow";
      default:
        return "bg-gray-200";
    }
  };

  const toggleTaskCompletion = async (task: Task) => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, { completed: !task.completed });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="mt-[20px]">
      {tasks2.map((task) => (
        <div key={task.id} className="p-3 border-b cursor-pointer hover:bg-white2 transition duration-200 ease-in-out rounded-[10px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={task.completed} className="cursor-pointer" />
              <span className="text-lg">{task.title}</span>
            </div>
            <div>
              <FiChevronRight className="text-gray-500" />
            </div>
          </div>


          {(task.date || task.subtasks > 0 || task.category) && (
            <div className="flex items-center gap-3 pt-[10px] ">
              {task.date && (
                <div className="flex items-center gap-1 text-gray-500">
                  <FaCalendarAlt />
                  <span>{task.date}</span>
                </div>
              )}
              {task.subtasks > 0 && (
                <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">
                  {task.subtasks} Subtasks
                </div>
              )}
              {task.category && (
                <div className={`px-2 py-1 rounded-md text-sm ${getCategoryStyles(task.category)}`}>
                  {task.category}
                </div>
              )}
            </div>
          )}


        </div>
      ))}

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 mt-5">
          <p className="text-lg">You have no tasks yet! 🎉</p>
          <p className="text-sm">Start by adding a new task.</p>
        </div>) : (
        tasks.map((task) => (
          <div key={task.id} className="p-3 border-b cursor-pointer hover:bg-white2 transition duration-200 ease-in-out rounded-[10px]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="cursor-pointer"
                  onChange={() => toggleTaskCompletion(task)}
                />
                <span className="text-lg">{task.title}</span>
              </div>
              <div>
                <FiChevronRight className="text-gray-500" />
              </div>
            </div>

            {(task.date || (task.subtasks ?? 0) > 0 || task.category) && (
              <div className="flex items-center gap-3 pt-[10px]">
                {/* {task.date && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <FaCalendarAlt />
                    <span>{task.date}</span>
                  </div>
                )} */}
                {/* {(task.subtasks ?? 0) > 0 && (
                  <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">
                    {task.subtasks} Subtasks
                  </div>
                )}
                {task.category && (
                  <div className={`px-2 py-1 rounded-md text-sm ${getCategoryStyles(task.category)}`}>
                    {task.category}
                  </div>
                )} */}
              </div>
            )}
          </div>
        ))
      )}

    </div>
  );
};

export default TaskList;
