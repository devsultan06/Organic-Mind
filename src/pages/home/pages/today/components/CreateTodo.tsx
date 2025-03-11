
const CreateTodo = () => {
    return (
        <div className="border border-white2 w-full h-[50px] flex items-center gap-3 px-3 mt-[10px] rounded-[10px]">
            <span className="text-[25px] leading-none flex items-center">+</span>
            <input type="text" placeholder="Add New Task" className="outline-none border-none p-[5px]" />
        </div>

    )
}

export default CreateTodo