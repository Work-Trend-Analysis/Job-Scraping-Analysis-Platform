import { Button } from "./ui/button";
import { User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Header({ onProfileClick, onAuthClick, isAuthenticated, user, onLogout }) {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-linear-to-r  from-blue-900 to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <h1 className="text-xl font-bold">CareerLens</h1>
          </div>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <Button
              variant="outline"
              className="bg-white border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white shadow-md transform transition-all hover:scale-105 hover:shadow-lg"
              onClick={onAuthClick}
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">
                    Welcome, {user?.fullName || user?.username || "User"}
                  </span>
                  <Avatar className="w-12 h-12 shadow-lg transform transition-all hover:scale-110 hover:shadow-xl">
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback className="bg-linear-to-br from-blue-900 to-blue-700 text-white">
                      {user?.fullName?.[0] || user?.username?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onProfileClick}>
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
