import { useEffect, useState } from "react";
import Today from "../today/Today";
import Tomorrow from "./Tomorrow";
import Week from "./Week";
import useTasks from "../../hooks/useTasks";

const UpComing = () => {
    const { tasks } = useTasks();
    const [upcomingCount, setUpcomingCount] = useState(0);

    useEffect(() => {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(todayDate);
        endOfWeek.setDate(todayDate.getDate() + (6 - todayDate.getDay())); 
        endOfWeek.setHours(23, 59, 59, 999);

        const weekTasks = tasks.filter(task => {
            if (!task.date) return false;
            const taskDate = new Date(task.date);
            return taskDate >= todayDate && taskDate <= endOfWeek;
        });

        setUpcomingCount(weekTasks.length);
    }, [tasks]);

    return (
        <div className="mb-[50px] max-900:mt-[80px]">
            <div className="flex items-center justify-start gap-9 mb-[25px]">
                <div className="title">
                    <h1 className="text-[35px] font-semibold">Upcoming</h1>
                </div>
                <div className="number border border-white2 w-[40px] h-[40px] flex items-center justify-center">
                    <p className="text-[25px] leading-none">{upcomingCount}</p>
                </div>
            </div>

            <div className="today border border-white2 p-5 rounded-[10px]">
                <Today />
            </div>

            <div className="flex justify-between gap-8 mt-[30px] max-900:block">
                <Tomorrow />
                <Week />
            </div>
        </div>
    );
};

export default UpComing;
