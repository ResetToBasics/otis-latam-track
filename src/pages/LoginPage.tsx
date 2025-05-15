import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Lock, Mail, Globe, Info } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('pt-BR');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulação de autenticação
    try {
      // Em uma implementação real, aqui seria feita uma chamada à API de autenticação
      await new Promise(resolve => setTimeout(resolve, 1500));

      // ADICIONE ESTAS LINHAS - Armazenar os dados de autenticação no localStorage
      const authData = {
        user: email,
        name: email.split('@')[0],
        authenticated: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("otis-auth", JSON.stringify(authData));

      // Agora sim o redirecionamento vai funcionar porque o ProtectedRoute encontrará
      // os dados de autenticação no localStorage
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white font-bold text-3xl px-3 py-2 rounded">
              OTIS
            </div>
            <span className="ml-2 text-2xl font-bold">LATAM Tracker</span>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Acesse o sistema de gerenciamento centralizado da OTIS para América Latina
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@otis.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <a
                      href="/reset-password"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <Label htmlFor="remember" className="text-sm">Lembrar de mim</Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-otis-500 hover:bg-otis-600"
                disabled={isLoading}
              >
                {isLoading ? "Autenticando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Separator className="mb-4" />
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[140px] h-8">
                    <SelectValue placeholder="Idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                    <SelectItem value="en-US">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground text-xs"
                  onClick={() => window.open('/help', '_blank')}
                >
                  <Info className="h-3 w-3 mr-1" />
                  Ajuda
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>© 2025 OTIS Elevator Company. Todos os direitos reservados.</p>
          <p className="mt-1">v1.3.5</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;