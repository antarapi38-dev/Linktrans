import { useNavigate } from "react-router-dom";
import { Search, Wallet, QrCode, Plus, ArrowUpRight, Bike, Car, Utensils, Package, ShoppingBag, Shield, MoreHorizontal, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNav from "@/components/BottomNav";
import { logoBase64 } from "../assets/images";

export default function Home() {
  const navigate = useNavigate();

  const services = [
    { icon: Bike, label: "Ride", color: "bg-green-500", path: "/transport" },
    { icon: Car, label: "Car", color: "bg-green-500", path: "/transport" },
    { icon: Utensils, label: "Food", color: "bg-red-500", path: "/food" },
    { icon: Package, label: "Send", color: "bg-green-500", path: "/send" },
    { icon: ShoppingBag, label: "Mart", color: "bg-red-500", path: "/food" },
    { icon: Shield, label: "Protect", color: "bg-blue-500", path: "#" },
    { icon: MapPin, label: "Transit", color: "bg-blue-500", path: "#" },
    { icon: MoreHorizontal, label: "More", color: "bg-gray-200 text-gray-600", iconColor: "text-gray-600", path: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#F44336] px-4 pt-12 pb-6 rounded-b-3xl shadow-sm text-white">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img 
            src={logoBase64} 
            alt="Translink Logo" 
            className="h-20 object-contain"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-white/80 font-medium">Good morning,</p>
              <p className="font-semibold">John Doe</p>
            </div>
          </div>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <Search size={20} className="text-white" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-2">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <Input 
            className="w-full pl-10 bg-white text-gray-900 border-none h-12 rounded-full shadow-inner" 
            placeholder="Find services, food, or places" 
          />
        </div>
      </div>

      {/* Wallet Card */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-xl">
              <Wallet className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">TransPay Balance</p>
              <p className="font-bold text-lg">Rp 125.000</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex flex-col items-center justify-center space-y-1 w-14">
              <div className="bg-gray-100 p-2 rounded-full text-[#F44336]">
                <ArrowUpRight size={20} />
              </div>
              <span className="text-[10px] font-medium text-gray-600">Pay</span>
            </button>
            <button className="flex flex-col items-center justify-center space-y-1 w-14">
              <div className="bg-gray-100 p-2 rounded-full text-[#F44336]">
                <Plus size={20} />
              </div>
              <span className="text-[10px] font-medium text-gray-600">Top Up</span>
            </button>
            <button 
              onClick={() => navigate('/qr')}
              className="flex flex-col items-center justify-center space-y-1 w-14"
            >
              <div className="bg-[#F44336] p-2 rounded-full text-white shadow-md shadow-red-500/30">
                <QrCode size={20} />
              </div>
              <span className="text-[10px] font-medium text-gray-600">Scan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center space-y-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => service.path !== "#" && navigate(service.path)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.color} shadow-sm`}>
                  <Icon size={28} className={service.iconColor || "text-white"} strokeWidth={1.5} />
                </div>
                <span className="text-xs font-medium text-gray-700">{service.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4 mt-8">
        <h2 className="font-bold text-lg mb-3">Special for you</h2>
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 w-2/3">
            <h3 className="font-bold text-xl mb-1">50% OFF Food!</h3>
            <p className="text-sm opacity-90 mb-3">Order your favorite meals now with massive discounts.</p>
            <button className="bg-white text-red-500 text-xs font-bold px-4 py-2 rounded-full">
              Order Now
            </button>
          </div>
          <Utensils className="absolute -right-4 -bottom-4 text-white/20" size={120} />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
