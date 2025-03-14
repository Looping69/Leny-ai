# AIDA Medical Assistant Network - Wireframes

## Authentication Screens

### Login Screen
```
+----------------------------------+
|           AIDA Medical           |
|                                  |
|  +----------------------------+  |
|  |        Email Address       |  |
|  +----------------------------+  |
|                                  |
|  +----------------------------+  |
|  |         Password           |  |
|  +----------------------------+  |
|                                  |
|  [Forgot Password?]              |
|                                  |
|  +----------------------------+  |
|  |          Sign In           |  |
|  +----------------------------+  |
|                                  |
|  Don't have an account? Sign Up  |
|                                  |
+----------------------------------+
```

### Sign Up Screen
```
+----------------------------------+
|           AIDA Medical           |
|                                  |
|  +----------------------------+  |
|  |         Full Name          |  |
|  +----------------------------+  |
|                                  |
|  +----------------------------+  |
|  |        Email Address       |  |
|  +----------------------------+  |
|                                  |
|  +----------------------------+  |
|  |         Password           |  |
|  +----------------------------+  |
|                                  |
|  +----------------------------+  |
|  |     Confirm Password       |  |
|  +----------------------------+  |
|                                  |
|  +----------------------------+  |
|  |         Sign Up            |  |
|  +----------------------------+  |
|                                  |
|  Already have an account? Login  |
|                                  |
+----------------------------------+
```

## Dashboard Screens

### Main Dashboard
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      |                                               |
| AI Consultation|  Welcome, Dr. Smith                           |
| Patients       |                                               |
| Medical Records|  +-------------------+  +-------------------+ |
| Appointments   |  | Recent Patients   |  | AI Consultations  | |
| Settings       |  |                   |  |                   | |
| Help & Support |  | - Sarah Johnson   |  | - 3 Completed     | |
|                |  | - Michael Chen    |  | - 1 In Progress   | |
|                |  | - Emily Rodriguez |  |                   | |
|                |  |                   |  | [View All]        | |
|                |  | [View All]        |  |                   | |
|                |  +-------------------+  +-------------------+ |
|                |                                               |
|                |  +-------------------+  +-------------------+ |
|                |  | Upcoming          |  | Recent Activity   | |
|                |  | Appointments      |  |                   | |
|                |  |                   |  | - AI Consultation | |
|                |  | - Today (2)       |  | - Follow-up Call  | |
|                |  | - Tomorrow (3)    |  | - Patient Update  | |
|                |  |                   |  |                   | |
|                |  | [Schedule]        |  | [View All]        | |
|                |  +-------------------+  +-------------------+ |
+----------------+-----------------------------------------------+
```

### AI Consultation Page
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      | AI Consultation                [Upgrade to Premium] |
| AI Consultation|                                               |
| Patients       | [New Consultation] [History] [Scheduled]       |
| Medical Records|                                               |
| Appointments   | +-----------------------------------------------+
| Settings       | | Select AI Agents                              |
| Help & Support | |                                               |
|                | | [Central AI] [Cardiology] [Neurology]         |
|                | | [Radiology] [General]                         |
|                | |                                               |
|                | | Free: 3 agents   Premium: All agents          |
|                | |                                               |
|                | | [Continue to Consultation]                    |
|                | +-----------------------------------------------+
|                |                                               |
+----------------+-----------------------------------------------+
```

