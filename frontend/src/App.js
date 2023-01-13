import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
