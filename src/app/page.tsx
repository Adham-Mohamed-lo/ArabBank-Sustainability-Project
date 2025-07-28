"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Banknote, Activity, CheckCircle2, Users, ShieldAlert } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts";
import { 
  financingByCompanySizeData, 
  COLORS, 
  financingBySustainabilityType, 
  financingByCbamData,
  environmentalSectorsData,
  socialSectorsData,
  industrialSectorsData
} from "@/lib/data";

const chartConfigSize = {
  financing: {
    label: "Financing (EGP)",
  },
  ...financingByCompanySizeData.reduce((acc, entry) => {
    acc[entry.companySize] = { label: entry.companySize };
    return acc;
  }, {}),
};

const chartConfigSustain = {
  financing: {
    label: "Financing (EGP)",
  },
  ...financingBySustainabilityType.reduce((acc, entry) => {
    acc[entry.type] = { label: entry.type };
    return acc;
  }, {}),
};

const chartConfigCbam = {
  financing: {
    label: "Financing (EGP)",
  },
  ...financingByCbamData.reduce((acc, entry) => {
    acc[entry.type] = { label: entry.type };
    return acc;
  }, {}),
};

const chartConfigEnvSectors = {
  financing: {
    label: "Financing (EGP)",
  },
  ...environmentalSectorsData.reduce((acc, entry) => {
    acc[entry.sector] = { label: entry.sector };
    return acc;
  }, {}),
};

const chartConfigSocialSectors = {
  financing: {
    label: "Financing (EGP)",
  },
  ...socialSectorsData.reduce((acc, entry) => {
    acc[entry.sector] = { label: entry.sector };
    return acc;
  }, {}),
};

const chartConfigIndustrialSectors = {
  financing: {
    label: "Financing (EGP)",
  },
  ...industrialSectorsData.reduce((acc, entry) => {
    acc[entry.sector] = { label: entry.sector };
    return acc;
  }, {}),
};

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            An overview of the bank's sustainability financing
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Clients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              clients with sustainability projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Financing Issued
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">EGP 45,231,890</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              currently ongoing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+212</div>
            <p className="text-xs text-muted-foreground">
              successfully finished
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Financing by Environmental Sector</CardTitle>
            <CardDescription>
              Financing issued for projects in key environmental sectors.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfigEnvSectors} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={environmentalSectorsData} margin={{ left: 10, right: 10 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="sector"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 10)}
                />
                 <YAxis 
                  tickFormatter={(value) => `EGP ${Number(value) / 1000000}M`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="financing" fill="var(--color-chart-2)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Financing by Social Sector</CardTitle>
             <CardDescription>
              Financing issued for projects in key social sectors.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={chartConfigSocialSectors} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={socialSectorsData} margin={{ left: 10, right: 10 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="sector"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                 <YAxis 
                  tickFormatter={(value) => `EGP ${Number(value) / 1000000}M`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="financing" fill="var(--color-chart-1)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Financing by Industrial Sector</CardTitle>
             <CardDescription>
              Financing issued for projects in key industrial sectors.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={chartConfigIndustrialSectors} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={industrialSectorsData} margin={{ left: 10, right: 10 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="sector"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                 <YAxis 
                  tickFormatter={(value) => `EGP ${Number(value) / 1000000}M`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="financing" fill="var(--color-chart-3)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Financing by Company Size</CardTitle>
             <CardDescription>
              Distribution of financing among small, medium, and large companies.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfigSize} className="h-[300px] w-full">
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="financing" hideLabel />} />
                    <Pie data={financingByCompanySizeData} dataKey="financing" nameKey="companySize" cx="50%" cy="50%" outerRadius={80} >
                        {financingByCompanySizeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="companySize" />} />
                </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Financing by Sustainability Type</CardTitle>
            <CardDescription>
              A high-level breakdown of financing for Environmental vs. Social projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigSustain} className="h-[300px] w-full">
              <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="financing" hideLabel />} />
                  <Pie data={financingBySustainabilityType} dataKey="financing" nameKey="type" cx="50%" cy="50%" innerRadius={60} outerRadius={100} >
                      {financingBySustainabilityType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent nameKey="type" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    CBAM Affected
                    <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>
                    Financing for projects potentially affected by CBAM.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfigCbam} className="h-[300px] w-full">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="financing" hideLabel />} />
                        <Pie data={financingByCbamData} dataKey="financing" nameKey="type" cx="50%" cy="50%" outerRadius={80}>
                            {financingByCbamData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent nameKey="type" />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
