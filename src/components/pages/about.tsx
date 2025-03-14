import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Twitter,
  Github,
  ArrowRight,
  Users,
  Award,
  BookOpen,
  HeartPulse,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-medium text-xl flex items-center">
              <Brain className="h-6 w-6 mr-2 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AIDA Medical
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              to="/features"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Features
            </Link>
            <Link
              to="/specialties"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Specialties
            </Link>
            <Link
              to="/security"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Security
            </Link>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About AIDA Medical
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            Revolutionizing healthcare with AI-powered medical assistants that
            enhance clinical decision-making and improve patient outcomes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To empower healthcare professionals with cutting-edge AI
                technology that enhances clinical decision-making, reduces
                administrative burden, and improves patient outcomes across all
                medical specialties.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                A healthcare ecosystem where AI seamlessly integrates with
                clinical workflows, providing real-time insights and support to
                medical professionals while maintaining the highest standards of
                privacy and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                Medical Experts
              </h3>
              <p className="text-gray-600 text-center">
                Our team includes physicians, specialists, and healthcare
                professionals who ensure our AI solutions are clinically
                relevant and accurate.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                AI Researchers
              </h3>
              <p className="text-gray-600 text-center">
                Leading AI scientists and researchers who develop and refine our
                advanced machine learning models for healthcare applications.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                <HeartPulse className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                Healthcare Technologists
              </h3>
              <p className="text-gray-600 text-center">
                Experienced engineers and developers who build secure,
                compliant, and user-friendly healthcare technology solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                Have questions about AIDA Medical or want to learn more about
                our AI solutions? Reach out to our team.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <span>contact@aida-medical.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <span>123 AI Boulevard, San Francisco, CA 94103</span>
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Request a Demo</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    className="min-h-[120px]"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 mr-2 text-blue-400" />
                <span className="font-medium text-xl">AIDA Medical</span>
              </div>
              <p className="text-gray-400 max-w-md">
                AI-powered medical assistant network enhancing clinical
                decision-making and improving patient outcomes.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className="text-gray-400 hover:text-white"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/features"
                      className="text-gray-400 hover:text-white"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/specialties"
                      className="text-gray-400 hover:text-white"
                    >
                      Specialties
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      API
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center md:text-left">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} AIDA Medical. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
