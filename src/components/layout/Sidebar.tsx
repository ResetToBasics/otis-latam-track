import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart,
  CheckSquare,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
  Building,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
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
    path: '/clients'
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
        "h-screen flex-shrink-0 overflow-y-auto border-r transition-all duration-300",
        "bg-[#00529b] text-white",
        collapsed ? "w-[70px]" : "w-[260px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-white/10 flex items-center justify-center">
          {!collapsed ? (
            <div className="flex items-center">
              <div className="bg-white rounded-md h-10 w-10 flex items-center justify-center mr-3">
                <img
                  src="/otis-logo.png"
                  alt="OTIS Logo"
                  className="h-6 w-auto"
                  // Fallback se não tiver a imagem
                  onError={(e) => {
                    e.currentTarget.src = '';
                    e.currentTarget.parentElement.innerHTML = '<span class="text-[#00529b] font-bold text-lg">O</span>';
                  }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">OTIS</h1>
                <p className="text-xs text-white/70 font-medium">LATAM TRACKER</p>
              </div>
            </div>
          ) : (
            <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center">
              <span className="text-[#00529b] font-bold text-lg">O</span>
            </div>
          )}
        </div>

        <div className="px-3 py-6">
          <div className="mb-4 px-3">
            <h2 className={cn(
              "text-xs font-semibold text-white/50 uppercase tracking-wider",
              collapsed && "hidden"
            )}>
              Menu Principal
            </h2>
          </div>

          <nav>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center px-3 py-2.5 rounded-lg transition-colors",
                          location.pathname === item.path ||
                          (item.path !== '/' && location.pathname.startsWith(item.path))
                            ? "bg-white/10 text-white font-medium"
                            : "text-white/70 hover:bg-white/10 hover:text-white",
                          collapsed ? "justify-center" : "justify-start",
                          "h-11"
                        )}
                      >
                        <item.icon className={cn("flex-shrink-0",
                          collapsed ? "h-6 w-6" : "h-5 w-5"
                        )} />

                        {!collapsed && (
                          <span className="ml-3 text-sm font-medium">{item.name}</span>
                        )}

                        {!collapsed && location.pathname === item.path && (
                          <div className="ml-auto h-2 w-2 rounded-full bg-white"></div>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="bg-gray-800 text-white border-gray-700">
                        {item.name}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-3">
          <div className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg",
            collapsed ? "justify-center" : "justify-start",
            "text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          )}>
            <Building className="h-5 w-5" />
            {!collapsed && (
              <div className="text-sm">
                <div className="font-medium">OTIS LATAM</div>
                <div className="text-xs text-white/50">Elevator Company</div>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "mt-3 w-full rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors",
              "flex items-center justify-center gap-2",
              collapsed ? "mx-auto" : ""
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Recolher menu</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;