import { ClientList } from "./client-list";
import { mockClientData } from "@/lib/data";

export default function ClientsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">View Clients</h2>
        <p className="text-muted-foreground">
          Browse and filter the list of all clients with sustainability projects.
        </p>
      </header>
      <ClientList clients={mockClientData} />
    </div>
  );
}