### Consultation Workspace
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      | AI Consultation > New                          |
| AI Consultation|                                               |
| Patients       | Patient: Sarah Johnson (P-1001) • 3 AI agents selected |
| Medical Records|                                               |
| Appointments   | [Free Text Query] [Symptoms] [Images] [Files]  |
| Settings       |                                               |
| Help & Support | +-----------------------------------------------+
|                | | What would you like to ask about this patient? |
|                | |                                               |
|                | | [Text area for query input]                   |
|                | |                                               |
|                | +-----------------------------------------------+
|                |                                               |
|                | [AI Consultation Tips]                         |
|                | - Be specific about symptoms, duration, severity|
|                | - Include relevant patient history             |
|                | - Mention recent changes in condition          |
|                |                                               |
|                | [Start Analysis]                               |
+----------------+-----------------------------------------------+
```

### Agent Collaboration View
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      | AI Consultation > Results                      |
| AI Consultation|                                               |
| Patients       | Patient: Sarah Johnson (P-1001)                |
| Medical Records| Query: Persistent headaches and elevated BP    |
| Appointments   |                                               |
| Settings       | Consensus Level: [===========] 85%             |
| Help & Support |                                               |
|                | +-------------------+  +-------------------+  |
|                | | Cardiology AI     |  | Neurology AI      |  |
|                | | Confidence: 90%   |  | Confidence: 85%   |  |
|                | |                   |  |                   |  |
|                | | Opinion: Likely   |  | Opinion: Possible |  |
|                | | hypertension...   |  | migraine...       |  |
|                | +-------------------+  +-------------------+  |
|                |                                               |
|                | +-------------------+  +-------------------+  |
|                | | General Medicine  |  | Central AI        |  |
|                | | Confidence: 80%   |  | Recommendation:   |  |
|                | |                   |  |                   |  |
|                | | Opinion: Consider |  | Based on all agent|  |
|                | | both causes...    |  | inputs, we...     |  |
|                | +-------------------+  +-------------------+  |
+----------------+-----------------------------------------------+
```

### Master User Modal
```
+------------------------------------------------------------------+
|                     Master User System Controls                    |
|                                                                  |
| [System Parameters] [AI Models] [External AI] [Data Access]      |
|                                                                  |
| +--------------------------------------------------------------+ |
| |                                                              | |
| | System Configuration                                         | |
| |                                                              | |
| | API Timeout (ms): [30000]                                    | |
| | Max Response Tokens: [4096]                                  | |
| |                                                              | |
| | System Mode: [Production ▼]                                  | |
| |                                                              | |
| +--------------------------------------------------------------+ |
|                                                                  |
| [Reset to Defaults]                              [Save Changes]   |
|                                                                  |
+------------------------------------------------------------------+
```

### Appointment Follow-Up
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      | Appointment Follow-Ups             [New Follow-Up] |
| AI Consultation|                                               |
| Patients       | [New Follow-Up] [Follow-Up History] [Scheduled] |
| Medical Records|                                               |
| Appointments   | +-----------------------------------------------+
| > Follow-Up    | | Schedule AI Follow-Up Call                    |
| Settings       | |                                               |
| Help & Support | | Patient: Michael Chen (P-1002)                |
|                | | Procedure: Appendectomy                       |
|                | |                                               |
|                | | Follow-Up Date: [Date Picker]                 |
|                | | Follow-Up Time: [Time Picker]                 |
|                | |                                               |
|                | | Follow-Up Type: [Post-Procedure Check ▼]      |
|                | |                                               |
|                | | Notes for AI: [Text area]                     |
|                | |                                               |
|                | +-----------------------------------------------+
|                |                                               |
|                | [Back]                      [Schedule Follow-Up Call] |
+----------------+-----------------------------------------------+
```

### External AI Integration Manager
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      | External AI Integrations          [Add Integration] |
| AI Consultation|                                               |
| Patients       | +-------------------+  +-------------------+  |
| Medical Records| | OpenAI GPT-4      |  | Anthropic Claude  |  |
| Appointments   | | Provider: openai  |  | Provider: anthropic|  |
| Settings       | | Status: Active    |  | Status: Active    |  |
| Master System  | |                   |  |                   |  |
|                | | Specialty:        |  | Specialty:        |  |
|                | | General Medicine  |  | Radiology        |  |
|                | |                   |  |                   |  |
|                | | [Edit] [Test]     |  | [Edit] [Test]     |  |
|                | | [Delete]          |  | [Delete]          |  |
|                | +-------------------+  +-------------------+  |
|                |                                               |
|                | +-------------------+  +-------------------+  |
|                | | Azure OpenAI      |  | Custom API        |  |
|                | | Provider: azure   |  | Provider: custom  |  |
|                | | Status: Inactive  |  | Status: Active    |  |
|                | |                   |  |                   |  |
|                | | [Edit] [Test]     |  | [Edit] [Test]     |  |
|                | | [Delete]          |  | [Delete]          |  |
|                | +-------------------+  +-------------------+  |
+----------------+-----------------------------------------------+
```

