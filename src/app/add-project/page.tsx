import { AddProjectForm } from "./add-project-form";

export default function AddProjectPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Add New Project</h2>
        <p className="text-muted-foreground">
          Enter the details for the new project.
        </p>
      </header>
      <AddProjectForm />
    </div>
  );
}
