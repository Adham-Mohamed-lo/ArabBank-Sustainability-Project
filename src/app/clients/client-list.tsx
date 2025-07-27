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
import { ar } from 'date-fns/locale';

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
    status: 'نشيط' | 'مكتمل';
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
    sector: 'الكل',
    companyType: 'الكل',
    companySize: 'الكل',
  });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  const handleResetFilters = () => {
    setFilters({
        companyName: '',
        sector: 'الكل',
        companyType: 'الكل',
        companySize: 'الكل',
    })
  }

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      return (
        (client.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) &&
        (filters.sector === 'الكل' || client.sector === filters.sector) &&
        (filters.companyType === 'الكل' || client.companyType === filters.companyType) &&
        (filters.companySize === 'الكل' || client.companySize === filters.companySize)
      );
    });
  }, [clients, filters]);
  
  const sectors = ['الكل', ...Array.from(new Set(clients.map(c => c.sector)))];
  const companyTypes = ['الكل', ...Array.from(new Set(clients.map(c => c.companyType)))];
  const companySizes = ['الكل', ...Array.from(new Set(clients.map(c => c.companySize)))];

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
            placeholder="Filter by Company Name..."
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
                  معلومات مفصلة لـ {selectedClient.companyName}.
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="grid gap-6 py-6 pr-6" dir="rtl">
                
                {/* Client Details Section */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg">تفاصيل العميل</h4>
                    <div className="grid grid-cols-2 items-center gap-x-4 gap-y-2 text-sm">
                        <div className="text-muted-foreground">القطاع</div>
                        <div>{selectedClient.sector}</div>

                        <div className="text-muted-foreground">رقم التسجيل</div>
                        <div>{selectedClient.unifiedCommercialRegNo}</div>
                        
                        <div className="text-muted-foreground">نوع الشركة</div>
                        <div><Badge variant="secondary">{selectedClient.companyType}</Badge></div>

                        <div className="text-muted-foreground">حجم الشركة</div>
                        <div><Badge>{selectedClient.companySize}</Badge></div>

                        <div className="text-muted-foreground">رمز ISIC L4</div>
                        <div>{selectedClient.isicCodeL4}</div>
                    </div>
                </div>

                <Separator />
                
                {/* Contact Info Section */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg">معلومات الاتصال</h4>
                    <div className="grid grid-cols-2 items-center gap-x-4 gap-y-2 text-sm">
                        <div className="text-muted-foreground">الشخص المسؤول</div>
                        <div>{selectedClient.contactPerson}</div>

                        <div className="text-muted-foreground">البريد الإلكتروني</div>
                        <a href={`mailto:${selectedClient.contactEmail}`} className="text-primary hover:underline">
                            {selectedClient.contactEmail}
                        </a>
                    </div>
                </div>

                <Separator />

                {/* Financial Summary Section */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg">ملخص مالي</h4>
                     <div className="grid grid-cols-2 items-center gap-x-4 gap-y-2 text-sm">
                        <div className="text-muted-foreground">إجمالي التمويل</div>
                        <div>{totalFinancing(selectedClient.projects).toLocaleString()} جنيه مصري</div>
                        
                        <div className="text-muted-foreground">المشاريع النشطة</div>
                        <div>{selectedClient.projects.filter(p => p.status === 'نشيط').length}</div>
                     </div>
                </div>

                <Separator />

                {/* Projects Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">المشاريع</h4>
                  {selectedClient.projects.length > 0 ? (
                    <div className="space-y-6">
                      {selectedClient.projects.map((project, index) => (
                        <div key={project.id} className="p-4 border rounded-lg bg-card space-y-4">
                            <div className="flex justify-between items-start">
                                <h5 className="font-semibold">مشروع #{index + 1}: {project.purposeOfFinancing}</h5>
                                <Badge variant={project.status === 'نشيط' ? 'default' : 'secondary'}>{project.status}</Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <div className="text-muted-foreground col-span-2 font-medium">تفاصيل التمويل</div>
                                <div className="text-muted-foreground">المبلغ الإجمالي</div>
                                <div>{project.currency} {project.totalFinancingAmount.toLocaleString()}</div>
                                <div className="text-muted-foreground">المبلغ المستخدم</div>
                                <div>{project.currency} {project.amountUsed.toLocaleString()}</div>
                                <div className="text-muted-foreground">نوع التسهيل</div>
                                <div>{project.typeOfFacility}</div>
                                <div className="text-muted-foreground">تصنيف</div>
                                <div>{project.facilityClassification}</div>
                                <div className="text-muted-foreground">استعمال</div>
                                <div>{project.usageType}</div>
                                <div className="text-muted-foreground">تاريخ الموافقة</div>
                                <div>{format(project.dateOfCreditApproval, "PPP", { locale: ar })}</div>
                                {project.fundedUnderInitiative && <>
                                    <div className="text-muted-foreground">مبادرة</div>
                                    <div>{project.fundedUnderInitiative}</div>
                                </>}

                                <div className="text-muted-foreground col-span-2 font-medium mt-4">تفاصيل الاستدامة</div>
                                <div className="text-muted-foreground">محور</div>
                                <div>{project.sustainabilityAxis}</div>
                                <div className="text-muted-foreground">التصنيف البيئي/الاجتماعي</div>
                                <div>{project.environmentalSocialClassification}</div>
                                 <div className="text-muted-foreground">طريقة التصنيف</div>
                                <div>{project.classificationMethod}</div>
                                <div className="text-muted-foreground">استشاري مستخدم</div>
                                <div>{project.environmentalConsultantUsed ? 'نعم' : 'لا'}</div>
                                <div className="text-muted-foreground col-span-2">مؤشرات الأثر</div>
                                <div className="col-span-2">{project.impactIndicators}</div>
                            </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">لم يتم العثور على مشاريع لهذا العميل.</div>
                  )}
                </div>
              </div>
              </ScrollArea>
              <SheetFooter className="pr-6">
                <SheetClose asChild>
                  <Button type="submit">إغلاق</Button>
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
