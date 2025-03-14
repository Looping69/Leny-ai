# AIDA Medical Assistant Network

## Overview

AIDA is an AI-powered medical assistant network that integrates with clinical workflows to provide doctors with intelligent support through a multi-agent system of specialized AI assistants coordinated by a central orchestrator.

## Key Features

- **Secure Authentication System**: Role-based login with HIPAA/GDPR compliant security measures
- **Multi-Agent AI System**: Specialized AI agents in cardiology, neurology, radiology, and other medical fields, all coordinated by a Central AI Orchestrator
- **Agent Selection Panel**: Interactive grid of specialty AI agents with visual indicators for free vs. premium access
- **Consultation Workspace**: Central area for patient data input, symptom analysis, and medical image upload with real-time AI analysis
- **Agent Collaboration View**: Visual representation showing how multiple AI agents collaborate on complex cases with consensus indicators
- **Subscription Management**: Stripe integration for upgrading from free (3 agents) to premium (full library)
- **Master User System**: Unrestricted navigation and a dedicated modal for system-wide data interventions
- **EHR Integration**: Seamless connection with electronic health record systems via FHIR API
- **HIPAA/GDPR Compliance**: End-to-end encryption and comprehensive audit logging
- **Appointment Follow-Up System**: AI-powered follow-up calls to check on patient recovery progress

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **AI Integration**: Google Gemini API, External AI providers via custom integrations
- **Deployment**: Docker, Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-org/aida-medical.git
   cd aida-medical
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## System Architecture

The application follows a modular architecture with the following key components:

- **Authentication Layer**: Handles user authentication and role-based access control
- **Dashboard**: Main interface for doctors to access patient data and AI consultations
- **AI Consultation System**: Core functionality for interacting with specialized AI agents
- **Master User System**: Administrative interface for system-wide interventions
- **Appointment Follow-Up**: System for scheduling and conducting AI-powered follow-up calls

## User Roles

- **Doctor**: Standard medical practitioner with access to AI consultations and patient data
- **Specialist**: Medical specialist with access to specialized AI agents and consultations
- **Admin**: System administrator with user management capabilities
- **Master User**: Unrestricted access to all system functions and data interventions

## License

This project is proprietary software. All rights reserved.

## Contact

For support or inquiries, please contact support@aida-medical.com
