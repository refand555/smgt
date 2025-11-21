// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";
import Register from "./pages/Register";
import SearchPage from "./pages/search";
import DashboardPage from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<SearchPage />} />
     <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );  
}

export default App;
