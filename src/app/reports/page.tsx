
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { Download } from "lucide-react";

const content = {
  en: {
      title: "Reports",
      description: "Generate and download reports for analysis and regulatory submission.",
      downloadTitle: "Download Reports",
      downloadDesc: "Generate and download reports in various formats.",
      summaryPdf: "Download Summary Report (PDF)",
      exportExcel: "Export All Data (Excel)",
      inEnglish: "in English",
      inArabic: "in Arabic",
  },
  ar: {
      title: "التقارير",
      description: "إنشاء وتنزيل التقارير للتحليل والتقديم التنظيمي.",
      downloadTitle: "تنزيل التقارير",
      downloadDesc: "إنشاء وتنزيل التقارير بتنسيقات مختلفة.",
      summaryPdf: "تنزيل تقرير موجز (PDF)",
      exportExcel: "تصدير كافة البيانات (Excel)",
      inEnglish: "باللغة الإنجليزية",
      inArabic: "باللغة العربية",
  }
};

export default function ReportsPage() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">{c.title}</h2>
        <p className="text-muted-foreground">
         {c.description}
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>{c.downloadTitle}</CardTitle>
          <CardDescription>
            {c.downloadDesc}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row flex-wrap gap-4">
           <Button>
            <Download className="mr-2 h-4 w-4" />
            {c.summaryPdf} ({language === 'en' ? c.inEnglish : c.inArabic})
          </Button>
           <Button variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            {c.exportExcel} ({language === 'en' ? c.inEnglish : c.inArabic})
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
