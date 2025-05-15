// src/services/api.js
import axios from 'axios';

// Crie uma instância do axios com a URL base da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
});

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('otis-token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Mock de dados para desenvolvimento (removeria em produção)
const useMockData = process.env.NODE_ENV === 'development' && !process.env.REACT_APP_USE_REAL_API;

if (useMockData) {
  // Intercepta todas as requisições para simular respostas
  api.interceptors.request.use(
    async (config) => {
      // Extrair o caminho da URL e o método da requisição
      const path = config.url.replace(/^\/api/, '');
      const method = config.method.toLowerCase();
      
      // Verificar se existe uma função de mock para este caminho e método
      const mockHandler = mockHandlers[path]?.[method] || mockHandlers[`${path}/*`]?.[method];
      
      if (mockHandler) {
        // Simular um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Lançar uma resposta mockada
        return Promise.reject({
          config,
          response: {
            status: 200,
            data: await mockHandler(config),
          },
          isAxiosError: true,
          toJSON: () => ({}),
        });
      }
      
      return config;
    },
    error => Promise.reject(error)
  );
  
  // Intercepta as respostas para capturar as rejeições causadas pelos mocks
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 200) {
        return Promise.resolve({ data: error.response.data });
      }
      return Promise.reject(error);
    }
  );
}

