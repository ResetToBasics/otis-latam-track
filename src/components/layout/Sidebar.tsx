
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  CheckSquare, 
  ClipboardList, 
  Home, 
  Settings, 
  Users
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { 
    name: 'Dashboard',
    icon: Home,
    path: '/' 
  },
  { 
    name: 'Projetos', 
    icon: ClipboardList, 
    path: '/projects' 
  },
  { 
    name: 'Operações', 
    icon: CheckSquare, 
    path: '/operations' 
  },
  { 
    name: 'Qualidade', 
    icon: BarChart,
    path: '/quality' 
  },
  { 
    name: 'Clientes', 
    icon: Users, 
    path: '/customers' 
  },
  { 
    name: 'Configurações', 
    icon: Settings, 
    path: '/settings' 
  }
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "h-screen flex-shrink-0 overflow-y-auto bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[230px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-sidebar-border flex items-center justify-center">
          {!collapsed ? (
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-bold text-otis-500">OTIS</h1>
              <p className="text-xs text-sidebar-foreground/70">LATAM TRACKER</p>
            </div>
          ) : (
            <div className="h-8 w-8 bg-otis-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
          )}
        </div>
        
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md transition-colors",
                        location.pathname === item.path 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                        collapsed && "justify-center"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      {item.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mx-auto mb-4 p-1.5 rounded-full hover:bg-sidebar-accent/50 text-sidebar-foreground/70"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
