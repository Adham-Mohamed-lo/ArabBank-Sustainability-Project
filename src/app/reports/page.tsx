
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download, Upload } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Generate and download reports for analysis and regulatory submission.
        </p>
      </header>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Download Reports</CardTitle>
            <CardDescription>
              Generate and download reports in various formats.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Summary Report (PDF)
            </Button>
            <Button variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Export All Data (Excel)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Report</CardTitle>
            <CardDescription>
              Upload a previously generated report (PDF or Excel) to add it to the database.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-grow">
              <Input type="file" accept=".pdf,.xls,.xlsx,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