// Mock handlers - Simulação de endpoint para desenvolvimento
const mockHandlers = {
  '/projects/:id': {
    get: async (config) => {
      const projectId = config.url.split('/').pop();
      // Retornar dados de projeto simulados
      return {
        id: projectId,
        name: 'Torre Corporativa São Paulo',
        client: 'Grupo Empresarial Brasileiro',
        location: 'São Paulo, Brasil',
        status: 'on-track',
        progress: 65,
        currentPhase: 'installation',
        phaseProgress: 40,
        startDate: '2023-05-15',
        endDate: '2023-09-20',
        manager: 'Carolina Silva',
        scheduleVariance: 2,
        costVariance: -1.5,
        qualityIndex: 92,
        safetyIncidents: 0,
        timeline: [
          {
            date: '2023-01-10',
            title: 'Contrato Assinado',
            description: 'Assinatura formal do contrato com o cliente',
            status: 'completed'
          },
          {
            date: '2023-02-15',
            title: 'Visita Técnica',
            description: 'Primeira visita técnica para verificação de medidas',
            status: 'completed'
          },
          {
            date: '2023-05-15',
            title: 'Início da Instalação',
            description: 'Começo do processo de instalação',
            status: 'completed'
          },
          {
            date: '2023-07-25',
            title: 'Instalação de Cabos',
            description: 'Próxima etapa prevista',
            status: 'current'
          }
        ],
        documents: [
          {
            id: 'DOC-001',
            name: 'Contrato de Instalação',
            type: 'contract',
            size: '2.4 MB',
            uploadDate: '2023-01-05',
            url: '#'
          },
          {
            id: 'DOC-002',
            name: 'Especificações Técnicas',
            type: 'technical',
            size: '5.7 MB',
            uploadDate: '2023-01-07',
            url: '#'
          },
          {
            id: 'DOC-003',
            name: 'Plantas do Edifício',
            type: 'blueprint',
            size: '12.1 MB',
            uploadDate: '2023-01-15',
            url: '#'
          }
        ],
        risks: [
          {
            id: 'RISK-001',
            title: 'Atraso na entrega de componentes',
            level: 'medium',
            impact: 'Pode atrasar cronograma em até 2 semanas',
            mitigation: 'Pedido antecipado e acompanhamento semanal com fornecedor',
            status: 'monitoring'
          },
          {
            id: 'RISK-002',
            title: 'Condições climáticas adversas',
            level: 'low',
            impact: 'Pode impedir trabalho externo em até 5 dias',
            mitigation: 'Plano alternativo para trabalhos internos durante chuvas',
            status: 'mitigated'
          }
        ],
        qualityChecks: [
          {
            id: 'QC-001',
            title: 'Verificação de Nivelamento',
            status: 'passed',
            date: '2023-06-10',
            inspector: 'Ricardo Mendes',
            notes: 'Dentro dos parâmetros aceitáveis'
          },
          {
            id: 'QC-002',
            title: 'Teste de Segurança Elétrica',
            status: 'scheduled',
            date: '2023-08-05',
            inspector: 'Mariana Costa',
            notes: 'Aguardando conclusão de instalação elétrica'
          }
        ],
        team: [
          {
            id: 'TEAM-001',
            name: 'Equipe A - Estrutural',
            lead: 'José Santos',
            members: 5,
            specialization: 'structural',
            assignedPhases: ['preparation', 'installation']
          },
          {
            id: 'TEAM-002',
            name: 'Equipe B - Elétrica',
            lead: 'Ana Oliveira',
            members: 3,
            specialization: 'electrical',
            assignedPhases: ['installation', 'commissioning']
          }
        ]
      };
    }
  },
  '/projects': {
    get: async (config) => {
      // Simular uma lista de projetos
      return {
        total: 24,
        page: 1,
        perPage: 10,
        projects: [
          {
            id: 'PROJ-001',
            name: 'Torre Corporativa São Paulo',
            client: 'Grupo Empresarial Brasileiro',
            location: 'São Paulo, Brasil',
            status: 'on-track',
            progress: 65,
            startDate: '2023-05-15',
            endDate: '2023-09-20'
          },
          {
            id: 'PROJ-002',
            name: 'Hospital Central Bogotá',
            client: 'Saúde Colombiana S.A.',
            location: 'Bogotá, Colômbia',
            status: 'delayed',
            progress: 42,
            startDate: '2023-04-10',
            endDate: '2023-08-20'
          },
          {
            id: 'PROJ-003',
            name: 'Residencial Puerto Madero',
            client: 'Constructora Argentina',
            location: 'Buenos Aires, Argentina',
            status: 'on-track',
            progress: 78,
            startDate: '2023-03-05',
            endDate: '2023-06-30'
          },
          {
            id: 'PROJ-004',
            name: 'Shopping Center Santiago',
            client: 'Inversiones Chilenas',
            location: 'Santiago, Chile',
            status: 'ahead',
            progress: 92,
            startDate: '2023-02-15',
            endDate: '2023-06-10'
          },
          {
            id: 'PROJ-005',
            name: 'Centro Empresarial Lima',
            client: 'Corporación Peruana',
            location: 'Lima, Peru',
            status: 'on-track',
            progress: 55,
            startDate: '2023-04-20',
            endDate: '2023-08-15'
          }
        ]
      };
    },
    post: async (config) => {
      const newProject = JSON.parse(config.data);
      return {
        id: 'PROJ-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        ...newProject,
        createdAt: new Date().toISOString()
      };
    }
  },
  '/quality-checks': {
    get: async () => {
      return {
        total: 48,
        page: 1,
        perPage: 10,
        checks: [
          {
            id: 'QC-001',
            projectId: 'PROJ-001',
            projectName: 'Torre Corporativa São Paulo',
            title: 'Verificação de Nivelamento',
            status: 'passed',
            date: '2023-06-10',
            inspector: 'Ricardo Mendes'
          },
          {
            id: 'QC-002',
            projectId: 'PROJ-002',
            projectName: 'Hospital Central Bogotá',
            title: 'Teste de Segurança Elétrica',
            status: 'failed',
            date: '2023-05-22',
            inspector: 'Mariana Costa'
          },
          {
            id: 'QC-003',
            projectId: 'PROJ-003',
            projectName: 'Residencial Puerto Madero',
            title: 'Inspeção de Cabos',
            status: 'passed',
            date: '2023-06-05',
            inspector: 'Carlos Gutierrez'
          }
        ]
      };
    }
  },
  '/users/me': {
    get: async () => {
      return {
        id: 'USER-001',
        name: 'João Silva',
        email: 'joao.silva@otis.com',
        role: 'project_manager',
        country: 'Brasil',
        region: 'Sudeste',
        permissions: ['read:projects', 'write:projects', 'read:reports', 'manage:teams'],
        preferences: {
          language: 'pt-BR',
          notifications: {
            email: true,
            push: true,
            sms: false
          },
          dashboard: {
            defaultView: 'active-projects',
            widgets: ['projects-status', 'team-allocation', 'quality-metrics']
          }
        }
      };
    }
  },
  '/dashboards/executive': {
    get: async () => {
      return {
        kpis: {
          onTimeDelivery: {
            value: 82,
            trend: '+5%',
            target: 85
          },
          costVariance: {
            value: -1.2,
            trend: '+0.8%',
            target: 0
          },
          qualityIndex: {
            value: 91,
            trend: '+2%',
            target: 90
          },
          safetyIncidents: {
            value: 2,
            trend: '-50%',
            target: 0
          },
          customerSatisfaction: {
            value: 88,
            trend: '+3%',
            target: 90
          }
        },
        projectsByStatus: {
          onTrack: 18,
          delayed: 5,
          ahead: 3,
          atRisk: 2,
          completed: 45
        },
        projectsByCountry: {
          'Brasil': 22,
          'México': 15,
          'Colômbia': 12,
          'Argentina': 8,
          'Chile': 7,
          'Peru': 5,
          'Outros': 4
        },
        qualityByPhase: {
          'pre-installation': 95,
          'installation': 88,
          'commissioning': 92,
          'post-installation': 94
        },
        recentIssues: [
          {
            id: 'ISSUE-001',
            projectId: 'PROJ-002',
            projectName: 'Hospital Central Bogotá',
            title: 'Falha no teste elétrico',
            severity: 'high',
            status: 'in-progress',
            reportedAt: '2023-05-22'
          },
          {
            id: 'ISSUE-002',
            projectId: 'PROJ-005',
            projectName: 'Centro Empresarial Lima',
            title: 'Atraso na entrega de peças',
            severity: 'medium',
            status: 'resolved',
            reportedAt: '2023-05-15'
          }
        ],
        upcomingMilestones: [
          {
            id: 'MILE-001',
            projectId: 'PROJ-001',
            projectName: 'Torre Corporativa São Paulo',
            title: 'Instalação de Cabos',
            dueDate: '2023-07-25'
          },
          {
            id: 'MILE-002',
            projectId: 'PROJ-003',
            projectName: 'Residencial Puerto Madero',
            title: 'Comissionamento Final',
            dueDate: '2023-06-30'
          }
        ]
      };
    }
  },
  '/reports/quality': {
    get: async () => {
      return {
        overview: {
          totalChecks: 842,
          passRate: 87.5,
          failRate: 12.5,
          avgResolutionTime: '3.2 dias'
        },
        byCategory: {
          structural: {
            total: 310,
            passRate: 92.3
          },
          electrical: {
            total: 285,
            passRate: 85.6
          },
          mechanical: {
            total: 195,
            passRate: 88.2
          },
          safety: {
            total: 52,
            passRate: 76.9
          }
        },
        byCountry: {
          'Brasil': {
            total: 325,
            passRate: 89.2
          },
          'México': {
            total: 203,
            passRate: 84.7
          },
          'Colômbia': {
            total: 156,
            passRate: 86.5
          },
          'Outros': {
            total: 158,
            passRate: 85.4
          }
        },
        trendByMonth: [
          {
            month: '2023-01',
            passRate: 82.3,
            totalChecks: 124
          },
          {
            month: '2023-02',
            passRate: 83.7,
            totalChecks: 135
          },
          {
            month: '2023-03',
            passRate: 85.2,
            totalChecks: 155
          },
          {
            month: '2023-04',
            passRate: 86.8,
            totalChecks: 203
          },
          {
            month: '2023-05',
            passRate: 87.5,
            totalChecks: 225
          }
        ],
        commonIssues: [
          {
            title: 'Falha em teste elétrico',
            occurrences: 37,
            avgSeverity: 'high',
            avgResolutionTime: '4.5 dias'
          },
          {
            title: 'Desalinhamento estrutural',
            occurrences: 28,
            avgSeverity: 'medium',
            avgResolutionTime: '2.8 dias'
          },
          {
            title: 'Problemas de calibração',
            occurrences: 23,
            avgSeverity: 'low',
            avgResolutionTime: '1.2 dias'
          }
        ]
      };
    }
  },
  '/notifications': {
    get: async () => {
      return {
        total: 12,
        unread: 5,
        notifications: [
          {
            id: 'NOTIF-001',
            type: 'project_update',
            title: 'Projeto atualizado: Torre Corporativa São Paulo',
            description: 'O status do projeto foi alterado para "Em andamento"',
            timestamp: '2023-06-15T10:30:00Z',
            read: false,
            projectId: 'PROJ-001'
          },
          {
            id: 'NOTIF-002',
            type: 'quality_check',
            title: 'Inspeção de qualidade agendada',
            description: 'Uma nova inspeção de qualidade foi agendada para 25/06/2023',
            timestamp: '2023-06-14T15:45:00Z',
            read: false,
            projectId: 'PROJ-001',
            checkId: 'QC-002'
          },
          {
            id: 'NOTIF-003',
            type: 'document_upload',
            title: 'Novo documento adicionado',
            description: 'O documento "Especificações Revisadas" foi adicionado ao projeto',
            timestamp: '2023-06-12T09:15:00Z',
            read: true,
            projectId: 'PROJ-002',
            documentId: 'DOC-005'
          }
        ]
      };
    }
  },
  '/customer-portal/:customerCode': {
    get: async (config) => {
      const customerCode = config.url.split('/').pop();
      return {
        customer: {
          code: customerCode,
          name: 'Grupo Empresarial Brasileiro',
          contact: {
            name: 'Roberto Campos',
            email: 'roberto.campos@geb.com.br',
            phone: '+55 11 98765-4321'
          }
        },
        projects: [
          {
            id: 'PROJ-001',
            name: 'Torre Corporativa São Paulo',
            status: 'on-track',
            progress: 65,
            startDate: '2023-05-15',
            endDate: '2023-09-20',
            nextMilestone: {
              title: 'Instalação de Cabos',
              date: '2023-07-25'
            },
            recentUpdates: [
              {
                date: '2023-06-10',
                title: 'Inspeção de Nivelamento',
                description: 'A inspeção foi concluída com sucesso.'
              },
              {
                date: '2023-05-15',
                title: 'Início da Instalação',
                description: 'As atividades de instalação foram iniciadas conforme planejado.'
              }
            ]
          }
        ],
        documents: [
          {
            id: 'DOC-C001',
            name: 'Contrato de Instalação',
            type: 'contract',
            size: '2.4 MB',
            uploadDate: '2023-01-05'
          },
          {
            id: 'DOC-C002',
            name: 'Manual do Usuário',
            type: 'manual',
            size: '8.7 MB',
            uploadDate: '2023-02-20'
          }
        ],
        feedbackRequests: [
          {
            id: 'FB-001',
            title: 'Avaliação de Visita Técnica',
            description: 'Por favor, avalie a visita técnica realizada em 15/02/2023',
            dueDate: '2023-06-30',
            completed: false
          }
        ]
      };
    }
  }
};

