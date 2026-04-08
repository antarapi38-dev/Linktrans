import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import QRScanner from "./pages/QRScanner";
import Orders from "./pages/Orders";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Transport from "./pages/Transport";
import Food from "./pages/Food";
import Send from "./pages/Send";
import Checkout from "./pages/Checkout";
import Ongoing from "./pages/Ongoing";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans max-w-md mx-auto shadow-xl relative overflow-hidden">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/qr" element={<QRScanner />} />
          <Route path="/ongoing" element={<Ongoing />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/food" element={<Food />} />
          <Route path="/send" element={<Send />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
