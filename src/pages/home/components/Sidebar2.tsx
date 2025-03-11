import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FiSettings, FiLogOut, FiCalendar, FiSearch } from "react-icons/fi";
import { MdStickyNote2, MdToday, MdUpcoming } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";


export default function Sidebar2() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const [hovered, setHovered] = useState<string | null>(null);

    const getBgColor = (path: string) => {
        if (location.pathname === path) return "#ebebeb";
        return hovered === path ? "#ebebeb" : "transparent";
    };

    return (
        <div className="h-screen relative">
            {!mobileOpen && (
                <div className="md:hidden fixed top-0 left-0 z-50 p-2 bg-white2 w-full flex items-center gap-6" >

                    <button
                        className=" bg-gray-800 text-white rounded-md  p-2"
                        onClick={() => setMobileOpen(true)}
                    >
                        <AiOutlineMenu size={24} />
                    </button>

                    <div>
                        <h1 className="text-[25px]">Organic Mind</h1>
                    </div>
                </div>

            )}

            <div
                className={`fixed top-0  left-0 h-full transition-all duration-300 z-40 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    } md:relative md:translate-x-0`}
            >
                <Sidebar collapsed={collapsed} className="h-full bg-white3  text-black" rootStyles={{
                    height: "100%",
                    width: collapsed ? "80px" : "300px",
                }} >
                    <Menu>
                        <MenuItem icon={<AiOutlineMenu />} onClick={() => setCollapsed(!collapsed)}
                            style={{
                                backgroundColor: "transparent",
                                cursor: "pointer",
                            }}
                            className="hover:bg-transparent focus:bg-transparent active:bg-transparent">
                            Organic Mind
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

                            <MenuItem
                                icon={<MdUpcoming />}
                                component={<Link to="/upcoming" />}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    backgroundColor: getBgColor("/upcoming"),
                                    transition: "background-color 0.3s ease",
                                    marginBottom: "5px",
                                    borderRadius: "5px"
                                }}
                                onMouseEnter={() => setHovered("/upcoming")}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div className="flex justify-between w-full">
                                    <span>Upcoming</span>
                                    <span className="text-gray-500">12</span>
                                </div>
                            </MenuItem>

                            <MenuItem
                                icon={< MdToday />}
                                component={<Link to="/today" />}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    backgroundColor: getBgColor("/today"),
                                    transition: "background-color 0.3s ease",
                                    marginBottom: "5px",
                                    borderRadius: "5px"
                                }}
                                onMouseEnter={() => setHovered("/today")}
                                onMouseLeave={() => setHovered(null)}

                            >
                                <div className="flex justify-between w-full">
                                    <span>Today</span>
                                    <span className="text-gray-500">5</span>
                                </div>
                            </MenuItem>

                            <MenuItem
                                icon={<FiCalendar />}
                                className="text-black"
                                component={<Link to="/calendar" />}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    backgroundColor: getBgColor("/calendar"),
                                    transition: "background-color 0.3s ease",
                                    marginBottom: "5px",
                                    borderRadius: "5px"
                                }}
                                onMouseEnter={() => setHovered("/calendar")}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div >Calendar</div>
                            </MenuItem>

                            <MenuItem
                                icon={<MdStickyNote2 />}
                                component={<Link to="/stickywall" />}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    backgroundColor: getBgColor("/stickywall"),
                                    transition: "background-color 0.3s ease",
                                    marginBottom: "5px",
                                    borderRadius: "5px"
                                }}
                                onMouseEnter={() => setHovered("/stickywall")}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div >Sticky Wall</div>
                            </MenuItem>

                        </div>

                        <div className="border-b border-gray-300">
                            <div className="pl-4 py-2 text-gray-600 font-semibold  mt-3">Lists</div>

                            <MenuItem
                                icon={<FiCalendar />}
                                component={<Link to="/personal" />}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    backgroundColor: getBgColor("/personal"),
                                    transition: "background-color 0.3s ease",
                                    marginBottom: "5px",
                                    borderRadius: "5px"
                                }}
                                onMouseEnter={() => setHovered("/personal")}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div className="flex justify-between w-full">
                                    <span>Personal</span>
                                    <span className="text-gray-500">3</span>
                                </div>
                            </MenuItem>


                            <MenuItem
                                icon={<FiCalendar />}
                                component={<Link to="/work" />}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    backgroundColor: getBgColor("/work"),
                                    transition: "background-color 0.3s ease",
                                    marginBottom: "5px",
                                    borderRadius: "5px"
                                }}
                                onMouseEnter={() => setHovered("/work")}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div className="flex justify-between w-full">
                                    <span>Work</span>
                                    <span className="text-gray-500">6</span>
                                </div>
                            </MenuItem>

                            <MenuItem
                                icon={<FiCalendar />}
                                component={<Link to="/list" />}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    backgroundColor: getBgColor("/list"),
                                    transition: "background-color 0.3s ease",
                                    marginBottom: "5px",
                                    borderRadius: "5px"
                                }}
                                onMouseEnter={() => setHovered("/list")}
                                onMouseLeave={() => setHovered(null)}
                            >
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

                            <div className="grid grid-cols-3 gap-2 px-4">
                                <div className="bg-green-200 px-2 py-1 rounded-md text-center text-sm">
                                    Tag 1
                                </div>
                                <div className="bg-red2 px-2 py-1 rounded-md text-center text-sm">
                                    Tag 2
                                </div>
                                <div className="bg-blue-200 px-2 py-1 rounded-md text-center text-sm">
                                    Tag 3
                                </div>


                            </div>
                            <div className="border border-dashed border-gray-400 px-2 py-1 w-[50%] ml-4 mt-5 rounded-md text-center text-sm text-gray-600 cursor-pointer">
                                + Add Tag
                            </div>
                        </div>


                        <MenuItem
                            icon={<FiSettings />}
                            component={<Link to="/settings" />}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                backgroundColor: getBgColor("/settings"),
                                transition: "background-color 0.3s ease",
                                marginBottom: "5px",
                                borderRadius: "5px",
                                marginTop: "10px"

                            }}
                            onMouseEnter={() => setHovered("/settings")}
                            onMouseLeave={() => setHovered(null)}>
                            Settings
                        </MenuItem>
                        <MenuItem
                            icon={<FiLogOut />}
                            component={<Link to="/logout" />}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                backgroundColor: getBgColor("/logout"),
                                transition: "background-color 0.3s ease",
                                marginBottom: "5px",
                                borderRadius: "5px",

                            }}
                            onMouseEnter={() => setHovered("/logout")}
                            onMouseLeave={() => setHovered(null)}>
                            Sign out
                        </MenuItem>
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
