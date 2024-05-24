import { LogoutButton } from "@/components/custom/logout-button";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  );
}
