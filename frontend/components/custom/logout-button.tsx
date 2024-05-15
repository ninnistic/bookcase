import { LogOut } from "lucide-react";

import { logoutAction } from "@/app/actions/auth-actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit">
        <LogOut className="w-6 h-6 hover:text-primary" />
      </button>
    </form>
  );
}
