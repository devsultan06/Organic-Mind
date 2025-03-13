import { FiChevronRight } from "react-icons/fi";
import CreateTodo from "../today/components/CreateTodo";
import useTasks from "../../hooks/useTasks"; 

const Tomorrow = () => {
    const { tasks } = useTasks(); 

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const tomorrowTasks = tasks.filter((task) => task.date === tomorrowStr && task.category !== "week");

    return (
        <div className="w-[50%] border border-white2 p-5 rounded-[10px] h-fit max-900:w-full max-900:mb-[30px]">
            <div className="flex items-center justify-start gap-9">
                <div className="title">
                    <h1 className="text-[25px] font-semibold">Tomorrow</h1>
                </div>
            </div>

            <CreateTodo category="tomorrow" />

            {/* Render tomorrow's tasks */}
            {tomorrowTasks.length > 0 ? (
                tomorrowTasks.map((task) => (
                    <div
                        key={task.id}
                        className="p-3 border-b cursor-pointer hover:bg-white2 transition duration-200 ease-in-out rounded-[10px]"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    className="cursor-pointer"
                                />
                                <span className="text-lg">{task.title}</span>
                            </div>
                            <div>
                                <FiChevronRight className="text-gray-500" />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 mt-3">No tasks for tomorrow.</p>
            )}
        </div>
    );
};

export default Tomorrow;
