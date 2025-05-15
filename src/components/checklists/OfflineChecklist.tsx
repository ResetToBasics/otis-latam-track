// src/components/checklists/OfflineChecklist.tsx

import React, { useState, useEffect } from 'react';
import { useOffline } from '@/contexts/OfflineContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

type ChecklistItem = {
  id: number;
  task: string;
  complete: boolean | null;
  comments: string;
};

type Checklist = {
  id: string;
  projectId: string;
  type: string;
  items: ChecklistItem[];
  completed: boolean;
  synced: boolean;
};

interface OfflineChecklistProps {
  initialChecklist: Checklist;
  onSave?: (checklist: Checklist) => void;
}

const OfflineChecklist: React.FC<OfflineChecklistProps> = ({ initialChecklist, onSave }) => {
  const [checklist, setChecklist] = useState<Checklist>(initialChecklist);
  const { isOnline, saveOfflineData, syncPendingData } = useOffline();

  // Marcar um item como completo/incompleto
  const toggleItem = (itemId: number, value: boolean | null) => {
    setChecklist(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, complete: value } : item
      )
    }));
  };

  // Adicionar comentário a um item
  const addComment = (itemId: number, comment: string) => {
    setChecklist(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, comments: comment } : item
      )
    }));
  };

  // Verificar se todos os itens estão completos
  const isChecklistComplete = () => {
    return checklist.items.every(item => item.complete !== null);
  };

  // Salvar checklist (online ou offline)
  const handleSave = async () => {
    const updatedChecklist = {
      ...checklist,
      completed: isChecklistComplete(),
      synced: isOnline
    };

    setChecklist(updatedChecklist);

    if (isOnline) {
      // Se estiver online, envie diretamente para o servidor
      if (onSave) {
        onSave(updatedChecklist);
      }
    } else {
      // Se estiver offline, salve localmente para sincronização posterior
      try {
        await saveOfflineData('pendingChecklists', updatedChecklist);
        // Mostrar notificação de sucesso no salvamento offline
      } catch (error) {
        console.error('Erro ao salvar offline:', error);
        // Mostrar notificação de erro
      }
    }
  };

  // Tentar sincronizar dados pendentes quando voltar online
  useEffect(() => {
    if (isOnline && !checklist.synced) {
      syncPendingData();
    }
  }, [isOnline]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Checklist: {checklist.type}</CardTitle>
            <CardDescription>Projeto: {checklist.projectId}</CardDescription>
          </div>
          <Badge
            variant="outline"
            className={isOnline ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}
          >
            {isOnline ? (
              <><Wifi className="h-3 w-3 mr-1" /> Online</>
            ) : (
              <><WifiOff className="h-3 w-3 mr-1" /> Offline</>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            {checklist.items.map(item => (
              <div
                key={item.id}
                className={`flex items-start p-3 border rounded-md ${
                  item.complete === true ? 'bg-green-50 border-green-200' :
                  item.complete === false ? 'bg-red-50 border-red-200' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium">{item.task}</div>
                  {item.comments && (
                    <div className="text-sm text-muted-foreground mt-1">{item.comments}</div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={item.complete === true ? "bg-green-100 text-green-800 border-green-200" : ""}
                    onClick={() => toggleItem(item.id, true)}
                  >
                    <CheckSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={item.complete === false ? "bg-red-100 text-red-800 border-red-200" : ""}
                    onClick={() => toggleItem(item.id, false)}
                  >
                    <AlertCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {!checklist.synced && "Será sincronizado quando houver conexão"}
        </div>
        <Button onClick={handleSave}>
          Salvar Checklist
        </Button>
      </CardFooter>
    </Card>
  );
};

// Para criar um novo checklist offline
export const createNewOfflineChecklist = (projectId: string, type: string, items: Omit<ChecklistItem, 'comments'>[]) => {
  return {
    id: uuidv4(), // Gerar ID único
    projectId,
    type,
    items: items.map(item => ({ ...item, comments: '' })),
    completed: false,
    synced: false
  };
};

export default OfflineChecklist;