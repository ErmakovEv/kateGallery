import { AdminNavbar } from '../shared/ui/AdminNavbar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-container min-h-screen">
      <AdminNavbar />
      {children}
    </main>
  );
}
