import { useNavigate } from "react-router-dom";
import { MapPin, Wallet, Route, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapImg from "../assets/map.png";

export default function Ongoing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm z-10 flex items-center justify-center relative">
        <h1 className="font-bold text-lg text-gray-900">Ongoing Trip</h1>
      </div>

      {/* Map Placeholder */}
      <div className="relative overflow-hidden flex items-center justify-center bg-gray-200 h-[55vh]">
        {/* Map Image */}
        <img 
          src={mapImg} 
          alt="Map Route" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Trip Details Sheet */}
      <div className="bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 pt-6 pb-8 z-20 -mt-6">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Trip Details</h2>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
            In Progress
          </span>
        </div>

        {/* Locations */}
        <div className="relative pl-8 space-y-6 mb-6">
          {/* Timeline Line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200"></div>
          
          {/* Pick-up */}
          <div className="relative">
            <div className="absolute -left-8 top-0.5 w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1">Pick-up Point</p>
            <p className="text-sm font-semibold text-gray-900">Stasiun MRT Bundaran HI</p>
          </div>

          {/* Drop-off */}
          <div className="relative">
            <div className="absolute -left-8 top-0.5 w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
              <MapPin size={12} className="text-red-500 fill-red-500" />
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1">Drop-off Point</p>
            <p className="text-sm font-semibold text-gray-900">Grand Indonesia Mall</p>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full mb-6"></div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-2xl flex items-center space-x-3">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <Route className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Distance</p>
              <p className="text-sm font-bold text-gray-900">2.4 km</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-2xl flex items-center space-x-3">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <Wallet className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Cost</p>
              <p className="text-sm font-bold text-gray-900">Rp 15.000</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl mb-8 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              PAY
            </div>
            <span className="text-sm font-semibold text-gray-900">TransPay</span>
          </div>
          <span className="text-sm font-medium text-gray-500">Auto-deduct</span>
        </div>

        {/* Finish Button */}
        <Button 
          onClick={() => navigate('/')}
          className="w-full h-14 rounded-full text-lg font-bold bg-[#F44336] hover:bg-red-600 shadow-lg shadow-red-500/30 flex items-center justify-center space-x-2"
        >
          <CheckCircle2 size={24} />
          <span>Finish Trip</span>
        </Button>
      </div>
    </div>
  );
}
