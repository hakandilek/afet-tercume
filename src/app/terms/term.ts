export interface TermsResponse {
  range: String;
  majorDimensions: String;
  values: String[][];
}

export interface Term {
  id: String;
  english: String;
  domain: String;
  translations: Map<String, String>;
}