### Patient Detail View
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      | Patient Details                                 |
| AI Consultation|                                               |
| Patients       | Sarah Johnson (P-1001)                         |
| Medical Records| DOB: 05/12/1985 • Gender: Female • MRN: 12345678 |
| Appointments   |                                               |
| Settings       | [Demographics] [Medical History] [Consultations] [Files] |
| Help & Support |                                               |
|                | +-----------------------------------------------+
|                | | Medical History                               |
|                | |                                               |
|                | | Conditions:                                   |
|                | | - Hypertension (diagnosed 2018)               |
|                | | - Migraine (diagnosed 2015)                   |
|                | |                                               |
|                | | Medications:                                  |
|                | | - Lisinopril 10mg daily                       |
|                | | - Sumatriptan 50mg as needed                  |
|                | |                                               |
|                | | Allergies:                                    |
|                | | - Penicillin (hives)                          |
|                | |                                               |
|                | +-----------------------------------------------+
|                |                                               |
|                | [Start AI Consultation] [Schedule Follow-Up]    |
+----------------+-----------------------------------------------+
```

### AI Collaborative Consultation
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      | AI Collaborative Consultation                  |
| AI Consultation|                                               |
| Patients       | Patient: Sarah Johnson (P-1001) • 4 AI agents selected |
| Medical Records|                                               |
| Appointments   | Consensus Level: [===========] 85%             |
| Settings       |                                               |
| Help & Support | +-----------------------------------------------+
|                | | You: What could be causing the patient's     |
|                | | persistent headaches and elevated BP?        |
|                | |                                               |
|                | | Cardiology AI (14:32):                        |
|                | | The elevated blood pressure readings are      |
|                | | concerning and could be contributing to the   |
|                | | headaches. Current readings show...           |
|                | |                                               |
|                | | Neurology AI (14:33):                         |
|                | | The headache pattern suggests possible        |
|                | | migraine with aura. The patient reports...    |
|                | |                                               |
|                | | General Medicine AI (14:34):                  |
|                | | We should consider both cardiovascular and    |
|                | | neurological factors. The combination of...   |
|                | |                                               |
|                | | Central AI (14:35):                           |
|                | | Based on all specialist inputs, I recommend   |
|                | | a comprehensive approach addressing both...   |
|                | +-----------------------------------------------+
|                |                                               |
|                | [Start New Consultation]                        |
+----------------+-----------------------------------------------+
```

