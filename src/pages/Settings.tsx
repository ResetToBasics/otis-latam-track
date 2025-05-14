import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Shield,
  Globe,
  Bell,
  UserCog,
  Settings as SettingsIcon,
  Lock,
  Building,
  Database,
  HardDrive,
  RefreshCw,
  Server,
  Laptop,
  UserPlus,
  Trash,
  User,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data para usuários do sistema
const users = [
  {
    id: "USR001",
    name: "Roberto Mendes",
    email: "roberto.mendes@otis.com",
    role: "Administrador",
    country: "Brasil",
    department: "TI",
    lastLogin: "10/04/2023 14:30",
    status: "active",
    avatar: "RM"
  },
  {
    id: "USR002",
    name: "Carolina Silva",
    email: "carolina.silva@otis.com",
    role: "Gerente",
    country: "Brasil",
    department: "Operações",
    lastLogin: "10/04/2023 10:15",
    status: "active",
    avatar: "CS"
  },
  {
    id: "USR003",
    name: "Miguel Hernandez",
    email: "miguel.hernandez@otis.com",
    role: "Supervisor",
    country: "México",
    department: "Instalação",
    lastLogin: "09/04/2023 16:45",
    status: "active",
    avatar: "MH"
  },
  {
    id: "USR004",
    name: "Laura Gomez",
    email: "laura.gomez@otis.com",
    role: "Analista",
    country: "Colômbia",
    department: "Vendas",
    lastLogin: "08/04/2023 11:20",
    status: "inactive",
    avatar: "LG"
  },
  {
    id: "USR005",
    name: "Carlos Rodriguez",
    email: "carlos.rodriguez@otis.com",
    role: "Técnico",
    country: "Chile",
    department: "Suporte",
    lastLogin: "10/04/2023 09:05",
    status: "active",
    avatar: "CR"
  }
];

