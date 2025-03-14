import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import MasterUserModal from "../MasterUserModal";
import { Link } from "react-router-dom";

interface MasterUserBannerProps {
  userName?: string;
}

export default function MasterUserBanner({
  userName = "Administrator",
}: MasterUserBannerProps) {
  const [showBanner, setShowBanner] = useState(true);
  const [showModal, setShowModal] = useState(false);

  if (!showBanner) return null;

  return (
    <>
      <Alert className="bg-red-50 border-red-200 text-red-800 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            <AlertDescription className="text-sm font-medium">
              Master User Mode Active - Welcome, {userName}. You have
              unrestricted system access.
            </AlertDescription>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard/master">
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700"
              >
                Master User System
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700"
              onClick={() => setShowModal(true)}
            >
              System Controls
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-red-600 hover:bg-red-100 hover:text-red-700"
              onClick={() => setShowBanner(false)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      </Alert>

      <MasterUserModal defaultOpen={showModal} />
    </>
  );
}
