import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GetStarted } from "./pages/get-started/GetStarted";
import Auth from "./pages/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import { fetchUser } from "./store/slices/userSlice";
import ProtectedRoute from "./routes/ProtectedRoute";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
