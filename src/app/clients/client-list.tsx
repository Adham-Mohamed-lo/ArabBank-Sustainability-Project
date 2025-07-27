"use client";

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from '@/components/ui/badge';

type Client = {
  id: number;
  companyName: string;
  sector: string;
  unifiedCommercialRegNo: string;
  companyType: string;
  companySize: string;
  totalFinancing: number;
  activeProjects: number;
  contactPerson: string;
  contactEmail: string;
};

interface ClientListProps {
  clients: Client[];
}

export function ClientList({ clients }: ClientListProps) {
  const [filters, setFilters] = useState({
    companyName: '',
    sector: 'All',
    companyType: 'All',
    companySize: 'All',
  });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  const handleResetFilters = () => {
    setFilters({
        companyName: '',
        sector: 'All',
        companyType: 'All',
        companySize: 'All',
    })
  }

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      return (
        (client.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) &&
        (filters.sector === 'All' || client.sector === filters.sector) &&
        (filters.companyType === 'All' || client.companyType === filters.companyType) &&
        (filters.companySize === 'All' || client.companySize === filters.companySize)
      );
    });
  }, [clients, filters]);
  
  const sectors = ['All', ...Array.from(new Set(clients.map(c => c.sector)))];
  const companyTypes = ['All', ...Array.from(new Set(clients.map(c => c.companyType)))];
  const companySizes = ['All', ...Array.from(new Set(clients.map(c => c.companySize)))];

  const handleRowClick = (client: Client) => {
    setSelectedClient(client);
  }

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 border rounded-lg bg-card">
          <Input
            placeholder="Filter by company name..."
            value={filters.companyName}
            onChange={e => handleFilterChange('companyName', e.target.value)}
            className="lg:col-span-2"
          />
          <Select value={filters.companyType} onValueChange={value => handleFilterChange('companyType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              {companyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filters.companySize} onValueChange={value => handleFilterChange('companySize', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Size" />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={handleResetFilters} variant="outline">Reset Filters</Button>
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Registration No.</TableHead>
                <TableHead>Company Type</TableHead>
                <TableHead>Company Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map(client => (
                  <TableRow key={client.id} onClick={() => handleRowClick(client)} className="cursor-pointer">
                    <TableCell className="font-medium">{client.companyName}</TableCell>
                    <TableCell>{client.sector}</TableCell>
                    <TableCell>{client.unifiedCommercialRegNo}</TableCell>
                    <TableCell>{client.companyType}</TableCell>
                    <TableCell>{client.companySize}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Sheet open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedClient && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedClient.companyName}</SheetTitle>
                <SheetDescription>
                  Detailed information for {selectedClient.companyName}.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-6">
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm text-muted-foreground">Sector</p>
                  <p>{selectedClient.sector}</p>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm text-muted-foreground">Registration No.</p>
                  <p>{selectedClient.unifiedCommercialRegNo}</p>
                </div>
                 <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm text-muted-foreground">Company Type</p>
                  <p><Badge variant="secondary">{selectedClient.companyType}</Badge></p>
                </div>
                 <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm text-muted-foreground">Company Size</p>
                  <p><Badge>{selectedClient.companySize}</Badge></p>
                </div>
                 <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm text-muted-foreground">Total Financing</p>
                  <p>EGP {selectedClient.totalFinancing.toLocaleString()}</p>
                </div>
                 <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p>{selectedClient.activeProjects}</p>
                </div>
                 <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm text-muted-foreground">Contact Person</p>
                  <p>{selectedClient.contactPerson}</p>
                </div>
                 <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm text-muted-foreground">Contact Email</p>
                  <a href={`mailto:${selectedClient.contactEmail}`} className="text-primary hover:underline">
                    {selectedClient.contactEmail}
                  </a>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Close</Button>
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
