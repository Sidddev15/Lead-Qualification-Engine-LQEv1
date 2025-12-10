export interface Lead {
  companyName: string;
  tier: string;
  scores: {
    finalScore: number;
  };
  website: string;
  emails: string[];
  phones: string[];
  linkedin?: string;
  reasons: string[];
  notes?: string;
}
