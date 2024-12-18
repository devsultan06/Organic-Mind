import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GetStarted } from "./pages/get-started/GetStarted";
import Auth from "./pages/auth/Auth";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/get-started" replace />} />
          <Route path="/get-started" element={<GetStarted />} />
          {/* Direct routes for login and register */}
          <Route path="/get-started/login" element={<Auth />} />
          <Route path="/get-started/register" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
