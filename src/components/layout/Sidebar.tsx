import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  ClipboardList,
  CheckSquare,
  BarChart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  User
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive = false,
  isCollapsed = false,
  onClick
}) => (
  <Button
    variant="ghost"
    className={cn(
      "flex items-center justify-start w-full gap-3 px-3 py-2 transition-all duration-200",
      isActive ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "hover:bg-gray-100",
      isCollapsed ? "justify-center px-2" : ""
    )}
    onClick={onClick}
  >
    <div className="flex-shrink-0 w-5 h-5">{icon}</div>
    {!isCollapsed && <span className="truncate">{label}</span>}
  </Button>
);

const OtisSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
const [activeItem, setActiveItem] = useState(location.pathname);


  const navItems = [
  {
    name: 'Dashboard',
    icon: <LayoutDashboard />,
    path: '/'
  },
  {
    name: 'Projetos',
    icon: <ClipboardList />,
    path: '/projects'
  },
  {
    name: 'Operações',
    icon: <CheckSquare />,
    path: '/operations'
  },
  {
    name: 'Qualidade',
    icon: <BarChart />,
    path: '/quality'
  },
  {
    name: 'Clientes',
    icon: <Users />,
    path: '/clients'
  },
  {
    name: 'Configurações',
    icon: <Settings />,
    path: '/settings'
  }
];




const handleNavigation = (path: string) => {
  setActiveItem(path);
  navigate(path); // redireciona de verdade
  if (isMobile) setMobileOpen(false); // fecha no mobile
};


  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Handle mobile menu visibility
  const sidebarClasses = cn(
    "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
    isCollapsed ? "w-[70px]" : "w-[250px]",
    isMobile && "fixed top-0 left-0 z-40",
    isMobile && !mobileOpen && "-translate-x-full"
  );

  // Mobile overlay backdrop when sidebar is open
  const renderOverlay = () => {
    if (isMobile && mobileOpen) {
      return (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      );
    }
    return null;
  };

  return (
    <>
      {renderOverlay()}

      {/* Mobile menu button - always visible on mobile */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-20"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className={sidebarClasses}>
        {/* Header with logo */}
        <div className={cn(
          "flex items-center h-16 px-4",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="bg-blue-600 text-white font-bold text-xl px-2 py-1 rounded">
                OTIS
              </div>
              <span className="ml-2 text-gray-800 font-semibold">Latam Tracker</span>
            </div>
          )}

          {isCollapsed && (
            <div className="bg-blue-600 text-white font-bold text-xl px-2 py-1 rounded">
              O
            </div>
          )}

          {/* Only show collapse button on desktop */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>

        <Separator />

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              icon={item.icon}
              label={item.name}
              isActive={activeItem === item.path}
              isCollapsed={isCollapsed}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default OtisSidebar;