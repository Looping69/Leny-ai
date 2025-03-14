import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Shield, Search, UserCheck, AlertTriangle } from "lucide-react";
import { supabase } from "../../../supabase/supabase";
import { Tables } from "@/types/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type UserRole = "doctor" | "specialist" | "admin" | "master";

interface UserRoleManagerProps {
  currentUserRole?: UserRole;
}

export default function UserRoleManager({
  currentUserRole = "master",
}: UserRoleManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<Tables<"user_profiles">[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Tables<"user_profiles">[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.id.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === activeTab));
    }
  }, [activeTab, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error fetching users",
        description: "There was a problem loading the user list.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      // Update local state
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user,
        ),
      );

      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}`,
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      toast({
        title: "Error updating role",
        description: "There was a problem updating the user role.",
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "master":
        return "bg-red-50 text-red-700 border-red-200";
      case "admin":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "specialist":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "doctor":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              User Role Management
            </CardTitle>
            <CardDescription>
              Manage user roles and access privileges
            </CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-lg border-gray-200 w-full"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-4"
        >
          <TabsList className="bg-gray-100 p-1 rounded-lg">
            <TabsTrigger
              value="all"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              All Users
            </TabsTrigger>
            <TabsTrigger
              value="master"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Master
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Admin
            </TabsTrigger>
            <TabsTrigger
              value="specialist"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Specialist
            </TabsTrigger>
            <TabsTrigger
              value="doctor"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Doctor
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-gray-500">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <UserCheck className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-lg font-medium text-gray-900 mb-1">
              No users found
            </p>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    User
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    ID
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Current Role
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Specialty
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                          {user.full_name?.[0] || "U"}
                        </div>
                        <span className="font-medium text-gray-900">
                          {user.full_name || "Unnamed User"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      <span className="font-mono">{user.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={`${getRoleBadgeColor(user.role as UserRole)} capitalize`}
                      >
                        {user.role}
                        {user.role === "master" && (
                          <Shield className="h-3 w-3 ml-1 text-red-500" />
                        )}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {user.specialty || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        {currentUserRole === "master" && (
                          <>
                            {user.role !== "master" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                onClick={() =>
                                  handleRoleChange(user.id, "master")
                                }
                              >
                                Promote to Master
                              </Button>
                            )}
                            {user.role === "master" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-gray-200 text-gray-600 hover:bg-gray-50"
                                onClick={() =>
                                  handleRoleChange(user.id, "admin")
                                }
                              >
                                Demote to Admin
                              </Button>
                            )}
                            {user.role !== "admin" &&
                              user.role !== "master" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-purple-200 text-purple-600 hover:bg-purple-50"
                                  onClick={() =>
                                    handleRoleChange(user.id, "admin")
                                  }
                                >
                                  Make Admin
                                </Button>
                              )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                Master User Privileges
              </h4>
              <p className="text-xs text-gray-500">
                Master users have unrestricted access to all system data and
                functionality. Assign this role with caution and only to trusted
                administrators. All actions performed by master users are logged
                for security audit purposes.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
