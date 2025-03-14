import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bell,
  Home,
  Search,
  Settings,
  User,
  Brain,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../supabase/auth";
import { Tables } from "@/types/supabase";
import { Badge } from "@/components/ui/badge";

interface TopNavigationProps {
  onSearch?: (query: string) => void;
  userProfile?: Tables<"user_profiles"> | null;
  notifications?: Array<{ id: string; title: string; type?: string }>;
}

const TopNavigation = ({
  onSearch = () => {},
  userProfile,
  notifications = [
    { id: "1", title: "New patient record uploaded", type: "record" },
    {
      id: "2",
      title: "Appointment reminder: Dr. Johnson at 2:00 PM",
      type: "appointment",
    },
    { id: "3", title: "AI analysis complete for patient #12345", type: "ai" },
  ],
}: TopNavigationProps) => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const userRole = userProfile?.role || "doctor";
  const fullName =
    userProfile?.full_name || user.email?.split("@")[0] || "User";

  // Get notification icon based on type
  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case "ai":
        return <Brain className="h-3 w-3 mr-1.5 text-blue-500" />;
      case "appointment":
        return <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5" />;
      case "record":
        return <div className="h-2 w-2 rounded-full bg-purple-500 mr-1.5" />;
      default:
        return <div className="h-2 w-2 rounded-full bg-gray-500 mr-1.5" />;
    }
  };

  return (
    <div className="w-full h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 fixed top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <Link
          to="/"
          className="text-gray-900 hover:text-blue-600 transition-colors"
        >
          <Home className="h-5 w-5" />
        </Link>
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search patients..."
            className="pl-9 h-10 rounded-full bg-gray-100 border-0 text-sm focus:ring-2 focus:ring-blue-200 focus-visible:ring-blue-200 focus-visible:ring-offset-0"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {userRole && (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 font-medium"
          >
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            {userRole === "master" && (
              <Shield className="h-3 w-3 ml-1 text-red-500" />
            )}
          </Badge>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full h-9 w-9 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Bell className="h-4 w-4 text-gray-700" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium border border-white">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-xl overflow-hidden p-2 border border-gray-200 shadow-lg w-80"
                >
                  <DropdownMenuLabel className="text-sm font-medium text-gray-900 px-2">
                    Notifications
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="rounded-lg text-sm py-2 focus:bg-gray-100"
                    >
                      <div className="flex items-center">
                        {getNotificationIcon(notification.type)}
                        <span>{notification.title}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 hover:cursor-pointer rounded-full pl-2 pr-1 py-1 hover:bg-gray-100 transition-colors">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">{fullName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Avatar className="h-8 w-8 border-2 border-blue-100">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.email || ""}
                />
                <AvatarFallback className="bg-blue-100 text-blue-800">
                  {user.email?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-xl border-none shadow-lg"
          >
            <DropdownMenuLabel className="text-xs text-gray-500">
              {user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => signOut()}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigation;
