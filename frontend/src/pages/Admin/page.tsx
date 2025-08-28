import { ConfigForm } from './_impl/ConfigForm';

export default function AdminPage() {
  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
      <ConfigForm />
    </div>
  );
}
