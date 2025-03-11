import { useLocation } from "react-router-dom";
import CreateTodo from "./components/CreateTodo";
import TaskList from "./components/TaskList";

const Today = () => {
    const location = useLocation();

    return (
        <div className={`${location.pathname === "/today" ? "max-900:mt-[80px]" : ""}`}>
            <div className="flex items-center justify-start gap-9">
                <div className="title">

                    <h1 className={`font-semibold ${location.pathname === "/today" ? "text-[35px]" : "text-[25px]"}`}>
                        Today
                    </h1>                </div>
                {location.pathname === "/today" ? <div className="number border border-white2 w-[40px] h-[40px] flex items-center justify-center">
                    <p className="text-[25px] leading-none">5</p>
                </div> : null}


            </div>
            <CreateTodo />

            <TaskList />

        </div>

    );
};

export default Today;
