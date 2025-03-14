import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-medium text-xl flex items-center">
              <Brain className="h-6 w-6 mr-2 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                AIDA
              </span>
              <span className="ml-1">Medical</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Specialties
            </Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Security
            </Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-md w-full px-4">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AIDA
              </span>{" "}
              Medical
            </h2>
            <p className="text-lg font-medium text-gray-500 mt-2">
              Sign in to access your medical AI assistant
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
