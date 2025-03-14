import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Brain,
  MessageSquareText,
  Database,
  Zap,
  ArrowRight,
  HeartPulse,
  Microscope,
  Stethoscope,
  Activity,
  FileText,
} from "lucide-react";

export default function FeaturesPage() {
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
            <Link to="/features" className="text-blue-600 transition-colors">
              Features
            </Link>
            <Link
              to="/specialties"
              className="hover:text-blue-600 transition-colors"
            >
              Specialties
            </Link>
            <Link
              to="/security"
              className="hover:text-blue-600 transition-colors"
            >
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
                Revolutionary
              </span>{" "}
              Features
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AIDA combines cutting-edge AI technology with medical expertise to
              provide an unparalleled assistant for healthcare professionals.
            </p>
          </div>
        </section>

        {/* Multi-Agent AI System */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-3xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80"
                    alt="Multi-Agent AI System"
                    className="rounded-2xl shadow-2xl w-full object-cover"
                  />
                </div>
              </div>
              <div className="text-left">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Multi-Agent AI System
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our revolutionary multi-agent system combines specialized AI
                  experts in various medical fields, all coordinated by a
                  central orchestrator to provide comprehensive insights.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Brain className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Central AI Orchestrator
                      </h3>
                      <p className="text-gray-600">
                        Coordinates between specialized AI agents to provide
                        comprehensive medical insights and recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <HeartPulse className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Specialized AI Agents
                      </h3>
                      <p className="text-gray-600">
                        Dedicated AI assistants for cardiology, neurology,
                        radiology, and other medical specialties.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Activity className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Consensus Analysis
                      </h3>
                      <p className="text-gray-600">
                        AI agents collaborate to reach a consensus, providing
                        confidence levels and comprehensive reasoning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Workspace */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left md:order-1 order-2">
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <MessageSquareText className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Advanced Consultation Workspace
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  A powerful workspace designed for healthcare professionals to
                  interact with AI agents, upload medical data, and receive
                  comprehensive analysis.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <FileText className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Symptom Analysis
                      </h3>
                      <p className="text-gray-600">
                        Input patient symptoms and receive AI-powered
                        differential diagnoses and treatment recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Microscope className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Medical Image Analysis
                      </h3>
                      <p className="text-gray-600">
                        Upload and analyze medical images with AI assistance for
                        faster and more accurate interpretations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Stethoscope className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Treatment Recommendations
                      </h3>
                      <p className="text-gray-600">
                        Receive evidence-based treatment options tailored to
                        your patient's specific condition and medical history.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:order-2 order-1">
                <div className="relative">
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-3xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                    alt="Consultation Workspace"
                    className="rounded-2xl shadow-2xl w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EHR Integration */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-400/20 rounded-full blur-3xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                    alt="EHR Integration"
                    className="rounded-2xl shadow-2xl w-full object-cover"
                  />
                </div>
              </div>
              <div className="text-left">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Seamless EHR Integration
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  AIDA integrates with your existing Electronic Health Record
                  systems via FHIR API for efficient access to patient data.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Database className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        FHIR API Integration
                      </h3>
                      <p className="text-gray-600">
                        Connect with all major EHR systems using the industry
                        standard FHIR API for secure data exchange.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Activity className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Real-time Synchronization
                      </h3>
                      <p className="text-gray-600">
                        Keep patient records up-to-date with bidirectional
                        synchronization between AIDA and your EHR system.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Comprehensive Patient Records
                      </h3>
                      <p className="text-gray-600">
                        Access complete patient histories, lab results, and
                        previous treatments to inform AI-assisted diagnoses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Flexible Subscription Plans
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Choose the plan that fits your practice's needs, from individual
              practitioners to large healthcare organizations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <h3 className="text-2xl font-semibold mb-2">Free Plan</h3>
                <p className="text-gray-500 mb-4">
                  Basic access for individuals
                </p>
                <div className="text-4xl font-bold mb-6">$0</div>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Access to Central AI Orchestrator</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Up to 3 specialist AI agents</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Basic patient management</span>
                  </li>
                </ul>
                <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </div>

              {/* Premium Plan */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 relative transform scale-105">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-semibold mb-2">Premium Plan</h3>
                <p className="text-gray-500 mb-4">For medical practices</p>
                <div className="text-4xl font-bold mb-6">$49</div>
                <p className="text-sm text-gray-500 mb-6">per month</p>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Everything in Free plan</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>
                      <strong>Unlimited</strong> specialist AI agents
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Advanced AI collaboration features</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                  Subscribe Now
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
                <p className="text-gray-500 mb-4">
                  For healthcare organizations
                </p>
                <div className="text-4xl font-bold mb-6">Custom</div>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Everything in Premium plan</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Custom AI model training</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Custom EHR integrations</span>
                  </li>
                </ul>
                <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Ready to Transform Your Clinical Workflow?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of medical professionals already using AIDA to
              enhance patient care.
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
