"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/hooks/useSession";
import { useToken } from "@/hooks/useToken";
import { getInitialsName } from "@/utils/get-initials";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UserMenu() {
  const router = useRouter();
  const { user } = useSession();
  const { removeToken } = useToken();
  if (!user) {
    return null;
  }
  const handleSignOut = () => {
    removeToken();
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    toast.success("Logout realizado com sucesso!");
    router.push("/login");
  };
  const initials = getInitialsName(user.name);
  return (
    <div className="fixed top-6 left-18 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Avatar className="h-14 w-14 border-2">
              <AvatarImage alt={user.name || ""} />
              <AvatarFallback className="text-primary bg-secondary">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-56 rounded-lg p-4"
          sideOffset={4}
        >
          <div className="mb-3 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage alt={user.name || ""} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-base">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
          <DropdownMenuItem className="gap-3 px-0 py-2" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 text-muted-foreground" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