// Funções auxiliares para interação com a API
const apiService = {
  // Função de login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Armazenar token no localStorage
      localStorage.setItem('otis-token', token);
      
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao realizar login');
    }
  },
  
  // Função de logout
  logout: () => {
    localStorage.removeItem('otis-token');
  },
  
  // Verificar se usuário está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('otis-token');
  },
  
  // Obter usuário atual
  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      apiService.logout();
      throw new Error('Sessão expirada ou inválida');
    }
  },
  
  // Projetos
  projects: {
    list: async (filters = {}) => {
      const queryParams = new URLSearchParams();
      
      // Adicionar filtros como parâmetros de consulta
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });
      
      const url = `/projects${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await api.get(url);
      return response.data;
    },
    
    get: async (projectId) => {
      const response = await api.get(`/projects/${projectId}`);
      return response.data;
    },
    
    create: async (projectData) => {
      const response = await api.post('/projects', projectData);
      return response.data;
    },
    
    update: async (projectId, projectData) => {
      const response = await api.put(`/projects/${projectId}`, projectData);
      return response.data;
    },
    
    delete: async (projectId) => {
      await api.delete(`/projects/${projectId}`);
      return true;
    }
  },
  
  // Documentos
  documents: {
    list: async (projectId) => {
      const response = await api.get(`/projects/${projectId}/documents`);
      return response.data;
    },
    
    upload: async (projectId, file, metadata = {}) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('metadata', JSON.stringify(metadata));
      
      const response = await api.post(`/projects/${projectId}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    },
    
    delete: async (projectId, documentId) => {
      await api.delete(`/projects/${projectId}/documents/${documentId}`);
      return true;
    }
  },
  
  // Qualidade
  quality: {
    listChecks: async (filters = {}) => {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });
      
      const url = `/quality-checks${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await api.get(url);
      return response.data;
    },
    
    createCheck: async (checkData) => {
      const response = await api.post('/quality-checks', checkData);
      return response.data;
    },
    
    updateCheckStatus: async (checkId, status, notes = '') => {
      const response = await api.patch(`/quality-checks/${checkId}/status`, { status, notes });
      return response.data;
    },
    
    getReport: async (filters = {}) => {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });
      
      const url = `/reports/quality${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await api.get(url);
      return response.data;
    }
  },
  
  // Dashboard
  dashboard: {
    getExecutive: async () => {
      const response = await api.get('/dashboards/executive');
      return response.data;
    },
    
    getOperational: async () => {
      const response = await api.get('/dashboards/operational');
      return response.data;
    },
    
    getQuality: async () => {
      const response = await api.get('/dashboards/quality');
      return response.data;
    }
  },
  
  // Notificações
  notifications: {
    list: async () => {
      const response = await api.get('/notifications');
      return response.data;
    },
    
    markAsRead: async (notificationId) => {
      await api.patch(`/notifications/${notificationId}/read`);
      return true;
    },
    
    markAllAsRead: async () => {
      await api.patch('/notifications/read-all');
      return true;
    }
  },
  
  // Portal do Cliente
  customerPortal: {
    getCustomerInfo: async (customerCode) => {
      const response = await api.get(`/customer-portal/${customerCode}`);
      return response.data;
    },
    
    submitFeedback: async (feedbackId, data) => {
      const response = await api.post(`/customer-portal/feedback/${feedbackId}`, data);
      return response.data;
    }
  }
};

export default api;
export { apiService };