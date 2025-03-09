import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FiSettings, FiLogOut, FiCalendar, FiSearch } from "react-icons/fi";
import { MdStickyNote2 } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";

export default function Sidebar2() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="h-screen relative">
            {!mobileOpen && (
                <button
                    className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
                    onClick={() => setMobileOpen(true)}
                >
                    <AiOutlineMenu size={24} />
                </button>
            )}

            <div
                className={`fixed top-0  left-0 h-full transition-all duration-300 z-40 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    } md:relative md:translate-x-0`}
            >
                <Sidebar collapsed={collapsed} className="h-full bg-white2  text-black" rootStyles={{
                    height: "100%",
                    width: collapsed ? "80px" : "300px",
                }} >
                    <Menu>
                        <MenuItem icon={<AiOutlineMenu />} onClick={() => setCollapsed(!collapsed)}>
                            Menu
                        </MenuItem>
                        <MenuItem icon={<FiSearch />} className="flex border border-gray-300 rounded-md">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full p-2  outline-none bg-transparent "
                            />
                        </MenuItem>

                        <div className="border-b border-gray-300">


                            <div className="pl-4 py-2 text-gray-600 font-semibold ">Tasks</div>

                            <MenuItem icon={<FiCalendar />}>
                                <div className="flex justify-between w-full">
                                    <span>Upcoming</span>
                                    <span className="text-gray-500">12</span>
                                </div>
                            </MenuItem>

                            <MenuItem icon={<FiCalendar />}>
                                <div className="flex justify-between w-full">
                                    <span>Today</span>
                                    <span className="text-gray-500">5</span>
                                </div>
                            </MenuItem>


                            <MenuItem icon={<FiCalendar />} className="text-black">Calendar</MenuItem>
                            <MenuItem icon={<MdStickyNote2 />}>Sticky Wall</MenuItem>
                        </div>

                        <div className="border-b border-gray-300">
                            <div className="pl-4 py-2 text-gray-600 font-semibold  mt-3">Lists</div>

                            <MenuItem icon={<FiCalendar />}>
                                <div className="flex justify-between w-full">
                                    <span>Personal</span>
                                    <span className="text-gray-500">3</span>
                                </div>
                            </MenuItem>

                            <MenuItem icon={<FiCalendar />}>
                                <div className="flex justify-between w-full">
                                    <span>Work</span>
                                    <span className="text-gray-500">6</span>
                                </div>
                            </MenuItem>

                            <MenuItem icon={<FiCalendar />}>
                                <div className="flex justify-between w-full">
                                    <span>List 1</span>
                                    <span className="text-gray-500">3</span>
                                </div>
                            </MenuItem>

                            <MenuItem className="pl-3 text-gray-700 font-semibold text-[20px]">
                                + <span className="ml-4 text-[15px]">Add New List</span>
                            </MenuItem>
                        </div>




                        <div>
                            <div className="pl-4 py-2 text-gray-600 font-semibold mt-3">Tags</div>

                            {/* Tags Grid */}
                            <div className="grid grid-cols-3 gap-2 px-4">
                                <div className="bg-green-200 text-green-800 px-2 py-1 rounded-md text-center text-sm">
                                    Tag 1
                                </div>
                                <div className="bg-red-200 text-red-800 px-2 py-1 rounded-md text-center text-sm">
                                    Tag 2
                                </div>
                                <div className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md text-center text-sm">
                                    Tag 3
                                </div>


                            </div>
                            <div className="border border-dashed border-gray-400 px-2 py-1 w-[50%] ml-4 mt-5 rounded-md text-center text-sm text-gray-600 cursor-pointer">
                                + Add Tag
                            </div>
                        </div>


                        <MenuItem icon={<FiSettings />}>Settings</MenuItem>
                        <MenuItem icon={<FiLogOut />}>Sign out</MenuItem>
                    </Menu>
                </Sidebar>
            </div>

            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                    onClick={() => setMobileOpen(false)}
                ></div>
            )}
        </div>
    );
}
