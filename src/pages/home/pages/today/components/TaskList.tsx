import { FaCalendarAlt } from "react-icons/fa";
import { tasks } from "../../../data/tasks";
import { FiChevronRight } from "react-icons/fi";

const TaskList = () => {
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

  return (
    <div className="mt-[20px]">
      {tasks.map((task) => (
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
    </div>
  );
};

export default TaskList;
