import keywordsJson from "../../../config/lqe/keyword.json";

export const LQE_KEYWORDS: string[] = keywordsJson.keywords;

export const LQE_REGIONS = [
  "Europe",
  "Asia",
  "North America",
  "South America",
  "Middle East",
  "Africa",
  "Oceania",
] as const;

export type LqeRegion = (typeof LQE_REGIONS)[number];
