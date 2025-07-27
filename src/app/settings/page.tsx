
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";

const content = {
  en: {
    title: "Settings",
    description: "Adjust application preferences and configurations.",
    appSettings: "Application Settings",
    language: "Language",
    languageDesc: "Choose the display language for the application interface.",
    english: "English",
    arabic: "Arabic",
  },
  ar: {
    title: "الإعدادات",
    description: "ضبط تفضيلات وتكوينات التطبيق.",
    appSettings: "إعدادات التطبيق",
    language: "اللغة",
    languageDesc: "اختر لغة عرض واجهة التطبيق.",
    english: "الإنجليزية",
    arabic: "العربية",
  }
};

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage();
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
          <CardTitle>{c.appSettings}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold">{c.language}</h3>
            <p className="text-sm text-muted-foreground">{c.languageDesc}</p>
            <div className="flex gap-2 pt-2">
              <Button variant={language === 'en' ? 'default' : 'outline'} onClick={() => setLanguage('en')}>{c.english}</Button>
              <Button variant={language === 'ar' ? 'default' : 'outline'} onClick={() => setLanguage('ar')}>{c.arabic}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
