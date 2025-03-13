import { useLocation } from "react-router-dom";
import CreateTodo from "./components/CreateTodo";
import useTasks from "../../hooks/useTasks";
import TaskList from "./components/TaskList";


const Today = () => {
    const { tasks } = useTasks();

    const location = useLocation();

    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const todayTasks = tasks.filter((task) => task.date === today && task.category !== "week");


    return (
        <div className={`${location.pathname === "/today" ? "max-900:mt-[80px]" : ""}`}>
            <div className="flex items-center justify-start gap-9">
                <div className="title">

                    <h1 className={`font-semibold ${location.pathname === "/today" ? "text-[35px]" : "text-[25px]"}`}>
                        Today
                    </h1>                </div>
                {location.pathname === "/today" ? <div className="number border border-white2 w-[40px] h-[40px] flex items-center justify-center">
                    <p className="text-[25px] leading-none">{todayTasks.length}</p>
                </div> : null}


            </div>
            <CreateTodo category="today" />

            <TaskList tasks={todayTasks} />

        </div>

    );
};

export default Today;
