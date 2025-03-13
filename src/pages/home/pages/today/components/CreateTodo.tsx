import { useState } from "react";
import useTasks from "../../../hooks/useTasks";

type Category = "week" | "today" | "tomorrow";

interface CreateTodoProps {
    category: Category;
}

const CreateTodo: React.FC<CreateTodoProps> = ({ category }) => {
    const { addTask } = useTasks();
    const [task, setTask] = useState("");
    const [taskDate, setTaskDate] = useState("");

    const handleAddTask = () => {
        if (!task.trim()) return;
        addTask(task, category, category === "week" ? taskDate : undefined);
        setTask("");
        setTaskDate("");
    };

    return (
        <div className="border border-white2 w-full h-auto flex flex-col gap-3 px-3 py-2 mt-[10px] rounded-[10px]">
            <div className="flex items-center gap-3">
                <button onClick={handleAddTask} className="text-[25px] leading-none flex items-center">
                    +
                </button>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add New Task"
                    className="outline-none border-none p-[5px] w-full"
                    onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                />
            </div>

            {/* Show date picker for "week" category */}
            {category === "week" && (
                <input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    className="border p-[5px] rounded w-full"
                />
            )}
        </div>
    );
};

export default CreateTodo;
