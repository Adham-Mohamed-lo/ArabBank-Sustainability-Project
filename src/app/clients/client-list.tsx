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

type Client = {
  id: number;
  companyName: string;
  sector: string;
  unifiedCommercialRegNo: string;
  companyType: string;
  companySize: string;
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

  return (
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
                <TableRow key={client.id}>
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
  );
}
