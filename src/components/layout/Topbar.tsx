import { useState } from 'react';
import {
  Bell,
  Search,
  Globe,
  User,
  HelpCircle,
  LogOut,
  Settings as SettingsIcon,
  UserCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

const notifications = [
  {
    id: 1,
    title: 'Atualização de Projeto',
    description: 'Nova atualização de projeto em São Paulo.',
    time: '10 min atrás',
    type: 'update'
  },
  {
    id: 2,
    title: 'Não Conformidade',
    description: 'Não conformidade registrada no projeto #BR2023-56.',
    time: '30 min atrás',
    type: 'alert'
  },
  {
    id: 3,
    title: 'Prazo Próximo',
    description: 'Projeto Torre São Paulo vence em 3 dias.',
    time: '2 horas atrás',
    type: 'deadline'
  }
];

const Topbar = () => {
  const [currentLang, setCurrentLang] = useState('pt');

  return (
    <header className="h-16 bg-white flex items-center justify-between px-6 border-b shadow-sm">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            type="search"
            placeholder="Buscar projetos, clientes, instalações..."
            className="pl-10 w-full bg-gray-50 border-gray-200 h-10 rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-center space-x-1 md:space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 rounded-lg h-10">
              <Globe className="h-5 w-5 mr-1.5" />
              <span className="text-sm font-medium hidden md:block">{
                languages.find(l => l.code === currentLang)?.flag
              } {
                languages.find(l => l.code === currentLang)?.name
              }</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Selecione o Idioma</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                className={`${currentLang === lang.code ? "bg-blue-50 text-blue-600" : ""} cursor-pointer`}
                onClick={() => setCurrentLang(lang.code)}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100 rounded-lg h-10 w-10">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-gray-600 hover:bg-gray-100 rounded-lg h-10 w-10">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-[10px] text-white">
                {notifications.length}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
              <DropdownMenuLabel className="text-sm font-semibold">Notificações</DropdownMenuLabel>
              <Badge variant="outline" className="font-normal">
                {notifications.length} novas
              </Badge>
            </div>
            <div className="max-h-[340px] overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className="py-2 px-4 hover:bg-gray-50 cursor-pointer border-b">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                      notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                      notification.type === 'update' ? 'bg-blue-100 text-blue-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {notification.type === 'alert' && <AlertIcon className="h-4 w-4" />}
                      {notification.type === 'update' && <UpdateIcon className="h-4 w-4" />}
                      {notification.type === 'deadline' && <ClockIcon className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{notification.title}</div>
                      <p className="text-sm text-gray-600 mt-0.5">{notification.description}</p>
                      <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t">
              <Button variant="ghost" size="sm" className="w-full justify-center text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                Ver todas as notificações
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 rounded-lg h-10">
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarFallback className="bg-[#00529b] text-white text-xs font-medium">RM</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Roberto Mendes</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium">Roberto Mendes</p>
              <p className="text-xs text-gray-500">roberto.mendes@otis.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <UserCircle className="h-4 w-4 mr-2" /> Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <SettingsIcon className="h-4 w-4 mr-2" /> Preferências
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer">
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

// Ícones auxiliares
const AlertIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const UpdateIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default Topbar;