import { ArrowLeft, User, Settings, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 py-4 shadow-sm flex items-center sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg">My Profile</h1>
      </div>
      
      <div className="bg-white p-6 mt-2 flex items-center space-x-4 shadow-sm">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-gray-500">+62 812 3456 7890</p>
        </div>
      </div>

      <div className="mt-4 bg-white shadow-sm">
        <div className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50">
          <User className="text-gray-500 mr-4" size={24} />
          <span className="font-medium flex-1">Account Details</span>
        </div>
        <div className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50">
          <Settings className="text-gray-500 mr-4" size={24} />
          <span className="font-medium flex-1">Settings</span>
        </div>
        <div className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50">
          <HelpCircle className="text-gray-500 mr-4" size={24} />
          <span className="font-medium flex-1">Help Center</span>
        </div>
        <div 
          className="flex items-center p-4 cursor-pointer hover:bg-gray-50 text-red-500"
          onClick={() => navigate('/login')}
        >
          <LogOut className="mr-4" size={24} />
          <span className="font-medium flex-1">Log Out</span>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
