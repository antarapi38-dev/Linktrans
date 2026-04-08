import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, Receipt, MessageSquare, User } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: Receipt, label: "Orders", path: "/orders" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe max-w-md mx-auto z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = path === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
