
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Eye, Truck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Delivery {
  id: number;
  employeeId: number;
  employeeName: string;
  epiId: number;
  epiName: string;
  quantity: number;
  deliveryDate: string;
  expirationDate?: string;
  responsiblePerson: string;
  status: 'entregue' | 'pendente' | 'devolvido';
  observations?: string;
}

const DeliveryManagement = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 1,
      employeeId: 1,
      employeeName: 'João Silva',
      epiId: 1,
      epiName: 'Capacete de Segurança',
      quantity: 1,
      deliveryDate: '2024-05-28',
      responsiblePerson: 'Carlos Santos',
      status: 'entregue',
      observations: 'Entrega realizada conforme NR-6'
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Maria Santos',
      epiId: 2,
      epiName: 'Luvas de Proteção',
      quantity: 2,
      deliveryDate: '2024-05-27',
      expirationDate: '2024-07-15',
      responsiblePerson: 'Ana Costa',
      status: 'entregue'
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: 'Pedro Costa',
      epiId: 3,
      epiName: 'Óculos de Proteção',
      quantity: 1,
      deliveryDate: '2024-05-26',
      responsiblePerson: 'Carlos Santos',
      status: 'entregue'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    epiId: '',
    quantity: 1,
    deliveryDate: new Date().toISOString().split('T')[0],
    expirationDate: '',
    responsiblePerson: '',
    observations: ''
  });

  // Dados simulados para os selects
  const employees = [
    { id: 1, name: 'João Silva' },
    { id: 2, name: 'Maria Santos' },
    { id: 3, name: 'Pedro Costa' }
  ];

  const epis = [
    { id: 1, name: 'Capacete de Segurança', hasExpiration: false },
    { id: 2, name: 'Luvas de Proteção', hasExpiration: true },
    { id: 3, name: 'Óculos de Proteção', hasExpiration: false },
    { id: 4, name: 'Botina de Segurança', hasExpiration: false }
  ];

  const filteredDeliveries = deliveries.filter(delivery =>
    delivery.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.epiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const employee = employees.find(emp => emp.id === parseInt(formData.employeeId));
    const epi = epis.find(e => e.id === parseInt(formData.epiId));
    
    if (!employee || !epi) {
      toast({ 
        title: "Erro", 
        description: "Selecione um colaborador e um EPI válidos.",
        variant: "destructive"
      });
      return;
    }

    const newDelivery: Delivery = {
      id: Date.now(),
      employeeId: parseInt(formData.employeeId),
      employeeName: employee.name,
      epiId: parseInt(formData.epiId),
      epiName: epi.name,
      quantity: formData.quantity,
      deliveryDate: formData.deliveryDate,
      expirationDate: formData.expirationDate || undefined,
      responsiblePerson: formData.responsiblePerson,
      status: 'entregue',
      observations: formData.observations || undefined
    };

    setDeliveries([newDelivery, ...deliveries]);
    toast({ title: "Entrega registrada com sucesso!" });

    setFormData({
      employeeId: '',
      epiId: '',
      quantity: 1,
      deliveryDate: new Date().toISOString().split('T')[0],
      expirationDate: '',
      responsiblePerson: '',
      observations: ''
    });
    setIsDialogOpen(false);
  };

  const handleViewDetails = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregue':
        return 'default';
      case 'pendente':
        return 'secondary';
      case 'devolvido':
        return 'outline';
      default:
        return 'default';
    }
  };

  const selectedEPI = epis.find(epi => epi.id === parseInt(formData.epiId));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="mr-2 h-5 w-5" />
            Controle de Entregas
          </CardTitle>
          <CardDescription>
            Registre e acompanhe as entregas de EPIs aos colaboradores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar entrega..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setFormData({
                    employeeId: '',
                    epiId: '',
                    quantity: 1,
                    deliveryDate: new Date().toISOString().split('T')[0],
                    expirationDate: '',
                    responsiblePerson: '',
                    observations: ''
                  });
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Entrega
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Nova Entrega de EPI</DialogTitle>
                  <DialogDescription>
                    Registre uma nova entrega de equipamento de proteção.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee">Colaborador</Label>
                      <Select value={formData.employeeId} onValueChange={(value) => setFormData({ ...formData, employeeId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o colaborador" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id.toString()}>
                              {employee.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="epi">EPI</Label>
                      <Select value={formData.epiId} onValueChange={(value) => setFormData({ ...formData, epiId: value, expirationDate: '' })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o EPI" />
                        </SelectTrigger>
                        <SelectContent>
                          {epis.map((epi) => (
                            <SelectItem key={epi.id} value={epi.id.toString()}>
                              {epi.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantidade</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">Data da Entrega</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {selectedEPI?.hasExpiration && (
                    <div className="space-y-2">
                      <Label htmlFor="expirationDate">Data de Validade do EPI</Label>
                      <Input
                        id="expirationDate"
                        type="date"
                        value={formData.expirationDate}
                        onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="responsiblePerson">Responsável pela Entrega</Label>
                    <Input
                      id="responsiblePerson"
                      value={formData.responsiblePerson}
                      onChange={(e) => setFormData({ ...formData, responsiblePerson: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observations">Observações</Label>
                    <Input
                      id="observations"
                      value={formData.observations}
                      onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                      placeholder="Observações adicionais (opcional)"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      Registrar Entrega
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>EPI</TableHead>
                  <TableHead>Qtd.</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell>{new Date(delivery.deliveryDate).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="font-medium">{delivery.employeeName}</TableCell>
                    <TableCell>{delivery.epiName}</TableCell>
                    <TableCell>{delivery.quantity}</TableCell>
                    <TableCell>
                      {delivery.expirationDate 
                        ? new Date(delivery.expirationDate).toLocaleDateString('pt-BR')
                        : 'N/A'
                      }
                    </TableCell>
                    <TableCell>{delivery.responsiblePerson}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(delivery.status)}>
                        {delivery.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(delivery)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredDeliveries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma entrega encontrada.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de detalhes da entrega */}
      {selectedDelivery && (
        <Dialog open={!!selectedDelivery} onOpenChange={() => setSelectedDelivery(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes da Entrega</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Colaborador</Label>
                  <p className="text-sm text-gray-600">{selectedDelivery.employeeName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">EPI</Label>
                  <p className="text-sm text-gray-600">{selectedDelivery.epiName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Quantidade</Label>
                  <p className="text-sm text-gray-600">{selectedDelivery.quantity}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Data da Entrega</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedDelivery.deliveryDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              {selectedDelivery.expirationDate && (
                <div>
                  <Label className="text-sm font-medium">Data de Validade</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedDelivery.expirationDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium">Responsável pela Entrega</Label>
                <p className="text-sm text-gray-600">{selectedDelivery.responsiblePerson}</p>
              </div>
              {selectedDelivery.observations && (
                <div>
                  <Label className="text-sm font-medium">Observações</Label>
                  <p className="text-sm text-gray-600">{selectedDelivery.observations}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DeliveryManagement;
