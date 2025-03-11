import { FaPlus } from "react-icons/fa";
import { stickyNotes } from "../../data/stickyNotes";

const StickyWall = () => {
    return (
        <div className="mb-[30px]">
            <div className="title max-900:ml-[50px]">

                <h1 className="text-[35px] font-semibold">Sticky Wall</h1>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 border border-white2 rounded-[10px] mt-[30px]">                {stickyNotes.map((note) => (
                <div key={note.id} className={`p-4 rounded-md shadow-md ${note.bgColor}`}>
                    <h3 className="font-semibold text-lg">{note.title}</h3>
                    <ul className="mt-2 text-sm text-gray-700">
                        {note.content.map((item, index) => (
                            <li key={index}>- {item}</li>
                        ))}
                    </ul>
                </div>
            ))}

                {/* Add new note */}
                <div className="p-4  flex items-center justify-center bg-gray-200 rounded-md shadow-md cursor-pointer">
                    <FaPlus className="text-2xl text-gray-600" />
                </div>
            </div>
        </div >
    );
};

export default StickyWall;
