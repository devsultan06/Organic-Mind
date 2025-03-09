import { Outlet } from "react-router-dom";
import Sidebar2 from "./components/Sidebar2";

const Home = () => {
  return (
    <div className="flex gap-5">
      <Sidebar2 />
      <Outlet />
    </div>
  );
};

export default Home;
