
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Package, AlertTriangle, Calendar, TrendingUp, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import EmployeeManagement from '@/components/EmployeeManagement';
import EPIManagement from '@/components/EPIManagement';
import DeliveryManagement from '@/components/DeliveryManagement';
import Reports from '@/components/Reports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dados de exemplo para o dashboard
  const dashboardData = {
    totalEmployees: 45,
    totalEPIs: 12,
    lowStock: 3,
    nearExpiration: 5,
    deliveriesThisMonth: 28,
    totalValue: 15420.50
  };

  const alerts = [
    { type: 'warning', message: 'Capacete de Segurança com estoque baixo (5 unidades)' },
    { type: 'danger', message: 'Luvas de Proteção vencendo em 15 dias' },
    { type: 'warning', message: 'Óculos de Proteção com estoque baixo (2 unidades)' }
  ];

  const recentDeliveries = [
    { id: 1, employee: 'João Silva', epi: 'Capacete de Segurança', date: '2024-05-28', status: 'Entregue' },
    { id: 2, employee: 'Maria Santos', epi: 'Luvas de Proteção', date: '2024-05-27', status: 'Entregue' },
    { id: 3, employee: 'Pedro Costa', epi: 'Botina de Segurança', date: '2024-05-26', status: 'Entregue' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Sistema de Controle de EPIs</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">Administrador</Badge>
              <Button variant="outline" size="sm">Sair</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="employees">Colaboradores</TabsTrigger>
            <TabsTrigger value="epis">EPIs</TabsTrigger>
            <TabsTrigger value="deliveries">Entregas</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.totalEmployees}</div>
                  <p className="text-xs text-muted-foreground">+2 novos este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tipos de EPIs</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.totalEPIs}</div>
                  <p className="text-xs text-muted-foreground">Cadastrados no sistema</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Entregas do Mês</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.deliveriesThisMonth}</div>
                  <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{dashboardData.lowStock}</div>
                  <p className="text-xs text-muted-foreground">EPIs com estoque crítico</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próx. Vencimento</CardTitle>
                  <Calendar className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{dashboardData.nearExpiration}</div>
                  <p className="text-xs text-muted-foreground">EPIs vencendo em 30 dias</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {dashboardData.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                  <p className="text-xs text-muted-foreground">Valor do estoque</p>
                </CardContent>
              </Card>
            </div>

            {/* Alerts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alertas do Sistema</CardTitle>
                  <CardDescription>Atenção necessária para os itens abaixo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      alert.type === 'danger' ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'
                    }`}>
                      <div className="flex items-center">
                        <AlertTriangle className={`h-4 w-4 mr-2 ${
                          alert.type === 'danger' ? 'text-red-500' : 'text-orange-500'
                        }`} />
                        <span className="text-sm">{alert.message}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Entregas Recentes</CardTitle>
                  <CardDescription>Últimas entregas realizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentDeliveries.map((delivery) => (
                      <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{delivery.employee}</p>
                          <p className="text-xs text-gray-500">{delivery.epi}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{delivery.date}</p>
                          <Badge variant="secondary" className="text-xs">{delivery.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees">
            <EmployeeManagement />
          </TabsContent>

          <TabsContent value="epis">
            <EPIManagement />
          </TabsContent>

          <TabsContent value="deliveries">
            <DeliveryManagement />
          </TabsContent>

          <TabsContent value="reports">
            <Reports />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
