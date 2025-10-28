export interface Diagnosis {
  name: string;
  description: string;
  causes: string[];
  symptoms: string[];
  medications: string[];
}

export interface SymptomAnalysis {
  name: string; // The identified sound, e.g., "Tos"
  description: string; // A description of the symptom
  causes: string[]; // What provokes it
  symptoms: string[]; // Other associated symptoms
  prevention: string[]; // What can be taken to prevent/treat it
}

export interface UnifiedAnalysisResponse {
  symptomAnalysis?: SymptomAnalysis;
  conversationalResponse?: string;
}

// FIX: Added missing FeedbackRecord interface, which is used in FeedbackView.tsx.
export interface FeedbackRecord {
  user: string;
  rating: number;
  timestamp: string;
}

// FIX: Added missing ActivityRecord and InvalidSearchRecord types.
export interface ActivityRecord {
  id: string;
  user: string;
  searchTerm: string;
  diagnosis: Diagnosis;
  timestamp: string;
}

export interface InvalidSearchRecord {
  id: string;
  user: string;
  searchTerm: string;
  timestamp: string;
}
