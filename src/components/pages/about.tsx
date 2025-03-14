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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-medium text-xl flex items-center">
              <Brain className="h-6 w-6 mr-2 text-blue-600" />
              <span className="bg-gradient