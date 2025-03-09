import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GetStarted } from "./pages/get-started/GetStarted";
import Auth from "./pages/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import { fetchUser } from "./store/slices/userSlice";
import ProtectedRoute from "./routes/ProtectedRoute";
import UpComing from "./pages/home/pages/upcoming/UpComing";
import Today from "./pages/home/pages/today/Today";
import Calendar from "./pages/home/pages/calendar/Calendar";
import Personal from "./pages/home/pages/personal/Personal";
import StickyWall from "./pages/home/pages/stickywall/StickyWall";
import Work from "./pages/home/pages/work/Work";
import List from "./pages/home/pages/list/List";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  console.log(user, isAuthenticated, loading);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/get-started" replace />} />
        <Route path="/get-started" element={<GetStarted />} />
        {/* Direct routes for login and register */}
        <Route path="/get-started/login" element={<Auth />} />
        <Route path="/get-started/register" element={<Auth />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />

        <Route path="/" element={<ProtectedRoute element={<Home />} />}>
          <Route path="upcoming" element={<UpComing />} />
          <Route path="today" element={<Today />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="personal" element={<Personal />} />
          <Route path="stickywall" element={<StickyWall />} />
          <Route path="work" element={<Work />} />
          <Route path="list" element={<List />} />
          <Route path="personal" element={<Personal />} />

          {/* Redirect from "/" to "/today" */}
          <Route path="home" element={<Navigate to="today" replace />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
