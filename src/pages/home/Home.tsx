import { Outlet } from "react-router-dom";
import Sidebar2 from "./components/Sidebar2";

const Home = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="h-full overflow-y-auto">
        <Sidebar2 />
      </div>

      <div className="flex-1 overflow-y-auto px-[20px] py-[10px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
