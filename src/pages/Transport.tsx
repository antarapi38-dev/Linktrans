import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Transport() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("Current Location");
  const [dropoff, setDropoff] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [-6.914744, 107.609810], // Bandung, Indonesia
        zoom: 15,
        zoomControl: false,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      // Force a resize calculation shortly after mounting to fix rendering issues
      setTimeout(() => {
        mapInstance.current?.invalidateSize();
      }, 100);
    }
    
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const handleContinue = () => {
    navigate('/checkout', { 
      state: { 
        type: 'Transport', 
        pickup, 
        dropoff, 
        distance: '4.5 KM' 
      } 
    });
  };

  return (
    <div className="h-[100dvh] bg-gray-50 flex flex-col relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-[1000] flex items-center pointer-events-none">
        <button onClick={() => navigate(-1)} className="bg-white p-2 rounded-full shadow-md pointer-events-auto">
          <ArrowLeft size={24} />
        </button>
      </div>
      
      {/* Map Area */}
      <div className="flex-1 bg-gray-300 relative">
        <div ref={mapRef} className="absolute inset-0 z-0" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none">
          <MapPin size={40} className="text-primary drop-shadow-lg" fill="currentColor" />
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-[1000]">
        <h2 className="text-xl font-bold mb-4">Where are you going?</h2>
        
        <div className="space-y-4 relative">
          <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-gray-200"></div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 flex justify-center z-10 bg-white">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <Input 
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Pickup location" 
              className="flex-1 bg-gray-100 border-none h-12"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 flex justify-center z-10 bg-white">
              <MapPin size={16} className="text-red-500" />
            </div>
            <Input 
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Dropoff destination" 
              className="flex-1 bg-gray-100 border-none h-12"
            />
          </div>
        </div>

        <Button 
          className="w-full mt-6 h-12 rounded-full text-lg" 
          onClick={handleContinue}
          disabled={!dropoff}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
