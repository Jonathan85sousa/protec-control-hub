
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Calendar, User, Package, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Reports = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEPI, setSelectedEPI] = useState('');

  // Dados simulados para relatórios
  const employeeReports = [
    {
      employee: 'João Silva',
      epi: 'Capacete de Segurança',
      deliveryDate: '2024-05-28',
      quantity: 1,
      expirationDate: null,
      responsible: 'Carlos Santos'
    },
    {
      employee: 'João Silva',
      epi: 'Luvas de Proteção',
      deliveryDate: '2024-04-15',
      quantity: 2,
      expirationDate: '2024-06-15',
      responsible: 'Ana Costa'
    }
  ];

  const stockReports = [
    {
      epi: 'Capacete de Segurança',
      currentStock: 15,
      minStock: 10,
      totalDelivered: 8,
      averageMonthly: 3,
      status: 'Normal'
    },
    {
      epi: 'Luvas de Proteção',
      currentStock: 5,
      minStock: 10,
      totalDelivered: 15,
      averageMonthly: 6,
      status: 'Estoque Baixo'
    },
    {
      epi: 'Óculos de Proteção',
      currentStock: 8,
      minStock: 5,
      totalDelivered: 4,
      averageMonthly: 2,
      status: 'Normal'
    }
  ];

  const expirationReports = [
    {
      epi: 'Luvas de Proteção - Lote A',
      expirationDate: '2024-06-15',
      daysToExpire: 18,
      currentStock: 5,
      status: 'Próximo ao Vencimento'
    },
    {
      epi: 'Máscaras PFF2 - Lote B',
      expirationDate: '2024-07-20',
      daysToExpire: 53,
      currentStock: 20,
      status: 'Normal'
    },
    {
      epi: 'Protetor Auricular - Lote C',
      expirationDate: '2024-06-01',
      daysToExpire: 4,
      currentStock: 3,
      status: 'Vencimento Crítico'
    }
  ];

  const deliveryReports = [
    {
      date: '2024-05-28',
      employee: 'João Silva',
      epi: 'Capacete de Segurança',
      quantity: 1,
      responsible: 'Carlos Santos'
    },
    {
      date: '2024-05-27',
      employee: 'Maria Santos',
      epi: 'Luvas de Proteção',
      quantity: 2,
      responsible: 'Ana Costa'
    },
    {
      date: '2024-05-26',
      employee: 'Pedro Costa',
      epi: 'Óculos de Proteção',
      quantity: 1,
      responsible: 'Carlos Santos'
    }
  ];

  const employees = ['João Silva', 'Maria Santos', 'Pedro Costa'];
  const epis = ['Capacete de Segurança', 'Luvas de Proteção', 'Óculos de Proteção'];

  const handleExportPDF = (reportType: string) => {
    toast({ 
      title: "Exportando relatório...", 
      description: `Relatório de ${reportType} será baixado em breve.` 
    });
    // Aqui seria implementada a lógica real de exportação para PDF
  };

  const handleExportExcel = (reportType: string) => {
    toast({ 
      title: "Exportando relatório...", 
      description: `Relatório de ${reportType} será baixado em breve.` 
    });
    // Aqui seria implementada a lógica real de exportação para Excel
  };

  const getExpirationStatusColor = (status: string) => {
    switch (status) {
      case 'Vencimento Crítico':
        return 'text-red-600 bg-red-50';
      case 'Próximo ao Vencimento':
        return 'text-orange-600 bg-orange-50';
      case 'Normal':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'Estoque Baixo':
        return 'text-orange-600 bg-orange-50';
      case 'Normal':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Relatórios do Sistema
          </CardTitle>
          <CardDescription>
            Gere relatórios detalhados sobre EPIs, colaboradores e entregas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="deliveries" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="deliveries">Entregas</TabsTrigger>
              <TabsTrigger value="employees">Por Colaborador</TabsTrigger>
              <TabsTrigger value="stock">Estoque</TabsTrigger>
              <TabsTrigger value="expiration">Vencimentos</TabsTrigger>
            </TabsList>

            <TabsContent value="deliveries" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatório de Entregas</CardTitle>
                  <CardDescription>
                    Visualize todas as entregas realizadas no período
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateFrom">Data Inicial</Label>
                      <Input
                        id="dateFrom"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateTo">Data Final</Label>
                      <Input
                        id="dateTo"
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end space-x-2">
                      <Button onClick={() => handleExportPDF('Entregas')} className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                      <Button onClick={() => handleExportExcel('Entregas')} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Excel
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Colaborador</TableHead>
                          <TableHead>EPI</TableHead>
                          <TableHead>Quantidade</TableHead>
                          <TableHead>Responsável</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deliveryReports.map((delivery, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(delivery.date).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>{delivery.employee}</TableCell>
                            <TableCell>{delivery.epi}</TableCell>
                            <TableCell>{delivery.quantity}</TableCell>
                            <TableCell>{delivery.responsible}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employees" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatório por Colaborador</CardTitle>
                  <CardDescription>
                    Histórico de EPIs entregues para cada colaborador
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee">Colaborador</Label>
                      <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                        <SelectTrigger>
                          <SelectValue placeholder="Todos os colaboradores" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os colaboradores</SelectItem>
                          {employees.map((employee) => (
                            <SelectItem key={employee} value={employee}>{employee}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="period">Período</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Últimos 30 dias" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">Últimos 30 dias</SelectItem>
                          <SelectItem value="60">Últimos 60 dias</SelectItem>
                          <SelectItem value="90">Últimos 90 dias</SelectItem>
                          <SelectItem value="custom">Período personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end space-x-2">
                      <Button onClick={() => handleExportPDF('Colaboradores')} className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                      <Button onClick={() => handleExportExcel('Colaboradores')} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Excel
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Colaborador</TableHead>
                          <TableHead>EPI</TableHead>
                          <TableHead>Data Entrega</TableHead>
                          <TableHead>Quantidade</TableHead>
                          <TableHead>Validade</TableHead>
                          <TableHead>Responsável</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employeeReports.map((report, index) => (
                          <TableRow key={index}>
                            <TableCell>{report.employee}</TableCell>
                            <TableCell>{report.epi}</TableCell>
                            <TableCell>{new Date(report.deliveryDate).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>{report.quantity}</TableCell>
                            <TableCell>
                              {report.expirationDate 
                                ? new Date(report.expirationDate).toLocaleDateString('pt-BR')
                                : 'N/A'
                              }
                            </TableCell>
                            <TableCell>{report.responsible}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stock" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatório de Estoque</CardTitle>
                  <CardDescription>
                    Controle de estoque atual e movimentação de EPIs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-end space-x-2">
                    <Button onClick={() => handleExportPDF('Estoque')}>
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                    <Button onClick={() => handleExportExcel('Estoque')} variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Excel
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>EPI</TableHead>
                          <TableHead>Estoque Atual</TableHead>
                          <TableHead>Estoque Mínimo</TableHead>
                          <TableHead>Total Entregue</TableHead>
                          <TableHead>Média Mensal</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stockReports.map((stock, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{stock.epi}</TableCell>
                            <TableCell>{stock.currentStock}</TableCell>
                            <TableCell>{stock.minStock}</TableCell>
                            <TableCell>{stock.totalDelivered}</TableCell>
                            <TableCell>{stock.averageMonthly}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(stock.status)}`}>
                                {stock.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expiration" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatório de Vencimentos</CardTitle>
                  <CardDescription>
                    EPIs próximos ao vencimento ou já vencidos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-end space-x-2">
                    <Button onClick={() => handleExportPDF('Vencimentos')}>
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                    <Button onClick={() => handleExportExcel('Vencimentos')} variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Excel
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>EPI</TableHead>
                          <TableHead>Data de Vencimento</TableHead>
                          <TableHead>Dias para Vencer</TableHead>
                          <TableHead>Estoque Atual</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expirationReports.map((expiration, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                {expiration.daysToExpire <= 7 && (
                                  <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                                )}
                                {expiration.epi}
                              </div>
                            </TableCell>
                            <TableCell>{new Date(expiration.expirationDate).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>
                              <span className={expiration.daysToExpire <= 0 ? 'text-red-600 font-medium' : ''}>
                                {expiration.daysToExpire <= 0 ? 'VENCIDO' : `${expiration.daysToExpire} dias`}
                              </span>
                            </TableCell>
                            <TableCell>{expiration.currentStock}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExpirationStatusColor(expiration.status)}`}>
                                {expiration.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
