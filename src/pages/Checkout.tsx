import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || { 
    type: 'Service', 
    pickup: 'Unknown Location', 
    dropoff: 'Unknown Destination', 
    distance: '0 KM',
    itemDetails: null
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-4 py-4 shadow-sm flex items-center sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg">Checkout</h1>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4 border border-gray-100">
          <h2 className="font-bold text-lg mb-4 border-b pb-2">Order Details</h2>
          
          <div className="flex justify-between mb-3">
            <span className="text-gray-500">Service</span>
            <span className="font-medium">{state.type}</span>
          </div>
          
          {state.itemDetails && (
            <div className="flex justify-between mb-3">
              <span className="text-gray-500">Item</span>
              <span className="font-medium">{state.itemDetails}</span>
            </div>
          )}

          <div className="flex justify-between mb-4">
            <span className="text-gray-500">Distance</span>
            <span className="font-medium">{state.distance}</span>
          </div>

          <div className="space-y-4 relative bg-gray-50 p-4 rounded-xl">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-300"></div>
            
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 rounded-full bg-blue-500 mt-1 z-10 border-2 border-white"></div>
              <div>
                <p className="text-xs text-gray-500">Pickup</p>
                <p className="font-medium text-sm">{state.pickup}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin size={16} className="text-red-500 mt-1 z-10 bg-gray-50" />
              <div>
                <p className="text-xs text-gray-500">Dropoff</p>
                <p className="font-medium text-sm">{state.dropoff}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-4 border-b pb-2">Payment Summary</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Total Price</span>
            <span className="font-bold text-xl text-primary">Rp10.000</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <Button 
          className="w-full h-14 rounded-full text-lg flex items-center justify-center space-x-2" 
          onClick={() => navigate('/qr')}
        >
          <QrCode size={24} />
          <span>Pay with QR</span>
        </Button>
      </div>
    </div>
  );
}
