// src/pages/OfflineOperations.tsx

import React, { useEffect, useState } from 'react';
import { useOffline } from '@/contexts/OfflineContext';
import OfflineChecklist, { createNewOfflineChecklist } from '@/components/checklists/OfflineChecklist';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Download, Upload } from 'lucide-react';

const OfflineOperations = () => {
  const { isOnline, getOfflineData, syncPendingData, pendingActions } = useOffline();
  const [pendingChecklists, setPendingChecklists] = useState([]);

  // Carregar checklists pendentes
  useEffect(() => {
    const loadPendingChecklists = async () => {
      try {
        const checklists = await getOfflineData('pendingChecklists');
        setPendingChecklists(checklists);
      } catch (error) {
        console.error('Erro ao carregar checklists pendentes:', error);
      }
    };

    loadPendingChecklists();
  }, [getOfflineData, pendingActions]);

  // Exemplo de checklist pré-instalação
  const preInstallationItems = [
    { id: 1, task: "Verificação do local de instalação", complete: null },
    { id: 2, task: "Confirmação das dimensões do poço", complete: null },
    { id: 3, task: "Verificação da energia elétrica", complete: null },
    { id: 4, task: "Preparação da área de armazenamento", complete: null },
    { id: 5, task: "Levantamento de requisitos de segurança", complete: null },
    { id: 6, task: "Confirmação da entrega de materiais", complete: null },
  ];

  // Criar novo checklist
  const createNewChecklist = () => {
    return createNewOfflineChecklist(
      "BR-2023-001",
      "Pré-Instalação",
      preInstallationItems
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Operações Offline</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie instalações mesmo sem conexão com a internet
        </p>
      </div>

      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className={isOnline ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}
        >
          {isOnline ? (
            <><Wifi className="h-4 w-4 mr-1" /> Conectado</>
          ) : (
            <><WifiOff className="h-4 w-4 mr-1" /> Desconectado</>
          )}
        </Badge>

        {pendingActions > 0 && isOnline && (
          <Button onClick={syncPendingData}>
            <Upload className="h-4 w-4 mr-2" />
            Sincronizar {pendingActions} itens pendentes
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Checklists Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setPendingChecklists([...pendingChecklists, createNewChecklist()])}>
            <Download className="h-4 w-4 mr-2" />
            Baixar Novo Checklist para Trabalho Offline
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {pendingChecklists.map(checklist => (
          <OfflineChecklist
            key={checklist.id}
            initialChecklist={checklist}
          />
        ))}
      </div>
    </div>
  );
};

export default OfflineOperations;