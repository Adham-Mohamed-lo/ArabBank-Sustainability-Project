import { ClientList } from "./client-list";
import { mockClientData } from "@/lib/data";

export default function ClientsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">View Clients</h2>
      <ClientList clients={mockClientData} />
    </div>
  );
}
