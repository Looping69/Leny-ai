import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Brain,
  Users,
  FileText,
  Calendar,
  Settings,
  HelpCircle,
  Phone,
  Shield,
} from "lucide-react";

interface SidebarProps {
  userRole: string;
}

export default function Sidebar({ userRole }: SidebarProps) {
  const location = useLocation();
  const isMasterUser = userRole === "master";

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      name: "AI Consultation",
      path: "/dashboard/consultation",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      name: "Patients",
      path: "/dashboard/patients",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Medical Records",
      path: "/dashboard/records",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: <Calendar className="h-5 w-5" />,
      subItems: [
        {
          name: "Follow-Up Calls",
          path: "/dashboard/appointments/follow-up",
          icon: <Phone className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Help & Support",
      path: "/dashboard/help",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  // Add Master User System link for master users only
  if (isMasterUser) {
    menuItems.push({
      name: "Master User System",
      path: "/dashboard/master",
      icon: <Shield className="h-5 w-5 text-red-500" />,
    });
  }

  const isActive = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/dashboard";
  };

  const isSubItemActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${isActive(item.path) ? "bg-blue-50 text-blue-700" : "text-gray-900"}`}
              >
                <span
                  className={`${isActive(item.path) ? "text-blue-600" : "text-gray-500"}`}
                >
                  {item.icon}
                </span>
                <span className="ml-3">{item.name}</span>
              </Link>
              {item.subItems &&
                item.subItems.length > 0 &&
                isActive(item.path) && (
                  <ul className="pl-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.path}>
                        <Link
                          to={subItem.path}
                          className={`flex items-center p-2 text-sm font-normal rounded-lg hover:bg-gray-100 ${isSubItemActive(subItem.path) ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
                        >
                          <span
                            className={`${isSubItemActive(subItem.path) ? "text-blue-600" : "text-gray-500"}`}
                          >
                            {subItem.icon}
                          </span>
                          <span className="ml-3">{subItem.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
