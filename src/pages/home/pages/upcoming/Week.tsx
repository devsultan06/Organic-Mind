import { FiChevronRight } from "react-icons/fi";
import useTasks from "../../hooks/useTasks";
import CreateTodo from "../today/components/CreateTodo";

const Week = () => {
    const { tasks } = useTasks();
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); // Reset today's time to avoid issues

    // Get the end of the week (Saturday)
    const endOfWeek = new Date(todayDate);
    endOfWeek.setDate(todayDate.getDate() + (6 - todayDate.getDay())); // Move to Saturday
    endOfWeek.setHours(23, 59, 59, 999); // Ensure it covers the full day

    const thisWeekTasks = tasks.filter(task => {
        if (!task.date) return false;

        const taskDate = new Date(task.date); // Convert task date to Date object
        taskDate.setHours(0, 0, 0, 0); // Reset time for accurate comparison

        return taskDate >= todayDate && taskDate <= endOfWeek; // Only tasks from today to Saturday
    });


    return (
        <div className="w-[50%] border border-white2 p-5 rounded-[10px] max-900:w-full">
            <div className="flex items-center justify-start gap-9">
                <div className="title">
                    <h1 className="text-[25px] font-semibold">This Week</h1>
                </div>
            </div>

            {/* Pass "week" to CreateTodo */}
            <CreateTodo category="week" />

            {thisWeekTasks.length > 0 ? (
                thisWeekTasks.map((task) => (
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
                    </div>
                ))
            ) : (
                <p className="text-gray-500 mt-3">No tasks for this week.</p>
            )}
        </div>
    );
};

export default Week;
