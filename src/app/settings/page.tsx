
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Adjust application preferences and configurations.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold">Language</h3>
            <p className="text-sm text-muted-foreground">Choose the display language for the application interface.</p>
            <div className="flex gap-2 pt-2">
              <Button variant={'default'}>English</Button>
              <Button variant={'outline'}>Arabic</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
