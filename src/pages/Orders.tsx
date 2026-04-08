import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

export default function Orders() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 py-4 shadow-sm flex items-center sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg">My Orders</h1>
      </div>
      
      <div className="p-4 flex flex-col items-center justify-center mt-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🧾</span>
        </div>
        <h2 className="text-xl font-bold mb-2">No active orders</h2>
        <p className="text-gray-500">When you order a ride or food, it will appear here.</p>
      </div>
      
      <BottomNav />
    </div>
  );
}
