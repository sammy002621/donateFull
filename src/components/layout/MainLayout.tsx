
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Calendar, 
  Home, 
  Menu, 
  Users, 
  X, 
  DollarSign, 
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { name: "Dashboard", path: "/", icon: <Home className="w-5 h-5" /> },
  { name: "Donors", path: "/donors", icon: <Users className="w-5 h-5" /> },
  { name: "Donations", path: "/donations", icon: <DollarSign className="w-5 h-5" /> },
  { name: "Events", path: "/events", icon: <Calendar className="w-5 h-5" /> },
  { name: "Prediction", path: "/prediction", icon: <TrendingUp className="w-5 h-5" /> },
  { name: "Reports", path: "/reports", icon: <BarChart3 className="w-5 h-5" /> },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: "16rem" }}
        animate={{ width: sidebarOpen ? "16rem" : "4rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative h-screen glass-morphism border-r border-border z-10"
      >
        <div className="flex flex-col h-full">
          {/* Logo and toggle */}
          <div className="flex items-center justify-between p-4">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-semibold text-lg"
              >
                DonateFlux
              </motion.div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-secondary transition-colors"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-2 py-3 rounded-md transition-all duration-200 group",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-secondary"
                )}
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0">{item.icon}</span>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3 whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </div>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            {sidebarOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-muted-foreground"
              >
                &copy; 2023 DonateFlux
              </motion.div>
            ) : (
              <div className="h-6" /> // Spacer
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 max-w-7xl mx-auto w-full"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default MainLayout;
