
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Edit, Trash2, Package, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EPI {
  id: number;
  name: string;
  code: string;
  description: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unitPrice: number;
  hasExpiration: boolean;
  expirationDate?: string;
  status: 'ativo' | 'inativo';
  registrationDate: string;
}

const EPIManagement = () => {
  const [epis, setEpis] = useState<EPI[]>([
    {
      id: 1,
      name: 'Capacete de Segurança',
      code: 'CAP001',
      description: 'Capacete de segurança classe A, cor branca',
      category: 'Proteção da Cabeça',
      quantity: 15,
      minQuantity: 10,
      unitPrice: 25.90,
      hasExpiration: false,
      status: 'ativo',
      registrationDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Luvas de Proteção',
      code: 'LUV001',
      description: 'Luvas de látex, tamanho M',
      category: 'Proteção das Mãos',
      quantity: 5,
      minQuantity: 10,
      unitPrice: 8.50,
      hasExpiration: true,
      expirationDate: '2024-07-15',
      status: 'ativo',
      registrationDate: '2024-02-10'
    },
    {
      id: 3,
      name: 'Óculos de Proteção',
      code: 'OCU001',
      description: 'Óculos de proteção contra impactos',
      category: 'Proteção dos Olhos',
      quantity: 8,
      minQuantity: 5,
      unitPrice: 15.75,
      hasExpiration: false,
      status: 'ativo',
      registrationDate: '2024-03-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEPI, setEditingEPI] = useState<EPI | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    category: '',
    quantity: 0,
    minQuantity: 0,
    unitPrice: 0,
    hasExpiration: false,
    expirationDate: '',
    status: 'ativo' as 'ativo' | 'inativo'
  });

  const categories = [
    'Proteção da Cabeça',
    'Proteção dos Olhos',
    'Proteção das Mãos',
    'Proteção dos Pés',
    'Proteção Respiratória',
    'Proteção do Tronco',
    'Proteção Auditiva',
    'Proteção contra Quedas'
  ];

  const filteredEPIs = epis.filter(epi =>
    epi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    epi.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    epi.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEPI) {
      setEpis(epis.map(epi => 
        epi.id === editingEPI.id 
          ? { ...epi, ...formData }
          : epi
      ));
      toast({ title: "EPI atualizado com sucesso!" });
    } else {
      const newEPI: EPI = {
        id: Date.now(),
        ...formData,
        registrationDate: new Date().toISOString().split('T')[0]
      };
      setEpis([...epis, newEPI]);
      toast({ title: "EPI cadastrado com sucesso!" });
    }

    setFormData({
      name: '',
      code: '',
      description: '',
      category: '',
      quantity: 0,
      minQuantity: 0,
      unitPrice: 0,
      hasExpiration: false,
      expirationDate: '',
      status: 'ativo'
    });
    setEditingEPI(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (epi: EPI) => {
    setEditingEPI(epi);
    setFormData({
      name: epi.name,
      code: epi.code,
      description: epi.description,
      category: epi.category,
      quantity: epi.quantity,
      minQuantity: epi.minQuantity,
      unitPrice: epi.unitPrice,
      hasExpiration: epi.hasExpiration,
      expirationDate: epi.expirationDate || '',
      status: epi.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setEpis(epis.filter(epi => epi.id !== id));
    toast({ title: "EPI removido com sucesso!" });
  };

  const getStockStatus = (epi: EPI) => {
    if (epi.quantity <= epi.minQuantity) {
      return { status: 'low', label: 'Estoque Baixo', variant: 'destructive' as const };
    }
    return { status: 'ok', label: 'Normal', variant: 'default' as const };
  };

  const isExpiringSoon = (epi: EPI) => {
    if (!epi.hasExpiration || !epi.expirationDate) return false;
    const expirationDate = new Date(epi.expirationDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expirationDate <= thirtyDaysFromNow;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Gestão de EPIs
          </CardTitle>
          <CardDescription>
            Cadastre e controle os Equipamentos de Proteção Individual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar EPI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingEPI(null);
                  setFormData({
                    name: '',
                    code: '',
                    description: '',
                    category: '',
                    quantity: 0,
                    minQuantity: 0,
                    unitPrice: 0,
                    hasExpiration: false,
                    expirationDate: '',
                    status: 'ativo'
                  });
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo EPI
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingEPI ? 'Editar EPI' : 'Novo EPI'}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do EPI abaixo.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome do EPI</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Código</Label>
                      <Input
                        id="code"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantidade</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="0"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minQuantity">Estoque Mínimo</Label>
                      <Input
                        id="minQuantity"
                        type="number"
                        min="0"
                        value={formData.minQuantity}
                        onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) || 0 })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="unitPrice">Preço Unitário (R$)</Label>
                      <Input
                        id="unitPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.unitPrice}
                        onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as 'ativo' | 'inativo' })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="inativo">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="hasExpiration"
                        checked={formData.hasExpiration}
                        onChange={(e) => setFormData({ ...formData, hasExpiration: e.target.checked })}
                        className="rounded"
                      />
                      <Label htmlFor="hasExpiration">Este EPI possui validade</Label>
                    </div>
                    
                    {formData.hasExpiration && (
                      <div className="space-y-2">
                        <Label htmlFor="expirationDate">Data de Validade</Label>
                        <Input
                          id="expirationDate"
                          type="date"
                          value={formData.expirationDate}
                          onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {editingEPI ? 'Atualizar' : 'Cadastrar'}
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
                  <TableHead>Nome</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Preço Unit.</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEPIs.map((epi) => {
                  const stockStatus = getStockStatus(epi);
                  const expiringSoon = isExpiringSoon(epi);
                  
                  return (
                    <TableRow key={epi.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {epi.name}
                          {stockStatus.status === 'low' && (
                            <AlertTriangle className="ml-2 h-4 w-4 text-orange-500" />
                          )}
                          {expiringSoon && (
                            <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{epi.code}</TableCell>
                      <TableCell>{epi.category}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{epi.quantity} un.</span>
                          <Badge variant={stockStatus.variant} className="text-xs w-fit mt-1">
                            {stockStatus.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>R$ {epi.unitPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        {epi.hasExpiration ? (
                          <div className="flex flex-col">
                            <span>{epi.expirationDate ? new Date(epi.expirationDate).toLocaleDateString('pt-BR') : '-'}</span>
                            {expiringSoon && (
                              <Badge variant="destructive" className="text-xs w-fit mt-1">
                                Vencendo
                              </Badge>
                            )}
                          </div>
                        ) : (
                          'Não se aplica'
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={epi.status === 'ativo' ? 'default' : 'secondary'}>
                          {epi.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(epi)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(epi.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredEPIs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum EPI encontrado.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EPIManagement;
