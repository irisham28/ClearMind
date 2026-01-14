export interface TemplateEntry {
  label: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export interface TemplateSection {
  label: string;
  entries: TemplateEntry[];
}

export interface DocumentTemplateDefinition {
  id: string;
  title: string;
  summary?: string;
  sections: TemplateSection[];
  revisionHistory?: { version: string; date?: string; notes?: string }[];
}

export const documentTemplates: DocumentTemplateDefinition[] = [
  {
    id: "app-website",
    title: "App & Website Pre-phase Document Template",
    summary:
      "The culturally sensitive ClearMind experience described in this template shows how a Singapore-focused mental wellbeing app organizes features, requirements, and governance details before entering implementation.",
    sections: [
      {
        label: "1. Introduction",
        entries: [
          {
            label: "1.1 Purpose of the app",
            paragraphs: [
              "The culturally sensitive mental wellbeing app seeks to provide a sense of calm and help users in Singapore develop coping strategies.",
              "It blends traditional knowledge and contemporary practices, making cultural inclusion a priority while tracking improvements through in-app Likert scale surveys to demonstrate relative wellbeing changes.",
            ],
          },
          {
            label: "1.2 Scope of the app",
            paragraphs: [
              "The app revolves around three core features that cover soothing audio, guided mindfulness practices, and contextual resources tailored to Singaporean needs.",
              "Each feature integrates traditional knowledge and modern wellbeing science so the experience is culturally informed while remaining practical for daily use.",
            ],
            bulletPoints: [
              "Sound-based wellbeing: curated calming music across Traditional Chinese instruments (guqin, singing bowls), Indian classical music and mantras, Malay gamelan-inspired peaceful sounds, and nature ambiences from Singapore's parks and gardens.",
              "Mindfulness practices: a mix of informative text and exercises such as Qigong (气功), Islamic meditation aligned with prayer times, Hindu yoga and pranayama, Buddhist mindfulness techniques, and secular options for non-religious users.",
              "Context integration: dashboard content that helps students manage academic stress, deal with intergenerational differences, cope with fast-paced city living, and maintain work-life harmony.",
            ],
          },
        ],
      },
      {
        label: "2. Functional Requirements/Features",
        entries: [
          {
            label: "2.1 Sound-based wellbeing",
            paragraphs: [
              "Description: Sound-based wellbeing plays culturally curated audio to promote calm across Singapore's diverse landscape.",
            ],
            bulletPoints: [
              "Inputs: data modules that manage the relevant audio files for each cultural stream.",
              "Outputs: streaming playback of the selected music that users can control through a persistent audio player.",
            ],
          },
          {
            label: "2.2 Context integration features",
            paragraphs: [
              "Description: contextual resources surface culturally relevant guidance through the dashboard experience.",
            ],
            bulletPoints: [
              "Inputs: dashboard text generated from demographic data supplied during onboarding.",
              "Outputs: in-app textual guidance that reflects age, cultural background, and user needs.",
              "Dependencies: personalization logic driven by age, education stage, and other demographic metadata captured when the user first joins ClearMind.",
            ],
          },
          {
            label: "2.3 Mindfulness practices",
            paragraphs: [
              "Description: mindfulness modules present informative/didactic content plus guided practice exercises from different traditions.",
            ],
            bulletPoints: [
              "Inputs: multimedia text and practice prompts across Qigong, Islamic meditation, Hindu yoga, Buddhist techniques, and secular mindfulness sequences.",
              "Outputs: a structured set of interactive cards that let users read, follow, and log each practice session for accountability.",
            ],
          },
        ],
      },
      {
        label: "4. System Requirements",
        entries: [
          {
            label: "4.1 Hardware Requirements",
            paragraphs: [
              "Mobile devices (iOS and Android) with at least 2 GB RAM and a modern web browser are supported so the experience remains performant even on mid-tier handsets.",
            ],
          },
          {
            label: "4.2 Software Requirements",
            paragraphs: [
              "iOS 12 or later, Android 8.0 or later, and up-to-date browsers such as Chrome, Safari, or Firefox ensure broad compatibility for the web release.",
            ],
          },
        ],
      },
      {
        label: "5. User Interface Requirements",
        entries: [
          {
            label: "5.1 Overview",
            paragraphs: [
              "The UI remains clean and minimalist, emphasizing intuitive navigation, limited buttons, and swipe-friendly interactions so users can explore without clutter.",
            ],
          },
        ],
      },
      {
        label: "6. Legal and Regulatory Requirements",
        entries: [
          {
            label: "6.1 Privacy",
            paragraphs: [
              "ClearMind must comply with all applicable Singapore privacy and security regulations that are in effect when the product launches.",
            ],
          },
        ],
      },
      {
        label: "7. Appendix",
        entries: [
          {
            label: "7.1 References",
            paragraphs: [
              "List every document, resource, and inspiration source referenced while drafting this development document so the research trail stays transparent.",
            ],
          },
        ],
      },
    ],
    revisionHistory: [
      {
        version: "Version 1.0",
        date: "MM/DD/YYYY",
        notes: "Initial release",
      },
    ],
  },
  {
    id: "iot-ml",
    title: "IoT/ML/Product Design/Robotics Pre-phase Document Template",
    summary:
      "This template helps scholars outline their IoT, ML, product design, or robotics projects by capturing objectives, functional requirements, and impact thinking before technical implementation.",
    sections: [
      {
        label: "1. Introduction",
        entries: [
          {
            label: "1.1 Purpose of the project",
            paragraphs: [
              "Clarify the primary objectives and goals so stakeholders understand why the project exists and what value it creates for users.",
            ],
          },
          {
            label: "1.2 Scope of the project",
            paragraphs: [
              "Define boundaries by listing included features and any notable exclusions; this keeps expectations aligned with the envisioned capability set.",
            ],
          },
        ],
      },
      {
        label: "2. Functional Requirements",
        entries: [
          {
            label: "Function 1",
            paragraphs: [
              "Description: Provide a detailed explanation of the first core feature or functionality.",
              "Inputs: Specify the required data or triggers necessary to execute the feature.",
              "Outputs: Describe the results or behavior produced when the feature runs.",
            ],
          },
          {
            label: "Function 3…n",
            paragraphs: [
              "Description: Add another feature explanation that fits the project plan.",
              "Inputs: Capture any contextual data or events the feature depends on.",
              "Outputs: Record how the feature contributes to the solution once executed.",
            ],
          },
        ],
      },
      {
        label: "3. Cost of the Prototype",
        entries: [
          {
            label: "",
            paragraphs: [
              "Clarify whether parents or sponsors will cover the prototype cost so budgeting assumptions remain transparent.",
            ],
          },
        ],
      },
      {
        label: "4. Knowledge and Skill of the scholar",
        entries: [
          {
            label: "",
            paragraphs: [
              "Outline the scholar's relevant skills, experiences, and knowledge that support the successful execution of this technical project.",
            ],
          },
        ],
      },
      {
        label: "3. Implementation",
        entries: [
          {
            label: "",
            paragraphs: [
              "Summarize the tentative implementation plan, including key milestones, timelines, and the technologies you expect to use.",
            ],
          },
        ],
      },
      {
        label: "4. Impact",
        entries: [
          {
            label: "",
            paragraphs: [
              "Describe the anticipated social, educational, or commercial impact of the project so stakeholders can judge its value.",
            ],
          },
        ],
      },
    ],
  },
];
