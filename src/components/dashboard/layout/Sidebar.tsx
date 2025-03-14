import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  HeartPulse,
  Brain,
  Microscope,
  FileText,
  Activity,
  Stethoscope,
  Shield,
  CalendarClock,
  MessageSquareText,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MasterUserModal from "../MasterUserModal";

type UserRole = "doctor" | "specialist" | "admin" | "master";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  roles?: UserRole[];
}

interface SidebarProps {
  userRole?: UserRole;
}

const Sidebar = ({ userRole = "doctor" }: SidebarProps) => {
  const location = useLocation();
  const [showMasterModal, setShowMasterModal] = useState(false);

  const mainNavItems: NavItem[] = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <Users size={20} />,
      label: "Patients",
      path: "/dashboard/patients",
    },
    {
      icon: <MessageSquareText size={20} />,
      label: "AI Consultation",
      path: "/dashboard/consultation",
    },
    {
      icon: <CalendarClock size={20} />,
      label: "Appointments",
      path: "/dashboard/appointments",
    },
    {
      icon: <FileText size={20} />,
      label: "Medical Records",
      path: "/dashboard/records",
      roles: ["doctor", "specialist", "admin", "master"],
    },
  ];

  const specialistNavItems: NavItem[] = [
    {
      icon: <HeartPulse size={20} />,
      label: "Cardiology AI",
      path: "/dashboard/specialists/cardiology",
      roles: ["specialist", "admin", "master"],
    },
    {
      icon: <Brain size={20} />,
      label: "Neurology AI",
      path: "/dashboard/specialists/neurology",
      roles: ["specialist", "admin", "master"],
    },
    {
      icon: <Microscope size={20} />,
      label: "Radiology AI",
      path: "/dashboard/specialists/radiology",
      roles: ["specialist", "admin", "master"],
    },
    {
      icon: <Stethoscope size={20} />,
      label: "General Medicine",
      path: "/dashboard/specialists/general",
      roles: ["specialist", "admin", "master"],
    },
  ];

  const adminNavItems: NavItem[] = [
    {
      icon: <Activity size={20} />,
      label: "System Status",
      path: "/dashboard/admin/status",
      roles: ["admin", "master"],
    },
    {
      icon: <Database size={20} />,
      label: "EHR Integration",
      path: "/dashboard/admin/ehr",
      roles: ["admin", "master"],
    },
    {
      icon: <Shield size={20} />,
      label: "Security & Compliance",
      path: "/dashboard/admin/security",
      roles: ["admin", "master"],
    },
    {
      icon: <Shield size={20} />,
      label: "Master User System",
      path: "/dashboard/master",
      roles: ["master"],
    },
  ];

  const bottomItems: NavItem[] = [
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/dashboard/settings",
    },
    {
      icon: <HelpCircle size={20} />,
      label: "Help & Support",
      path: "/dashboard/help",
    },
  ];

  // Filter items based on user role
  const filteredSpecialistItems = specialistNavItems.filter(
    (item) => !item.roles || item.roles.includes(userRole),
  );

  const filteredAdminItems = adminNavItems.filter(
    (item) => !item.roles || item.roles.includes(userRole),
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-[280px] h-full bg-white/80 backdrop-blur-md border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 flex items-center">
          <Brain className="h-5 w-5 mr-2 text-blue-600" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AIDA
          </span>
          <span className="ml-1">Medical</span>
        </h2>
        <p className="text-sm text-gray-500">AI-powered medical assistant</p>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1.5">
          {mainNavItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium",
                isActive(item.path)
                  ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <Link to={item.path}>
                <span
                  className={
                    isActive(item.path) ? "text-blue-600" : "text-gray-500"
                  }
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </Button>
          ))}
        </div>

        {filteredSpecialistItems.length > 0 && (
          <>
            <Separator className="my-4 bg-gray-100" />
            <h3 className="text-xs font-medium px-4 py-1 text-gray-500 uppercase tracking-wider mb-2">
              Specialist AI Agents
            </h3>
            <div className="space-y-1.5">
              {filteredSpecialistItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  asChild
                  className={cn(
                    "w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium",
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <Link to={item.path}>
                    <span
                      className={
                        isActive(item.path) ? "text-blue-600" : "text-gray-500"
                      }
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </>
        )}

        {filteredAdminItems.length > 0 && (
          <>
            <Separator className="my-4 bg-gray-100" />
            <h3 className="text-xs font-medium px-4 py-1 text-gray-500 uppercase tracking-wider mb-2">
              Administration
            </h3>
            <div className="space-y-1.5">
              {filteredAdminItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  asChild
                  className={cn(
                    "w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium",
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <Link to={item.path}>
                    <span
                      className={
                        isActive(item.path) ? "text-blue-600" : "text-gray-500"
                      }
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </>
        )}

        {userRole === "master" && (
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 h-10 rounded-xl text-sm font-medium border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => setShowMasterModal(true)}
            >
              <Shield className="h-4 w-4" />
              Master System Controls
            </Button>
          </div>
        )}
      </ScrollArea>

      <div className="p-4 mt-auto border-t border-gray-200">
        {bottomItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            asChild
            className="w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 mb-1.5"
          >
            <Link to={item.path}>
              <span className="text-gray-500">{item.icon}</span>
              {item.label}
            </Link>
          </Button>
        ))}
      </div>

      <MasterUserModal defaultOpen={showMasterModal} />
    </div>
  );
};

export default Sidebar;
