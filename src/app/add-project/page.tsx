import { AddProjectForm } from "./add-project-form";

export default function AddProjectPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Add New Project</h2>
      <AddProjectForm />
    </div>
  );
}
