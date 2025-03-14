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
import {
  ChevronRight,
  Settings,
  User,
  Brain,
  Shield,
  Activity,
  FileText,
  Stethoscope,
  HeartPulse,
  Microscope,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";

export default function LandingPage() {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

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
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-blue-600"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 hover:cursor-pointer border-2 border-blue-100">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-800">
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
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
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-blue-600"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm px-4 shadow-md">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero section */}
        <section className="py-24 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h1 className="text-5xl font-bold tracking-tight mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    AI-Powered
                  </span>{" "}
                  Medical Assistant Network
                </h1>
                <h2 className="text-xl text-gray-600 mb-8 leading-relaxed">
                  AIDA integrates with clinical workflows to provide doctors
                  with intelligent support through a multi-agent system of
                  specialized AI assistants.
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-base font-medium shadow-lg">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button
                      variant="outline"
                      className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-6 text-base font-medium"
                    >
                      Schedule Demo
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex items-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  <span>HIPAA & GDPR Compliant</span>
                  <span className="mx-3">•</span>
                  <Activity className="h-4 w-4 mr-2 text-green-500" />
                  <span>EHR Integration</span>
                  <span className="mx-3">•</span>
                  <FileText className="h-4 w-4 mr-2 text-green-500" />
                  <span>Secure Data</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-400/20 rounded-full blur-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                  alt="Doctor using AI assistant"
                  className="rounded-2xl shadow-2xl w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Intelligent Medical Assistance
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Our multi-agent AI system provides specialized support across
              various medical fields, all coordinated by a central orchestrator.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-8 rounded-2xl shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Brain className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Central AI Orchestrator
                </h3>
                <p className="text-gray-600">
                  Coordinates between specialized AI agents to provide
                  comprehensive medical insights and recommendations.
                </p>
              </div>

              <div className="bg-blue-50 p-8 rounded-2xl shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <HeartPulse className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Specialized AI Agents
                </h3>
                <p className="text-gray-600">
                  Dedicated AI assistants for cardiology, neurology, radiology,
                  and other medical specialties.
                </p>
              </div>

              <div className="bg-blue-50 p-8 rounded-2xl shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Stethoscope className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Clinical Workflow Integration
                </h3>
                <p className="text-gray-600">
                  Seamlessly integrates with your existing EHR systems via FHIR
                  API for efficient access to patient data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Role-based access section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&q=80"
                  alt="Medical professionals collaborating"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="text-left">
                <h2 className="text-4xl font-bold tracking-tight mb-6">
                  Role-Based Access Control
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  AIDA provides tailored experiences for different medical
                  roles, ensuring each user has access to the tools they need.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Doctor Dashboard
                      </h3>
                      <p className="text-gray-600">
                        Access patient lists, initiate AI consultations, and
                        review AI-generated insights.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Microscope className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Specialist Dashboard
                      </h3>
                      <p className="text-gray-600">
                        Focused interfaces for specialists with domain-specific
                        AI tools and visualizations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Settings className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Master User System
                      </h3>
                      <p className="text-gray-600">
                        Unrestricted navigation and system-wide data
                        interventions for administrators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              AIDA is built with security and compliance at its core, ensuring
              your medical data remains protected.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-800/50 p-8 rounded-2xl text-left hover:bg-blue-800/70 transition-colors">
                <div className="flex items-center mb-6">
                  <Shield className="h-8 w-8 text-blue-300 mr-4" />
                  <h3 className="text-2xl font-semibold">
                    HIPAA & GDPR Compliant
                  </h3>
                </div>
                <p className="text-blue-100">
                  End-to-end encryption and role-based access control ensure
                  compliance with healthcare regulations.
                </p>
              </div>

              <div className="bg-blue-800/50 p-8 rounded-2xl text-left hover:bg-blue-800/70 transition-colors">
                <div className="flex items-center mb-6">
                  <Activity className="h-8 w-8 text-blue-300 mr-4" />
                  <h3 className="text-2xl font-semibold">Audit Logging</h3>
                </div>
                <p className="text-blue-100">
                  Comprehensive logging of all user actions and system events
                  for security and compliance purposes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-white">
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Ready to Transform Your Clinical Workflow?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of medical professionals already using AIDA to
              enhance patient care.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-base font-medium shadow-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-6 text-base font-medium"
                >
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 text-sm text-gray-600">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="border-b border-gray-200 pb-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-blue-600" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  AIDA
                </span>
                <span className="ml-1 text-gray-900">Medical</span>
              </h4>
              <p className="text-gray-500 mb-4">
                AI-powered medical assistant network for healthcare
                professionals.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Specialties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    HIPAA Compliance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    GDPR Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-6 flex flex-col md:flex-row justify-between items-center">
            <p>© 2024 AIDA Medical. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <select className="bg-transparent border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option>English (US)</option>
                <option>Español</option>
                <option>Français</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
