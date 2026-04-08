import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import lawsonImg from "../assets/lawson.png";

export default function Food() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/checkout', { 
      state: { 
        type: 'Food & Mart', 
        pickup: 'Selected Store / Restaurant', 
        dropoff: 'Home', 
        distance: '2.1 KM' 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-bold text-lg flex-1">Food & Mart</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input className="pl-10 bg-gray-100 border-none rounded-full h-11" placeholder="What are you craving?" />
        </div>
      </div>

      <div className="p-4">
        <h2 className="font-bold text-lg mb-3">Convenience Stores</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          <div onClick={handleContinue} className="cursor-pointer min-w-[100px] h-20 bg-white p-3 rounded-xl shadow-sm flex flex-col items-center justify-center border border-gray-100 hover:border-red-200 transition-colors">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Alfamart_logo.svg" alt="Alfamart" className="h-8 object-contain" />
          </div>
          <div onClick={handleContinue} className="cursor-pointer min-w-[100px] h-20 bg-white p-3 rounded-xl shadow-sm flex flex-col items-center justify-center border border-gray-100 hover:border-red-200 transition-colors">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Indomaret.png" alt="Indomaret" className="h-8 object-contain" />
          </div>
          <div onClick={handleContinue} className="cursor-pointer min-w-[100px] h-20 bg-white p-3 rounded-xl shadow-sm flex flex-col items-center justify-center border border-gray-100 hover:border-red-200 transition-colors">
            <img src={lawsonImg} alt="Lawson" className="h-8 object-contain" />
          </div>
        </div>

        <h2 className="font-bold text-lg mt-6 mb-3">Popular Food</h2>
        <div className="space-y-4">
          {[
            { name: "Ayam Geprek Bensu", type: "Indonesian, Spicy", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop" },
            { name: "Sate Khas Senayan", type: "Indonesian, Satay", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=200&auto=format&fit=crop" },
            { name: "Martabak Pecenongan", type: "Snack, Sweet", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop" }
          ].map((food, i) => (
            <div key={i} onClick={handleContinue} className="cursor-pointer bg-white rounded-xl shadow-sm overflow-hidden flex border border-gray-100 hover:border-red-200 transition-colors">
              <img src={food.img} alt={food.name} className="w-24 h-24 object-cover" />
              <div className="p-3 flex-1">
                <h3 className="font-bold text-sm">{food.name}</h3>
                <p className="text-xs text-gray-500 mb-1">{food.type}</p>
                <div className="flex items-center text-xs font-medium">
                  <Star size={12} className="text-yellow-400 mr-1 fill-current" /> 4.8
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-20 max-w-md mx-auto">
        <Button className="w-full h-12 rounded-full text-lg" onClick={handleContinue}>
          Continue to Checkout
        </Button>
      </div>
    </div>
  );
}
