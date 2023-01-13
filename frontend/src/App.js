import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
