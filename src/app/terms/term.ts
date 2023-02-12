export interface TermsResponse {
  range: string;
  majorDimensions: string;
  values: string[][];
}

export interface Term {
  id: string;
  english: string;
  domain: string;
  translations: Map<string, string>;
  initial: string;
}
