import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>
            Manage your application preferences here. This page is a placeholder for future features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Future settings options will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
