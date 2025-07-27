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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { format } from "date-fns";

type Project = {
    id: number;
    purposeOfFinancing: string;
    totalFinancingAmount: number;
    amountUsed: number;
    currency: string;
    typeOfFacility: string;
    facilityClassification: string;
    usageType: string;
    dateOfCreditApproval: Date;
    fundedUnderInitiative: string;
    environmentalConsultantUsed: boolean;
    sustainabilityAxis: string;
    environmentalSocialClassification: string;
    classificationMethod: string;
    impactIndicators: string;
    status: 'Active' | 'Completed';
};

type Client = {
  id: number;
  companyName: string;
  sector: string;
  unifiedCommercialRegNo: string;
  companyType: string;
  companySize: string;
  isicCodeL4: string;
  contactPerson: string;
  contactEmail: string;
  projects: Project[];
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
  
  const totalFinancing = (projects: Project[]) => {
    return projects.reduce((acc, p) => acc + p.totalFinancingAmount, 0);
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
        <SheetContent className="sm:max-w-2xl w-full">
          {selectedClient && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedClient.companyName}</SheetTitle>
                <SheetDescription>
                  Detailed information for {selectedClient.companyName}.
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="grid gap-6 py-6 pr-6">
                
                {/* Client Details Section */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Client Details</h4>
                    <div className="grid grid-cols-2 items-center gap-x-4 gap-y-2 text-sm">
                        <p className="text-muted-foreground">Sector</p>
                        <p>{selectedClient.sector}</p>

                        <p className="text-muted-foreground">Registration No.</p>
                        <p>{selectedClient.unifiedCommercialRegNo}</p>
                        
                        <p className="text-muted-foreground">Company Type</p>
                        <p><Badge variant="secondary">{selectedClient.companyType}</Badge></p>

                        <p className="text-muted-foreground">Company Size</p>
                        <p><Badge>{selectedClient.companySize}</Badge></p>

                        <p className="text-muted-foreground">ISIC Code L4</p>
                        <p>{selectedClient.isicCodeL4}</p>
                    </div>
                </div>

                <Separator />
                
                {/* Contact Info Section */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Contact Information</h4>
                    <div className="grid grid-cols-2 items-center gap-x-4 gap-y-2 text-sm">
                        <p className="text-muted-foreground">Contact Person</p>
                        <p>{selectedClient.contactPerson}</p>

                        <p className="text-muted-foreground">Contact Email</p>
                        <a href={`mailto:${selectedClient.contactEmail}`} className="text-primary hover:underline">
                            {selectedClient.contactEmail}
                        </a>
                    </div>
                </div>

                <Separator />

                {/* Financial Summary Section */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Financial Summary</h4>
                     <div className="grid grid-cols-2 items-center gap-x-4 gap-y-2 text-sm">
                        <p className="text-muted-foreground">Total Financing</p>
                        <p>EGP {totalFinancing(selectedClient.projects).toLocaleString()}</p>
                        
                        <p className="text-muted-foreground">Active Projects</p>
                        <p>{selectedClient.projects.filter(p => p.status === 'Active').length}</p>
                     </div>
                </div>

                <Separator />

                {/* Projects Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Projects</h4>
                  {selectedClient.projects.length > 0 ? (
                    <div className="space-y-6">
                      {selectedClient.projects.map((project, index) => (
                        <div key={project.id} className="p-4 border rounded-lg bg-card space-y-4">
                            <div className="flex justify-between items-start">
                                <h5 className="font-semibold">Project #{index + 1}: {project.purposeOfFinancing}</h5>
                                <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>{project.status}</Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <p className="text-muted-foreground col-span-2 font-medium">Financing Details</p>
                                <p className="text-muted-foreground">Total Amount</p>
                                <p>{project.currency} {project.totalFinancingAmount.toLocaleString()}</p>
                                <p className="text-muted-foreground">Amount Used</p>
                                <p>{project.currency} {project.amountUsed.toLocaleString()}</p>
                                <p className="text-muted-foreground">Type of Facility</p>
                                <p>{project.typeOfFacility}</p>
                                <p className="text-muted-foreground">Classification</p>
                                <p>{project.facilityClassification}</p>
                                <p className="text-muted-foreground">Usage</p>
                                <p>{project.usageType}</p>
                                <p className="text-muted-foreground">Approval Date</p>
                                <p>{format(project.dateOfCreditApproval, "PPP")}</p>
                                {project.fundedUnderInitiative && <>
                                    <p className="text-muted-foreground">Initiative</p>
                                    <p>{project.fundedUnderInitiative}</p>
                                </>}

                                <p className="text-muted-foreground col-span-2 font-medium mt-4">Sustainability Details</p>
                                <p className="text-muted-foreground">Axis</p>
                                <p>{project.sustainabilityAxis}</p>
                                <p className="text-muted-foreground">E/S Classification</p>
                                <p>{project.environmentalSocialClassification}</p>
                                 <p className="text-muted-foreground">Classification Method</p>
                                <p>{project.classificationMethod}</p>
                                <p className="text-muted-foreground">Consultant Used</p>
                                <p>{project.environmentalConsultantUsed ? 'Yes' : 'No'}</p>
                                <p className="text-muted-foreground col-span-2">Impact Indicators</p>
                                <p className="col-span-2">{project.impactIndicators}</p>
                            </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No projects found for this client.</p>
                  )}
                </div>
              </div>
              </ScrollArea>
              <SheetFooter className="pr-6">
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