// Logs de atividade do sistema (mock)
const activityLogs = [
  {
    id: "LOG001",
    user: "Roberto Mendes",
    action: "Criou novo projeto",
    resource: "BR-2023-045",
    timestamp: "10/04/2023 15:42:30",
    ip: "192.168.1.45",
    status: "success"
  },
  {
    id: "LOG002",
    user: "Carolina Silva",
    action: "Atualizou status de instalação",
    resource: "INST-BR-023",
    timestamp: "10/04/2023 14:30:15",
    ip: "192.168.1.62",
    status: "success"
  },
  {
    id: "LOG003",
    user: "Sistema",
    action: "Backup automático",
    resource: "Database",
    timestamp: "10/04/2023 01:00:00",
    ip: "127.0.0.1",
    status: "success"
  },
  {
    id: "LOG004",
    user: "Miguel Hernandez",
    action: "Tentativa de acesso não autorizado",
    resource: "Configurações de Segurança",
    timestamp: "09/04/2023 16:50:22",
    ip: "192.168.1.78",
    status: "failed"
  },
  {
    id: "LOG005",
    user: "Laura Gomez",
    action: "Login no sistema",
    resource: "Portal OTIS LATAM",
    timestamp: "08/04/2023 11:20:05",
    ip: "192.168.1.90",
    status: "success"
  }
];

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState("personal");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie configurações do sistema e preferências de usuário
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                <h3 className="font-medium text-sm text-muted-foreground mb-3">CONFIGURAÇÕES DE USUÁRIO</h3>
                <Button
                  variant={selectedTab === "personal" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTab("personal")}
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  Perfil Pessoal
                </Button>
                <Button
                  variant={selectedTab === "notifications" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTab("notifications")}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </Button>
                <Button
                  variant={selectedTab === "language" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTab("language")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Idioma e Região
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-1">
                <h3 className="font-medium text-sm text-muted-foreground mb-3">CONFIGURAÇÕES DO SISTEMA</h3>
                <Button
                  variant={selectedTab === "users" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTab("users")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Usuários e Acessos
                </Button>
                <Button
                  variant={selectedTab === "company" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTab("company")}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Dados da Empresa
                </Button>
                <Button
                  variant={selectedTab === "security" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTab("security")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Segurança
                </Button>
                <Button
                  variant={selectedTab === "logs" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTab("logs")}
                >
                  <Server className="h-4 w-4 mr-2" />
                  Logs e Atividades
                </Button>
                <Button
                  variant={selectedTab === "system" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTab("system")}
                >
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Sistema e Manutenção
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-9">
          {selectedTab === "personal" && (
            <Card>
              <CardHeader>
                <CardTitle>Perfil Pessoal</CardTitle>
                <CardDescription>
                  Gerencie suas informações pessoais e preferências de conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center space-y-3">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src="/placeholder-avatar.png" />
                      <AvatarFallback className="text-2xl">RM</AvatarFallback>
                    </Avatar>
                    <Button className="w-full">Alterar Foto</Button>
                  </div>

                  <div className="md:w-3/4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" value="Roberto Mendes" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" value="roberto.mendes@otis.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Cargo</Label>
                        <Input id="role" value="Administrador" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Departamento</Label>
                        <Input id="department" value="TI" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" value="+55 11 3456-7890" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">País</Label>
                        <Select defaultValue="brasil">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um país" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brasil">Brasil</SelectItem>
                            <SelectItem value="mexico">México</SelectItem>
                            <SelectItem value="colombia">Colômbia</SelectItem>
                            <SelectItem value="chile">Chile</SelectItem>
                            <SelectItem value="argentina">Argentina</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Alterar Senha</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-otis-500 hover:bg-otis-600">Salvar Alterações</Button>
              </CardFooter>
            </Card>
          )}

          {selectedTab === "users" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Usuários e Acessos</CardTitle>
                  <CardDescription>
                    Gerencie usuários e permissões do sistema
                  </CardDescription>
                </div>
                <Button className="bg-otis-500 hover:bg-otis-600">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Novo Usuário
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Usuário</th>
                          <th className="h-10 px-4 text-left font-medium">Função</th>
                          <th className="h-10 px-4 text-left font-medium">Departamento</th>
                          <th className="h-10 px-4 text-left font-medium">País</th>
                          <th className="h-10 px-4 text-left font-medium">Status</th>
                          <th className="h-10 px-4 text-left font-medium">Último Acesso</th>
                          <th className="h-10 px-4 text-right font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{user.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-muted-foreground">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{user.role}</td>
                            <td className="p-4">{user.department}</td>
                            <td className="p-4">{user.country}</td>
                            <td className="p-4">
                              <Badge
                                variant="outline"
                                className={user.status === 'active'
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-red-100 text-red-800 border-red-200"}
                              >
                                {user.status === 'active' ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </td>
                            <td className="p-4">{user.lastLogin}</td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">Editar</Button>
                                <Button variant="ghost" size="sm" className="text-red-500">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedTab === "logs" && (
            <Card>
              <CardHeader>
                <CardTitle>Logs e Atividades</CardTitle>
                <CardDescription>
                  Registro de atividades e eventos do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    type="search"
                    placeholder="Buscar nos logs..."
                    className="max-w-sm"
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo de Ação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Ações</SelectItem>
                      <SelectItem value="create">Criação</SelectItem>
                      <SelectItem value="update">Atualização</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="success">Sucesso</SelectItem>
                      <SelectItem value="failed">Falha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Timestamp</th>
                          <th className="h-10 px-4 text-left font-medium">Usuário</th>
                          <th className="h-10 px-4 text-left font-medium">Ação</th>
                          <th className="h-10 px-4 text-left font-medium">Recurso</th>
                          <th className="h-10 px-4 text-left font-medium">IP</th>
                          <th className="h-10 px-4 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activityLogs.map((log) => (
                          <tr key={log.id} className="border-b">
                            <td className="p-4">{log.timestamp}</td>
                            <td className="p-4">{log.user}</td>
                            <td className="p-4">{log.action}</td>
                            <td className="p-4">{log.resource}</td>
                            <td className="p-4">{log.ip}</td>
                            <td className="p-4">
                              <div className="flex items-center">
                                {log.status === "success" ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                    <span className="text-green-600">Sucesso</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                                    <span className="text-red-600">Falha</span>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Mostrando 5 de 254 registros
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Anterior</Button>
                    <Button variant="outline" size="sm">Próximo</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedTab === "system" && (
            <Card>
              <CardHeader>
                <CardTitle>Sistema e Manutenção</CardTitle>
                <CardDescription>
                  Configurações e manutenção do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Informações do Sistema</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Laptop className="h-6 w-6 text-blue-700" />
                        </div>
                        <div>
                          <div className="font-medium">Versão do Sistema</div>
                          <div className="text-muted-foreground">OTIS LATAM Tracker v1.3.5</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-green-100 rounded-full">
                          <RefreshCw className="h-6 w-6 text-green-700" />
                        </div>
                        <div>
                          <div className="font-medium">Última Atualização</div>
                          <div className="text-muted-foreground">05/04/2023 - 01:30</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <Database className="h-6 w-6 text-purple-700" />
                        </div>
                        <div>
                          <div className="font-medium">Banco de Dados</div>
                          <div className="text-muted-foreground">Conectado - Performance: Ótima</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-yellow-100 rounded-full">
                          <HardDrive className="h-6 w-6 text-yellow-700" />
                        </div>
                        <div>
                          <div className="font-medium">Armazenamento</div>
                          <div className="text-muted-foreground">458.2 GB / 1 TB (45.8% utilizado)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Backup e Restauração</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Backup Automático</h4>
                          <p className="text-muted-foreground text-sm mt-1">
                            O sistema realiza backup automático diariamente às 01:00
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Button className="w-full">
                          Realizar Backup Manual
                        </Button>
                      </div>
                      <div>
                        <Button variant="outline" className="w-full">
                          Restaurar Backup
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Últimos Backups</h4>
                      <div className="border rounded-md divide-y">
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <div className="font-medium">Backup Diário</div>
                            <div className="text-sm text-muted-foreground">10/04/2023 - 01:00</div>
                          </div>
                          <Button variant="ghost" size="sm">Restaurar</Button>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <div className="font-medium">Backup Diário</div>
                            <div className="text-sm text-muted-foreground">09/04/2023 - 01:00</div>
                          </div>
                          <Button variant="ghost" size="sm">Restaurar</Button>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <div className="font-medium">Backup Manual</div>
                            <div className="text-sm text-muted-foreground">08/04/2023 - 15:42</div>
                          </div>
                          <Button variant="ghost" size="sm">Restaurar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Manutenção do Sistema</h3>
                  <div className="space-y-3">
                    <Button className="w-full">
                      Limpar Cache do Sistema
                    </Button>
                    <Button variant="outline" className="w-full">
                      Verificar Atualizações
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Reiniciar Servidor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;