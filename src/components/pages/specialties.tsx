import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Brain,
  HeartPulse,
  Microscope,
  Stethoscope,
  Activity,
  Pill,
  Baby,
  Eye,
  Bone,
  ArrowRight,
} from "lucide-react";

export default function SpecialtiesPage() {
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
            <Link to="/specialties" className="text-blue-600 transition-colors">
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
                Medical
              </span>{" "}
              Specialties
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AIDA provides specialized AI assistance across a wide range of
              medical fields, each tailored to the unique needs of different
              specialties.
            </p>
          </div>
        </section>

        {/* Primary Specialties */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Primary Specialties
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Our core AI agents are specialized in these key medical fields,
              providing expert-level assistance to healthcare professionals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cardiology */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-left">
                <div className="h-14 w-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <HeartPulse className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Cardiology</h3>
                <p className="text-gray-600 mb-4">
                  Our Cardiology AI specializes in heart conditions, ECG
                  analysis, and cardiovascular treatment recommendations.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                    <span className="text-sm">ECG interpretation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                    <span className="text-sm">Hypertension management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                    <span className="text-sm">Heart failure treatment</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-between border-red-200 text-red-600 hover:bg-red-50"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Neurology */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-left">
                <div className="h-14 w-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Brain className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Neurology</h3>
                <p className="text-gray-600 mb-4">
                  Our Neurology AI focuses on neurological disorders, brain
                  imaging analysis, and cognitive assessments.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <span className="text-sm">MRI/CT scan analysis</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <span className="text-sm">Seizure management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <span className="text-sm">Stroke assessment</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-between border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Radiology */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-left">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Microscope className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Radiology</h3>
                <p className="text-gray-600 mb-4">
                  Our Radiology AI analyzes X-rays, MRIs, CT scans and other
                  medical images to assist in diagnosis.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    <span className="text-sm">X-ray interpretation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    <span className="text-sm">Tumor detection</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    <span className="text-sm">Fracture analysis</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-between border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Specialties */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Additional Specialties
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                AIDA's AI network extends to many other medical specialties,
                providing comprehensive support across healthcare disciplines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* General Medicine */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">General Medicine</h3>
                    <p className="text-sm text-gray-500">
                      Primary care support
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Provides general medical advice, preventive care
                  recommendations, and initial assessments for a wide range of
                  conditions.
                </p>
              </div>

              {/* Pulmonology */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Pulmonology</h3>
                    <p className="text-sm text-gray-500">Respiratory care</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Specializes in respiratory conditions, lung function analysis,
                  and treatment of conditions like asthma, COPD, and pneumonia.
                </p>
              </div>

              {/* Gastroenterology */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Gastroenterology</h3>
                    <p className="text-sm text-gray-500">Digestive health</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Focuses on digestive disorders, endoscopy result
                  interpretation, and management of conditions like IBS, GERD,
                  and Crohn's disease.
                </p>
              </div>

              {/* Dermatology */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Microscope className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Dermatology</h3>
                    <p className="text-sm text-gray-500">Skin conditions</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Analyzes skin conditions, lesions, and rashes to assist in
                  dermatological diagnosis and treatment recommendations.
                </p>
              </div>

              {/* Psychiatry */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Psychiatry</h3>
                    <p className="text-sm text-gray-500">Mental health</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Assists with mental health assessments, treatment
                  recommendations, and therapy guidance for various psychiatric
                  conditions.
                </p>
              </div>

              {/* Endocrinology */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Endocrinology</h3>
                    <p className="text-sm text-gray-500">Hormone disorders</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Specializes in hormonal conditions like diabetes, thyroid
                  disorders, and metabolic diseases with personalized treatment
                  plans.
                </p>
              </div>

              {/* Pediatrics */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Baby className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Pediatrics</h3>
                    <p className="text-sm text-gray-500">
                      Child & adolescent health
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Focuses on the health and development of children and
                  adolescents, with age-appropriate diagnostic and treatment
                  recommendations.
                </p>
              </div>

              {/* Ophthalmology */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Eye className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Ophthalmology</h3>
                    <p className="text-sm text-gray-500">Eye care</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Specializes in eye conditions, vision assessment, and
                  treatment recommendations for disorders like glaucoma and
                  cataracts.
                </p>
              </div>

              {/* Orthopedics */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Bone className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Orthopedics</h3>
                    <p className="text-sm text-gray-500">
                      Musculoskeletal care
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Focuses on bone and joint conditions, fracture analysis, and
                  treatment plans for musculoskeletal disorders and injuries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              How Our Specialty AI Agents Work
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              AIDA's specialized AI agents work together to provide
              comprehensive medical insights and recommendations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Specialized Knowledge
                </h3>
                <p className="text-gray-600">
                  Each AI agent is trained on specialty-specific medical
                  literature, clinical guidelines, and best practices to provide
                  expert-level insights.
                </p>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Collaborative Analysis
                </h3>
                <p className="text-gray-600">
                  Multiple AI agents work together on complex cases, each
                  contributing their specialty expertise to reach a
                  comprehensive diagnosis and treatment plan.
                </p>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Pill className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Evidence-Based Recommendations
                </h3>
                <p className="text-gray-600">
                  All AI recommendations are based on the latest medical
                  evidence, with citations and confidence levels to support
                  clinical decision-making.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Access All Specialty AI Agents
            </h2>
            <p className="text-xl mb-8">
              Upgrade to our Premium plan to unlock unlimited access to all
              specialty AI agents and advanced collaboration features.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button className="rounded-full bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-base font-medium shadow-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/features">
                <Button
                  variant="outline"
                  className="rounded-full border-white text-white hover:bg-blue-700 px-8 py-6 text-base font-medium"
                >
                  View Pricing
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
