import { FiChevronRight } from "react-icons/fi"
import { tomorrowTasks } from "../../data/tasks"
import CreateTodo from "../today/components/CreateTodo"

const Tomorrow = () => {
    return (
        <div className="w-[50%] border border-white2 p-5 rounded-[10px] h-fit max-900:w-full max-900:mb-[30px]">
            <div className="flex items-center justify-start gap-9 max-900:ml-[50px]">
                <div className="title">
                    <h1 className="text-[25px] font-semibold">Tommorrow</h1>
                </div>

            </div>
            <CreateTodo />
            {tomorrowTasks.map((task) => (
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
            ))}
        </div>
    )
}

export default Tomorrow