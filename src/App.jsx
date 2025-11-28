import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchPage from "./pages/search";
import DashboardPage from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";
import AdminPage from "./pages/Admin"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin" element={<AdminRoute> <AdminPage /> </AdminRoute>}/>
      <Route path="/dashboard" element={<ProtectedRoute> <DashboardPage /> </ProtectedRoute>}/>
      <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>}/>
      <Route path="/register" element={<PublicRoute> <Register /> </PublicRoute>}/>
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );  
}

export default App;