### Agent Training Interface
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      | AI Agent Training                              |
| AI Consultation|                                               |
| Patients       | Cardiology AI • Specialty: Cardiovascular medicine |
| Medical Records|                                               |
| Appointments   | [Upload Data] [Configure] [Train]              |
| Settings       |                                               |
| Help & Support | +-----------------------------------------------+
|                | | Upload Training Data                          |
|                | |                                               |
|                | | +--------------------------------------+      |
|                | | |                                      |      |
|                | | |     Drag and drop files here,        |      |
|                | | |     or click to browse               |      |
|                | | |                                      |      |
|                | | +--------------------------------------+      |
|                | |                                               |
|                | | Supported formats: PDF, TXT, CSV, JSON        |
|                | |                                               |
|                | | Or Enter Training Text:                       |
|                | | +--------------------------------------+      |
|                | | |                                      |      |
|                | | | [Text area for medical literature]   |      |
|                | | |                                      |      |
|                | | +--------------------------------------+      |
|                | +-----------------------------------------------+
|                |                                               |
|                | [Previous]                            [Next]    |
+----------------+-----------------------------------------------+
```

### Agent Performance Metrics
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      | Agent Performance Metrics                      |
| AI Consultation|                                               |
| Patients       | Cardiology AI                                  |
| Medical Records|                                               |
| Appointments   | [Week] [Month] [Quarter] [Year]                |
| Settings       |                                               |
| Help & Support | +-----------------------------------------------+
|                | | Overview                                      |
|                | |                                               |
|                | | +-------------------+  +-------------------+  |
|                | | | Diagnostic        |  | Response          |  |
|                | | | Accuracy: 94%     |  | Relevance: 91%    |  |
|                | | | [=============]   |  | [============]    |  |
|                | | | Target: 95%       |  | Target: 92%       |  |
|                | | +-------------------+  +-------------------+  |
|                | |                                               |
|                | | +-------------------+  +-------------------+  |
|                | | | Response Time     |  | User              |  |
|                | | | 2.1s              |  | Satisfaction: 89% |  |
|                | | | [==========]      |  | [===========]     |  |
|                | | | -0.6s from last   |  | +4.3% from last   |  |
|                | | | period            |  | period            |  |
|                | | +-------------------+  +-------------------+  |
|                | +-----------------------------------------------+
|                |                                               |
+----------------+-----------------------------------------------+
```

### Agent Feedback System
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      | AI Assistant Feedback                          |
| AI Consultation|                                               |
| Patients       | Help Improve Cardiology AI                     |
| Medical Records|                                               |
| Appointments   | +-----------------------------------------------+
| Settings       | | Recommendation:                               |
| Help & Support | | Based on the patient's symptoms and test      |
|                | | results, I recommend a 24-hour ambulatory     |
|                | | blood pressure monitoring and an              |
|                | | echocardiogram to evaluate cardiac function.  |
|                | |                                               |
|                | | How would you rate this recommendation?       |
|                | |                                               |
|                | | [Helpful] [Neutral] [Not Helpful]             |
|                | |                                               |
|                | | What areas need improvement?                  |
|                | | [Accuracy] [Clarity] [Completeness]           |
|                | | [Relevance] [Medical Terminology]             |
|                | |                                               |
|                | | Additional Comments:                          |
|                | | +--------------------------------------+      |
|                | | | [Text area for feedback]             |      |
|                | | +--------------------------------------+      |
|                | +-----------------------------------------------+
|                |                                               |
|                | [Submit Feedback]                               |
+----------------+-----------------------------------------------+
```

### Master User System Page
```
+------------------------------------------------------------------+
| AIDA Medical                                        User ▼ | Help |
+----------------+-----------------------------------------------+
| Dashboard      | Master User System                [System Controls] |
| AI Consultation|                                               |
| Patients       | [User Management] [External AI] [System] [Data] [Audit] |
| Medical Records|                                               |
| Appointments   | +-----------------------------------------------+
| Settings       | | User Role Management                          |
| Master System  | |                                               |
|                | | +-------------------------------------------+ |
|                | | | User             | Role      | Actions    | |
|                | | |------------------|-----------|------------| |
|                | | | dr.smith@aida.com| Doctor    | [Edit]     | |
|                | | | dr.chen@aida.com | Specialist| [Edit]     | |
|                | | | admin@aida.com   | Admin     | [Edit]     | |
|                | | | master@aida.com  | Master    | [Edit]     | |
|                | | +-------------------------------------------+ |
|                | |                                               |
|                | | [Add New User]                                |
|                | |                                               |
|                | +-----------------------------------------------+
|                |                                               |
+----------------+-----------------------------------------------+
```
