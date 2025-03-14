import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Shield,
  Lock,
  FileText,
  CheckCircle,
  Database,
  Key,
  UserCheck,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function SecurityPage() {
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
            <Link
              to="/features"
              className="hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              to="/specialties"
              className="hover:text-blue-600 transition-colors"
            >
              Specialties
            </Link>
            <Link to="/security" className="text-blue-600 transition-colors">
              Security
            </Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero section */}
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Enterprise-Grade
              </span>{" "}
              Security
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AIDA is built with security and compliance at its core, ensuring
              your medical data remains protected at all times.
            </p>
          </div>
        </section>

        {/* Security Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-3xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
                    alt="Security Overview"
                    className="rounded-2xl shadow-2xl w-full object-cover"
                  />
                </div>
              </div>
              <div className="text-left">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Security By Design
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  AIDA's security architecture is designed from the ground up to
                  protect sensitive medical data while ensuring compliance with
                  healthcare regulations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Lock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        End-to-End Encryption
                      </h3>
                      <p className="text-gray-600">
                        All data is encrypted in transit and at rest using
                        industry-standard AES-256 encryption.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <UserCheck className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Role-Based Access Control
                      </h3>
                      <p className="text-gray-600">
                        Granular access controls ensure users can only access
                        the data and features they need for their specific role.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Comprehensive Audit Logging
                      </h3>
                      <p className="text-gray-600">
                        Every action within the system is logged for security
                        and compliance purposes, with tamper-proof audit trails.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Regulatory Compliance
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              AIDA is fully compliant with healthcare regulations and data
              protection standards worldwide.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* HIPAA Compliance */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-left">
                <div className="flex items-center mb-6">
                  <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                    <Shield className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold">HIPAA Compliance</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  AIDA is fully compliant with the Health Insurance Portability
                  and Accountability Act (HIPAA), ensuring the protection of
                  sensitive patient health information.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      Business Associate Agreements
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Privacy Rule Compliance</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      Security Rule Implementation
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      Breach Notification Procedures
                    </p>
                  </div>
                </div>
              </div>

              {/* GDPR Compliance */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-left">
                <div className="flex items-center mb-6">
                  <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                    <FileText className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold">GDPR Compliance</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  AIDA adheres to the General Data Protection Regulation (GDPR),
                  respecting the privacy rights of individuals in the European
                  Union and worldwide.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      Data Subject Rights Management
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Lawful Basis for Processing</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      Data Protection Impact Assessments
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      Data Minimization Principles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Key Security Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                AIDA implements multiple layers of security to protect your data
                and ensure compliance with healthcare regulations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Data Encryption */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Lock className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Data Encryption</h3>
                <p className="text-gray-600">
                  All sensitive data is encrypted using AES-256 encryption both
                  in transit and at rest, ensuring that patient information
                  remains secure at all times.
                </p>
              </div>

              {/* Access Controls */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <UserCheck className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Access Controls</h3>
                <p className="text-gray-600">
                  Role-based access control ensures that users can only access
                  the data and features they need for their specific role,
                  minimizing the risk of unauthorized access.
                </p>
              </div>

              {/* Audit Logging */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Clock className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Audit Logging</h3>
                <p className="text-gray-600">
                  Comprehensive logging of all user actions and system events
                  for security monitoring, compliance reporting, and forensic
                  analysis if needed.
                </p>
              </div>

              {/* Secure Infrastructure */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Database className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Secure Infrastructure
                </h3>
                <p className="text-gray-600">
                  Hosted on SOC 2 compliant cloud infrastructure with regular
                  security assessments, penetration testing, and vulnerability
                  scanning.
                </p>
              </div>

              {/* Authentication */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Key className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Multi-Factor Authentication
                </h3>
                <p className="text-gray-600">
                  Strong authentication mechanisms including multi-factor
                  authentication to verify user identities and prevent
                  unauthorized access to accounts.
                </p>
              </div>

              {/* Incident Response */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Incident Response
                </h3>
                <p className="text-gray-600">
                  Comprehensive incident response plan with 24/7 monitoring,
                  automated threat detection, and rapid response procedures to
                  address security incidents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Master User System */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left md:order-1 order-2">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Master User System
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our Master User System provides a secure way to manage
                  system-wide access and perform administrative interventions
                  when necessary.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <UserCheck className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Privileged Access Management
                      </h3>
                      <p className="text-gray-600">
                        Strict controls on master user privileges with enhanced
                        authentication requirements and session monitoring.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Clock className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Enhanced Audit Logging
                      </h3>
                      <p className="text-gray-600">
                        Detailed logging of all master user actions with
                        tamper-proof records for accountability and compliance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Emergency Access Protocols
                      </h3>
                      <p className="text-gray-600">
                        Secure procedures for emergency access with mandatory
                        documentation and approval workflows.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:order-2 order-1">
                <div className="relative">
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-400/20 rounded-full blur-3xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                    alt="Master User System"
                    className="rounded-2xl shadow-2xl w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Certifications */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Security Certifications & Compliance
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              AIDA maintains the highest standards of security and compliance,
              validated by independent third-party audits and certifications.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="p-6 bg-gray-50 rounded-xl flex flex-col items-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">HIPAA</h3>
                <p className="text-sm text-gray-600">Compliant</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl flex flex-col items-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">GDPR</h3>
                <p className="text-sm text-gray-600">Compliant</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl flex flex-col items-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">SOC 2 Type II</h3>
                <p className="text-sm text-gray-600">Certified</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl flex flex-col items-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">ISO 27001</h3>
                <p className="text-sm text-gray-600">Certified</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Ready for Secure Medical AI?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of healthcare providers who trust AIDA with their
              sensitive medical data.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button className="rounded-full bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-base font-medium shadow-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="rounded-full border-white text-white hover:bg-blue-700 px-8 py-6 text-base font-medium"
                >
                  Request Security Whitepaper
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
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/features"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Specialties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/security"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-blue-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Contact
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
              </ul>
            </div>
          </div>
          <div className="py-6 flex flex-col md:flex-row justify-between items-center">
            <p>© 2024 AIDA Medical. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
